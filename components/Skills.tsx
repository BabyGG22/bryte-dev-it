"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills, rep, owner, contacts } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [open, setOpen] = useState(0);

  return (
    <section id="skills" className="section">
      <header className="section__head">
        <span className="section__index">02</span>
        <h2>
          Skills <span className="amp">&amp;</span> rep
        </h2>
        <p className="section__intro">Skilled in using AI to do four things really well:</p>
      </header>

      <div className="skills">
        <ul className="skills__list">
          {skills.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={s.title}
                className={`skill ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
              >
                <button className="skill__row" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="skill__num">0{i + 1}</span>
                  <span className="skill__title">{s.title}</span>
                  <span className="skill__kicker">{s.kicker}</span>
                  <motion.span className="skill__plus" animate={{ rotate: isOpen ? 45 : 0 }}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="skill__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p>{s.body}</p>
                      <div className="chips">
                        {s.tools.map((t) => (
                          <span className="chip" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <aside className="rep">
          {rep.map((r, i) => (
            <motion.div
              className="rep__item"
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease }}
            >
              <span className="rep__value">{r.value}</span>
              <span className="rep__label">{r.label}</span>
            </motion.div>
          ))}

          {owner.cvUrl ? (
            <a className="btn btn--primary rep__cv" href={owner.cvUrl} download>
              Download my CV ↓
            </a>
          ) : (
            <a className="btn btn--ghost rep__cv" href={`mailto:${contacts.email}?subject=CV%20request`}>
              Request my CV →
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
