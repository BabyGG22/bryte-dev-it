"use client";

import { motion } from "framer-motion";
import { hero, owner, stats, products, experiments } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;
const orbiters = [...products, ...experiments.slice(0, 3)];

function Orbit() {
  return (
    <div className="orbit" aria-hidden>
      <motion.div className="planet" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1.2, ease }}>
        <span className="planet__core" />
        <span className="planet__ring" />
      </motion.div>
      {[0, 1].map((ring) => (
        <motion.div
          key={ring}
          className={`orbit__path orbit__path--${ring}`}
          animate={{ rotate: ring ? -360 : 360 }}
          transition={{ duration: ring ? 90 : 60, repeat: Infinity, ease: "linear" }}
        >
          {orbiters
            .filter((_, k) => k % 2 === ring)
            .map((p, k, arr) => {
              const angle = (360 / arr.length) * k + ring * 40;
              return (
                <span key={p.slug} className="orbit__body" style={{ transform: `rotate(${angle}deg) translateX(var(--r)) rotate(${-angle}deg)` }}>
                  <motion.span className="orbit__label" animate={{ rotate: ring ? 360 : -360 }} transition={{ duration: ring ? 90 : 60, repeat: Infinity, ease: "linear" }}>
                    <i style={{ background: p.tint[1] }} />
                    {p.name}
                  </motion.span>
                </span>
              );
            })}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="intro" className="hero">
      <div className="hero__copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          <span className="dot" /> {hero.eyebrow}
        </motion.p>

        <h1 className="hero__title">
          {hero.headline.map((line, i) => (
            <span className="line" key={line}>
              <motion.span className={i === 1 ? "glow" : undefined} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero__intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease }}>
          {hero.intro}
        </motion.p>

        <motion.div className="hero__cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }}>
          <a href="#products" className="btn btn--primary">
            View products
          </a>
          <a href="#contact" className="btn btn--ghost">
            Contact me
          </a>
        </motion.div>

        <motion.dl className="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </motion.dl>
        <p className="hero__meta">
          <span className="pulse" /> {owner.title} · {owner.location}
        </p>
      </div>

      <div className="hero__visual">
        <Orbit />
      </div>
    </section>
  );
}
