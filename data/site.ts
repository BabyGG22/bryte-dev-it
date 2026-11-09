// ─────────────────────────────────────────────────────────────
//  Bryte-Dev-It — all site content lives here.
//  Edit this file to change copy, links, projects or contacts.
// ─────────────────────────────────────────────────────────────

export type Status = "Live" | "Beta" | "Devnet" | "In build" | "Concept";

export type Project = {
  slug: string;
  name: string;
  /** One sentence, ~12 words. What it is, not a pitch. */
  summary: string;
  role: string;
  status: Status;
  network?: string;
  url?: string; // live site
  repo?: string; // GitHub repo (omit if private)
  stack: string[]; // keep to 3–4
  /** Screen colours (also the fallback if the screenshot can't load) */
  tint: [string, string];
  /** Optional local screenshot in /public/shots — beats the live screenshot service */
  shot?: string;
};

export const owner = {
  name: "Bright Wallan",
  brand: "Bryte-Dev-It",
  title: "Product Engineer & Market Researcher",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  // Drop your CV in /public/cv/ and set the path, e.g. "/cv/Bright-Wallan-CV.pdf"
  cvUrl: null as string | null,
};

export const hero = {
  eyebrow: "Welcome to Bryte-Dev-It",
  headline: ["I build Web3 products,", "from research to release."],
  intro:
    "I'm Bright Wallan, a product engineer and market researcher. I use AI to design, build and ship full-stack products, backed by six years of reading markets as a trader.",
};

export const stats = [
  { value: "8", label: "projects built" },
  { value: "6 yrs", label: "in financial markets" },
  { value: "2", label: "live on Solana & Arc" },
];

export const skills = [
  { title: "Full-stack development", body: "Next.js, TypeScript, Supabase, wallet and on-chain integrations." },
  { title: "UI / UX design", body: "Clear, mobile-first interfaces with purposeful motion." },
  { title: "Market research", body: "Competitor analysis, token and trading research, positioning." },
  { title: "AI-assisted delivery", body: "Directing AI with tight specs and reviews to ship faster." },
];

export const products: Project[] = [
  {
    slug: "callit",
    name: "Callit",
    summary: "Social trading app where traders earn when their token calls perform.",
    role: "Founder & Builder",
    status: "Beta",
    network: "Solana",
    url: "https://callit.buzz",
    repo: "https://github.com/SolCallit/Call-It",
    stack: ["Next.js", "TypeScript", "Supabase", "Jupiter"],
    tint: ["#0a1430", "#2346b8"],
  },
  {
    slug: "predarena",
    name: "PredArena",
    summary: "Competition market for head-to-head crypto battles with on-chain settlement.",
    role: "Co-founder & CPO",
    status: "Live",
    network: "Solana · Arc",
    url: "https://predarena.xyz",
    stack: ["React", "TypeScript", "Pyth", "Solana"],
    tint: ["#150a2e", "#6a35e8"],
  },
];

export const experiments: Project[] = [
  {
    slug: "startit",
    name: "Startit",
    summary: "Meme-token launchpad connecting real products with crypto communities.",
    role: "Builder",
    status: "Devnet",
    stack: ["Next.js", "Raydium LaunchLab"],
    tint: ["#1a0506", "#b3121b"],
  },
  {
    slug: "mira",
    name: "MIRA",
    summary: "Crypto and forex research desk pairing fundamentals with trade setups.",
    role: "Researcher & Builder",
    status: "Live",
    url: "https://mira-gg22.vercel.app",
    repo: "https://github.com/BabyGG22/MIRA",
    stack: ["TypeScript", "React"],
    tint: ["#141008", "#a07a1c"],
  },
  {
    slug: "coops",
    name: "c00ps",
    summary: "Group savings plans with invite-only cohorts and contribution tracking.",
    role: "Frontend",
    status: "Live",
    url: "https://c00ps.vercel.app",
    repo: "https://github.com/BabyGG22/cOOps",
    stack: ["React", "Vite", "Tailwind"],
    tint: ["#04181a", "#0f8f8a"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    summary: "Digital banking concept for cross-border users: transfers, cards, dashboard.",
    role: "Builder",
    status: "In build",
    stack: ["TanStack Start", "TypeScript"],
    tint: ["#071420", "#1d6fa8"],
  },
  {
    slug: "zenith",
    name: "Zenith",
    summary: "Banking website with animated product pages.",
    role: "Builder",
    status: "In build",
    repo: "https://github.com/BabyGG22/Banking",
    stack: ["Next.js", "Framer Motion"],
    tint: ["#04140c", "#138a52"],
  },
  {
    slug: "bp26",
    name: "BP26",
    summary: "Best Player 26, a stock-to-earn NFT marketplace.",
    role: "Founder",
    status: "Concept",
    stack: ["Landing page"],
    tint: ["#1a1206", "#c26a12"],
  },
];

export const contacts = {
  email: "christophawallan@gmail.com",
  links: [
    { label: "WhatsApp", handle: "+234 708 933 2717", href: "https://wa.me/2347089332717", icon: "whatsapp" },
    { label: "Telegram", handle: "@Bryteis22", href: "https://t.me/Bryteis22", icon: "telegram" },
    { label: "X", handle: "@bryt_eth", href: "https://x.com/bryt_eth", icon: "x" },
    { label: "LinkedIn", handle: "bright-wallan", href: "https://www.linkedin.com/in/bright-wallan", icon: "linkedin" },
    { label: "GitHub", handle: "BabyGG22", href: "https://github.com/BabyGG22", icon: "github" },
  ],
} as const;
