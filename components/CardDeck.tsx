"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/site";
import ProjectCard from "./ProjectCard";

type Props = {
  id: string;
  index: string;
  title: string;
  intro: string;
  projects: Project[];
};

export default function CardDeck({ id, index, title, intro, projects }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track which card is centred
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      el.querySelectorAll<HTMLElement>(".deck__slide").forEach((s, i) => {
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = Math.max(0, Math.min(projects.length - 1, i));
      const slide = el.querySelectorAll<HTMLElement>(".deck__slide")[n];
      el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2, behavior: "smooth" });
    },
    [projects.length]
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    if (e.key === "ArrowLeft") go(active - 1);
  };

  return (
    <section id={id} className="section deck">
      <header className="section__head">
        <span className="section__index">{index}</span>
        <h2>{title}</h2>
        <p className="section__intro">{intro}</p>
      </header>

      <div className="deck__track" ref={track} tabIndex={0} onKeyDown={onKey} aria-label={`${title} cards`}>
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            className="deck__slide"
            data-i={i}
            animate={{ scale: active === i ? 1 : 0.9, opacity: active === i ? 1 : 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>

      {projects.length > 1 && (
        <div className="deck__controls">
          <button className="btn btn--round" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous card">
            ←
          </button>
          <div className="deck__dots">
            {projects.map((p, i) => (
              <button key={p.slug} className={`deck__dot ${active === i ? "is-active" : ""}`} onClick={() => go(i)} aria-label={`Show ${p.name}`}>
                {active === i && <motion.span layoutId={`dot-${id}`} className="deck__dotfill" />}
              </button>
            ))}
          </div>
          <button className="btn btn--round" onClick={() => go(active + 1)} disabled={active === projects.length - 1} aria-label="Next card">
            →
          </button>
        </div>
      )}
    </section>
  );
}
