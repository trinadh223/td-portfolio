import raw from "../../../public/data/git-stats.json";

export type Day = { date: string; count: number };
export type Week = {
  week: string;
  commits: number;
  mergedPrs: number;
  byGroup: Record<string, number>;
};
export type GitStats = {
  generatedAt: string;
  login: string;
  totals: {
    contributions: number;
    commits: number;
    mergedPrs: number;
    activeDays: number;
    longestStreak: number;
    currentStreak: number;
  };
  calendar: Day[];
  weekly: Week[];
  groups: string[];
  prsByProduct: { label: string; group: string; count: number }[];
  languages: { name: string; bytes: number; share: number; color: string | null }[];
  milestones: { date: string; label: string }[];
};

// Read at build time. The deploy workflow refreshes the file every 6 hours.
export const gitStats = raw as GitStats;

export function hasStats(s: GitStats | null | undefined): s is GitStats {
  return Boolean(s?.calendar?.length && s.totals);
}

// Fixed categorical order: color follows the group, never its rank.
export const GROUP_SLOT: Record<string, number> = {
  Fluxgo: 1,
  "Glimpse HQ": 2,
  "Omni AI": 3,
  "Vachas AI": 4,
  "Side projects": 5,
};

export function groupColor(group: string) {
  return `var(--viz-series-${GROUP_SLOT[group] ?? 5})`;
}

export function formatDay(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}
