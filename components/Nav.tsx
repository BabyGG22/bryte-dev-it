"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#skills", label: "Skills" },
  { href: "#products", label: "Products" },
  { href: "#experiments", label: "Experiments" },
];

export default function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState("#intro");

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  // Highlight the section currently on screen
  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("bdi-theme", next);
    } catch {}
  };

  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#intro" className="nav__logo" aria-label="Bryte-Dev-It home">
        <span className="nav__mark">B</span>
        <span className="nav__word">Bryte-Dev-It</span>
      </a>

      <nav className="nav__links" aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? "is-active" : ""}>
            {active === l.href && (
              <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <span>{l.label}</span>
          </a>
        ))}
      </nav>

      <div className="nav__end">
        <button
          className={`switch ${theme === "light" ? "is-on" : ""}`}
          onClick={toggle}
          role="switch"
          aria-checked={theme === "light"}
          aria-label="Light mode"
        >
          <motion.span layout className="switch__knob" transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            {theme === "light" ? "☀" : "☾"}
          </motion.span>
        </button>
        <a href="#contact" className="btn btn--primary btn--sm">
          Let&apos;s talk
        </a>
      </div>
    </motion.header>
  );
}
