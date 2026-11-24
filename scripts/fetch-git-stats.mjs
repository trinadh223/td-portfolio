#!/usr/bin/env node
// Builds public/data/git-stats.json from the GitHub API.
// Writes totals only: no code, commit messages, branch names or private repo names.
// A fine-grained token reads the private repos of one owner only, so each owner
// has its own read-only token:
//   GH_STATS_TOKEN         trinadh223 repos and the contribution calendar
//   GH_STATS_TOKEN_FLUXGO  fluxgo-org repos
//   GH_STATS_TOKEN_OMNI    omni-ai-org repos
// If a token is missing or any repo cannot be read, the script keeps the last
// good file and exits 0 so the site build still runs.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "data", "git-stats.json");
const LOGIN = "trinadh223";
const TOKEN = process.env.GH_STATS_TOKEN || "";
const OWNER_TOKENS = {
  trinadh223: TOKEN,
  "fluxgo-org": process.env.GH_STATS_TOKEN_FLUXGO || "",
  "omni-ai-org": process.env.GH_STATS_TOKEN_OMNI || "",
};

// label: what the site shows. Private repos are shown by product name only.
const REPOS = [
  { repo: "fluxgo-org/fluxgo-frontend", label: "Fluxgo app", group: "Fluxgo" },
  { repo: "fluxgo-org/fluxgo-backend", label: "Fluxgo backend", group: "Fluxgo" },
  { repo: "fluxgo-org/fluxgo-website", label: "Fluxgo website", group: "Fluxgo" },
  { repo: "fluxgo-org/fluxgo-admin", label: "Fluxgo admin", group: "Fluxgo" },
  { repo: "fluxgo-org/fluxgo-partner", label: "Fluxgo partner app", group: "Fluxgo" },
  { repo: "trinadh223/glimpse-prototype", label: "Glimpse prototype", group: "Glimpse HQ" },
  { repo: "trinadh223/glimpse-website", label: "Glimpse website", group: "Glimpse HQ" },
  { repo: "omni-ai-org/omni-backend", label: "Omni AI backend", group: "Omni AI" },
  { repo: "omni-ai-org/omni-frontend", label: "Omni AI app", group: "Omni AI" },
  { repo: "omni-ai-org/omni-website", label: "Omni AI website", group: "Omni AI" },
  { repo: "trinadh223/vachas-voice-ai", label: "Vachas AI platform", group: "Vachas AI" },
  { repo: "trinadh223/vachas-ai-website", label: "Vachas AI website", group: "Vachas AI" },
  { repo: "trinadh223/pulse-lens", label: "Pulse Lens", group: "Side projects" },
  { repo: "trinadh223/mikasa", label: "Mikasa agent", group: "Side projects" },
  { repo: "trinadh223/my-stickies", label: "My Stickies", group: "Side projects" },
  { repo: "trinadh223/td-portfolio", label: "This portfolio", group: "Side projects" },
];

const MILESTONES = [
  { date: "2025-06-01", label: "Vachas AI" },
  { date: "2025-11-01", label: "Omni AI" },
  { date: "2026-08-21", label: "Glimpse prototype" },
  { date: "2026-09-03", label: "Fluxgo first commit" },
  { date: "2026-11-14", label: "Fluxgo on both stores" },
];

const IGNORED_LANGUAGES = new Set(["Dockerfile", "Makefile", "Procfile", "Batchfile"]);

async function gql(query, variables = {}, token = TOKEN) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "td-portfolio-stats",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length && !json.data) throw new Error(json.errors[0].message);
  return json.data;
}

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}

function weekStart(dateStr) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - d.getUTCDay()); // Sunday, same as the GitHub calendar
  return isoDay(d);
}

async function fetchCalendar() {
  const data = await gql(
    `query($login: String!) { user(login: $login) { contributionsCollection {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    } } }`,
    { login: LOGIN },
  );
  const cal = data.user.contributionsCollection.contributionCalendar;
  const days = cal.weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
  );
  return { total: cal.totalContributions, days };
}

function streaks(days) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak: today may still be empty, so start from the last active day if it is today or yesterday.
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i -= 1;
  for (; i >= 0 && days[i].count > 0; i -= 1) current += 1;
  return { longest, current };
}

async function fetchRepo({ repo }, since) {
  const [owner, name] = repo.split("/");
  const dates = [];
  let cursor = null;
  let meta = null;
  for (let page = 0; page < 30; page += 1) {
    const data = await gql(
      `query($owner: String!, $name: String!, $since: GitTimestamp!, $cursor: String) {
        repository(owner: $owner, name: $name) {
          pullRequests(states: MERGED) { totalCount }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name color } } }
          defaultBranchRef { target { ... on Commit {
            history(first: 100, since: $since, after: $cursor) {
              pageInfo { hasNextPage endCursor }
              nodes { committedDate }
            }
          } } }
        }
      }`,
      { owner, name, since, cursor },
      OWNER_TOKENS[owner],
    );
    const r = data.repository;
    if (!r) return null;
    meta ??= { mergedPrs: r.pullRequests.totalCount, languages: r.languages.edges };
    const history = r.defaultBranchRef?.target?.history;
    if (!history) break;
    for (const n of history.nodes) dates.push(n.committedDate.slice(0, 10));
    if (!history.pageInfo.hasNextPage) break;
    cursor = history.pageInfo.endCursor;
  }
  return { ...meta, commitDates: dates, mergedDates: await fetchMergedDates(owner, name, since) };
}

