// ─────────────────────────────────────────────────────────────
//  Bryte-Dev-It — all site content lives here.
//  Edit this file to change copy, links, projects or contacts.
// ─────────────────────────────────────────────────────────────

export type Status = "Live" | "Beta" | "Devnet" | "In build";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  status: Status;
  network: string; // shown where VISA/Mastercard would be
  url?: string; // live site
  repo?: string; // GitHub repo (omit if private)
  stack: string[];
  /** Background tint for the card (also the fallback if the screenshot can't load) */
  tint: [string, string];
  /** Optional local screenshot in /public/shots — beats the live screenshot service */
  shot?: string;
};

export const owner = {
  name: "Bright Wallan",
  brand: "Bryte-Dev-It",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  roles: ["AI Operator", "Product Builder", "Market Researcher"],
  // Drop your CV in /public/cv/ and set the path, e.g. "/cv/Bright-Wallan-CV.pdf"
  cvUrl: null as string | null,
};

export const hero = {
  eyebrow: "Welcome to Bryte-Dev-It",
  headlineTop: "From market hunch",
  headlineBottom: "to live product.",
  welcome:
    "I'm Bright Wallan, a researcher first and a builder always. Six years of trading crypto, forex and futures taught me to read where money and attention are moving. Now I use AI as my engineering team to turn that read into real products, researched, designed and shipped end to end. If you have an idea worth building, you're in the right place.",
};

export const rep = [
  { value: "3", label: "products under my wing" },
  { value: "6 yrs", label: "reading markets as a trader" },
  { value: "2", label: "chains shipped on: Solana & Arc" },
];

export const skills = [
  {
    title: "Web development",
    kicker: "Frontend + backend",
    body: "Full products, not just pages. Next.js and TypeScript up front, Supabase, auth, wallets and on-chain swaps behind it.",
    tools: ["Next.js", "TypeScript", "React", "Supabase", "Privy", "Vercel"],
  },
  {
    title: "Web design",
    kicker: "UI / UX",
    body: "Interfaces that feel obvious on the first tap. Mobile-first layouts, motion that means something, buttons you want to press.",
    tools: ["Framer Motion", "CSS", "Design systems", "Prototyping"],
  },
  {
    title: "Market research",
    kicker: "Read before I build",
    body: "Competitor teardowns, token and trading analysis, finding the gap before writing a line of code. Trader instincts, researcher discipline.",
    tools: ["Fundamental analysis", "Technical analysis", "On-chain data"],
  },
  {
    title: "AI operations",
    kicker: "The multiplier",
    body: "I direct AI the way a lead directs a team: clear specs, tight review loops, and shipping at founder speed without cutting corners.",
    tools: ["Claude", "Agent workflows", "Prompt systems"],
  },
];

export const products: Project[] = [
  {
    slug: "callit",
    name: "Callit",
    tagline: "Call it. Get Paid.",
    description:
      "A social trading app on Solana. Post calls on tokens, trade in-app, and earn when your calls run. Feed, trading terminal and group chat in one place.",
    role: "Founder · Builder",
    status: "Beta",
    network: "SOLANA",
    url: "https://callit.buzz",
    repo: "https://github.com/SolCallit/Call-It",
    stack: ["Next.js", "TypeScript", "Supabase", "Privy", "Jupiter", "Helius", "Vercel"],
    tint: ["#0b1736", "#1d3b8f"],
  },
  {
    slug: "predarena",
    name: "PredArena",
    tagline: "Crypto, played head-to-head.",
    description:
      "A competition market: pick which asset outperforms its pair in fixed-odds battles, stack picks into parlays, and settle on-chain. Live on Solana and Arc.",
    role: "Co-founder · CPO",
    status: "Live",
    network: "SOLANA × ARC",
    url: "https://predarena.xyz",
    stack: ["Solana", "Arc", "Chainlink", "Pyth", "TypeScript", "React"],
    tint: ["#170b2e", "#5b2bd6"],
  },
];

export const experiments: Project[] = [
  {
    slug: "startit",
    name: "Startit",
    tagline: "Undervalued brands, powered by memes.",
    description:
      "A launchpad that bridges real products and memecoin communities. Starters launch a token for a brand with its approval, screened before it goes live.",
    role: "Builder",
    status: "Devnet",
    network: "SOLANA",
    stack: ["Next.js", "TypeScript", "Raydium LaunchLab", "Solana"],
    tint: ["#1a0506", "#b3121b"],
  },
  {
    slug: "mira",
    name: "MIRA",
    tagline: "Fundamental depth, technical precision.",
    description:
      "Market Intelligence Research Agent. A research desk for crypto and forex that pairs fundamental reports with trade setups: entry, target, stop and thesis.",
    role: "Researcher · Builder",
    status: "Live",
    network: "RESEARCH",
    url: "https://mira-gg22.vercel.app",
    repo: "https://github.com/BabyGG22/MIRA",
    stack: ["TypeScript", "React", "Vercel"],
    tint: ["#141008", "#a07a1c"],
  },
  {
    slug: "coops",
    name: "c00ps",
    tagline: "Saving circles, on-chain.",
    description:
      "A crypto cooperative society. Members pool and grow funds together, the way a co-op does, built for crypto natives. Frontend concept.",
    role: "Frontend",
    status: "Live",
    network: "WEB3",
    url: "https://c00ps.vercel.app",
    repo: "https://github.com/BabyGG22/cOOps",
    stack: ["JavaScript", "React", "Vercel"],
    tint: ["#04181a", "#0f8f8a"],
  },
  {
    slug: "banking",
    name: "Banking",
    tagline: "Money, minus the queue.",
    description:
      "A modern banking web app. Accounts, transfers and a dashboard that feels calm instead of corporate.",
    role: "Builder",
    status: "In build",
    network: "FINTECH",
    repo: "https://github.com/BabyGG22/Banking",
    stack: ["TypeScript", "Next.js"],
    tint: ["#04140c", "#138a52"],
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
