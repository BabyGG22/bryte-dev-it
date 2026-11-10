import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bryte-Dev-It — Bright Wallan",
  description:
    "Bright Wallan: AI operator, product builder and market researcher. Builder of Callit, co-founder of PredArena.",
  openGraph: {
    title: "Bryte-Dev-It — Bright Wallan",
    description: "From market hunch to live product.",
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@bryt_eth" },
};

export const viewport: Viewport = {
  themeColor: "#07070c",
  width: "device-width",
  initialScale: 1,
};

// Set the theme before paint so there's no flash.
const themeScript = `try{var t=localStorage.getItem('bdi-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
