"use client";

import { motion } from "framer-motion";
import { experiments } from "@/data/site";

const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Experiments() {
  return (
    <section id="experiments" className="section section--tight">
      <header className="section__head">
        <span className="section__index">04</span>
        <h2>Experiments</h2>
        <p className="section__intro">Side builds, concepts and research tools.</p>
      </header>

      <ul className="exps">
        {experiments.map((p, i) => (
          <motion.li
            key={p.slug}
            className="exp"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
          >
            <span className="exp__icon" style={{ background: `linear-gradient(145deg, ${p.tint[1]}, ${p.tint[0]})` }}>
              {p.name.slice(0, 1).toUpperCase()}
            </span>
            <div className="exp__main">
              <div className="exp__top">
                <h3>{p.name}</h3>
                <span className={`status status--${p.status.replace(" ", "").toLowerCase()}`}>{p.status}</span>
              </div>
              <p className="exp__summary">{p.summary}</p>
              <p className="exp__stack">{p.stack.join(" · ")}</p>
            </div>
            <div className="exp__links">
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="pill" title={host(p.url)}>
                  Site ↗
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="pill pill--ghost">
                  Repo ↗
                </a>
              )}
              {!p.url && !p.repo && <span className="pill pill--off">Private</span>}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