async function fetchMergedDates(owner, name, since) {
  const dates = [];
  let cursor = null;
  for (let page = 0; page < 20; page += 1) {
    const data = await gql(
      `query($owner: String!, $name: String!, $cursor: String) {
        repository(owner: $owner, name: $name) {
          pullRequests(states: MERGED, first: 100, after: $cursor, orderBy: { field: UPDATED_AT, direction: DESC }) {
            pageInfo { hasNextPage endCursor }
            nodes { mergedAt }
          }
        }
      }`,
      { owner, name, cursor },
      OWNER_TOKENS[owner],
    );
    const prs = data.repository?.pullRequests;
    if (!prs) break;
    for (const n of prs.nodes) if (n.mergedAt && n.mergedAt >= since) dates.push(n.mergedAt.slice(0, 10));
    if (!prs.pageInfo.hasNextPage) break;
    cursor = prs.pageInfo.endCursor;
  }
  return dates;
}

async function main() {
  const missing = Object.entries(OWNER_TOKENS).filter(([, t]) => !t).map(([o]) => o);
  if (missing.length) {
    console.warn(`git-stats: no token for ${missing.join(", ")}; keeping the existing file.`);
    return;
  }

  const calendar = await fetchCalendar();
  const firstDay = calendar.days[0]?.date ?? isoDay(new Date(Date.now() - 365 * 864e5));
  const since = `${firstDay}T00:00:00Z`;

  const weeks = new Map();
  for (const d of calendar.days) {
    const w = weekStart(d.date);
    if (!weeks.has(w)) weeks.set(w, { week: w, commits: 0, mergedPrs: 0, byGroup: {} });
  }

  const prsByProduct = [];
  const languageBytes = new Map();
  const languageColors = new Map();
  let commits = 0;
  let mergedPrs = 0;
  let reposRead = 0;

  for (const cfg of REPOS) {
    let r;
    try {
      r = await fetchRepo(cfg, since);
    } catch (err) {
      console.warn(`git-stats: skipped ${cfg.label}: ${err.message}`);
      continue;
    }
    if (!r) {
      console.warn(`git-stats: no access to ${cfg.label}`);
      continue;
    }
    reposRead += 1;
    mergedPrs += r.mergedPrs;
    if (r.mergedPrs > 0) prsByProduct.push({ label: cfg.label, group: cfg.group, count: r.mergedPrs });
    for (const e of r.languages) {
      if (IGNORED_LANGUAGES.has(e.node.name)) continue;
      languageBytes.set(e.node.name, (languageBytes.get(e.node.name) ?? 0) + e.size);
      if (e.node.color) languageColors.set(e.node.name, e.node.color);
    }
    for (const date of r.commitDates) {
      const w = weeks.get(weekStart(date));
      if (!w) continue;
      w.commits += 1;
      w.byGroup[cfg.group] = (w.byGroup[cfg.group] ?? 0) + 1;
      commits += 1;
    }
    for (const date of r.mergedDates) {
      const w = weeks.get(weekStart(date));
      if (w) w.mergedPrs += 1;
    }
  }

  // Partial data would lower the totals, so keep the last good file instead.
  if (reposRead < REPOS.length) throw new Error(`read ${reposRead}/${REPOS.length} repositories`);

  const totalBytes = [...languageBytes.values()].reduce((a, b) => a + b, 0);
  const sortedLangs = [...languageBytes.entries()].sort((a, b) => b[1] - a[1]);
  const top = sortedLangs.slice(0, 6);
  const otherBytes = sortedLangs.slice(6).reduce((a, [, b]) => a + b, 0);
  const languages = top.map(([name, bytes]) => ({
    name,
    bytes,
    share: bytes / totalBytes,
    color: languageColors.get(name) ?? null,
  }));
  if (otherBytes > 0) languages.push({ name: "Other", bytes: otherBytes, share: otherBytes / totalBytes, color: null });

  const { longest, current } = streaks(calendar.days);
  const out = {
    generatedAt: new Date().toISOString(),
    login: LOGIN,
    totals: {
      contributions: calendar.total,
      commits,
      mergedPrs,
      activeDays: calendar.days.filter((d) => d.count > 0).length,
      longestStreak: longest,
      currentStreak: current,
    },
    calendar: calendar.days,
    weekly: [...weeks.values()].sort((a, b) => a.week.localeCompare(b.week)),
    groups: [...new Set(REPOS.map((r) => r.group))],
    prsByProduct: prsByProduct.sort((a, b) => b.count - a.count),
    languages,
    milestones: MILESTONES.filter((m) => m.date >= firstDay),
  };

  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(out, null, 1)}\n`);
  console.log(
    `git-stats: ${out.totals.contributions} contributions, ${commits} commits, ${mergedPrs} merged PRs, ${reposRead}/${REPOS.length} repos.`,
  );
}

main().catch(async (err) => {
  console.warn(`git-stats: failed (${err.message}); keeping the existing file.`);
  try {
    await readFile(OUT);
  } catch {
    console.warn("git-stats: no existing file; the site will show the error state.");
  }
});
