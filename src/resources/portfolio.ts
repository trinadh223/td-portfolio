// Home page sections added in the 2026-11 refresh.
// All user-facing strings here were written by Gemini 4 Neon from a fact brief.
// Change facts only when they change in real life; keep numbers true and rounded down.

export type FeaturedItem = {
  name: string;
  period: string;
  role: string;
  summary: string;
  href: string;
  tags: string[];
};

export type SideProject = {
  name: string;
  period: string;
  summary: string;
  tags: string[];
  isPrivate: boolean;
  status?: string;
  href?: string;
  logo?: string;
  image?: string;
};

export const now = {
  label: "Now",
  logo: "/images/logos/fluxgo.png",
  lead: "Currently building as founder",
  text: "Fluxgo: Intercity mobility in India",
  links: [
    { label: "Website", href: "https://www.fluxgo.in" },
    { label: "Open app", href: "https://app.fluxgo.in" },
  ],
};

export const featured = {
  title: "Featured work",
  cta: "Read case study",
  items: [
    {
      name: "Fluxgo",
      period: "Sep 2026 - Present",
      role: "Founder & Product Lead",
      summary:
        "Reliable intercity carpools and shared cabs in India, built around visible no-show records, fixed seat prices and verified members.",
      href: "/work/fluxgo",
      tags: [],
    },
    {
      name: "Omni AI",
      period: "Nov 2025 - May 2026",
      role: "Founder & Product Lead",
      summary:
        "Built an AI-native execution intelligence platform giving engineering teams real-time visibility into work progress without manual updates.",
      href: "/work/omni-ai",
      tags: ["AI digests", "GitHub", "Slack"],
    },
    {
      name: "Vachas AI",
      period: "Jun 2025 - Oct 2025",
      role: "Co-Founder & Product Strategy",
      summary:
        "Production voice AI for outbound NPS surveys and follow-ups. Under 1.5 s latency, 94% extraction accuracy and 40% lower API cost.",
      href: "/work/vachas-ai",
      tags: ["Voice AI", "LLM routing", "Deepgram"],
    },
  ] satisfies FeaturedItem[],
};

export const statsCopy = {
  title: "Git activity",
  contributions: "Contributions",
  mergedPrs: "Merged pull requests",
  activeDays: "Active days",
  longestStreak: "Longest streak",
  heatmapTitle: "Daily activity",
  weeklyTitle: "Weekly commits and pull requests",
  prsByProductTitle: "Merged pull requests by product",
  languagesTitle: "Languages",
  viewAll: "View full stats",
  error: "Could not load stats right now. Try again in a bit.",
  legendLess: "Less",
  legendMore: "More",
  pageTitle: "Git activity and build stats",
  pageDescription:
    "Daily heatmap, weekly commits, merged PRs, and language split across Fluxgo, Glimpse HQ, Omni AI, Vachas AI, and side projects.",
};

export const explorations = {
  title: "Projects",
  viewRepo: "View on GitHub",
  items: [
    {
      name: "Glimpse HQ",
      logo: "/images/logos/glimpse.png",
      image: "/images/projects/glimpse-site.jpg",
      period: "Aug 2026",
      status: "Explored, not launched",
      summary:
        "An unlaunched B2B SaaS AI video marketing platform for performance teams. Mapped workflows, set AI trust rules and built a 10-milestone prototype.",
      tags: ["B2B SaaS", "System design", "Prototype"],
      isPrivate: false,
      href: "/work/glimpse-hq",
    },
    {
      name: "Pulse Lens",
      period: "Jul 2026",
      summary:
        "Turns multi-channel user feedback into decision-ready evidence packs and flags thin or biased data.",
      tags: ["Evals", "RAG", "FastAPI"],
      isPrivate: true,
    },
    {
      name: "Mikasa",
      period: "Jul 2026",
      summary:
        "Personal AI agent on Telegram that orders food, groceries and table bookings through Swiggy MCP.",
      tags: ["MCP", "Agents", "n8n"],
      isPrivate: true,
    },
    {
      name: "My Interviewer",
      period: "Jul 2026",
      summary:
        "AI voice mock interviewer built from a PRD.",
      tags: ["Voice AI", "Pipecat", "LiveKit"],
      isPrivate: true,
    },
    {
      name: "My Stickies",
      period: "Aug 2026",
      summary: "Public, free macOS sticky notes app with no account required and no note limit.",
      tags: ["macOS", "Open source"],
      isPrivate: false,
      href: "https://github.com/trinadh223/my-stickies",
    },
  ] satisfies SideProject[],
};

export const fellowship = {
  title: "Upraised PM Fellowship",
  casesTitle: "Fellowship case studies",
  viewAll: "View all projects",
};

export const writing = {
  title: "Writing",
  readAll: "Read all posts",
};

export const contact = {
  title: "Get in touch",
  call: "Book a call",
  email: "Send an email",
};
