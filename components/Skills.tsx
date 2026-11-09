"use client";

import { motion } from "framer-motion";
import { skills, owner, contacts } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" className="section section--tight">
      <header className="section__head">
        <span className="section__index">02</span>
        <h2>Skills</h2>
        {owner.cvUrl ? (
          <a className="btn btn--ghost btn--sm section__action" href={owner.cvUrl} download>
            Download CV ↓
          </a>
        ) : (
          <a className="btn btn--ghost btn--sm section__action" href={`mailto:${contacts.email}?subject=CV%20request`}>
            Request CV →
          </a>
        )}
      </header>

      <ul className="skills">
        {skills.map((s, i) => (
          <motion.li
            key={s.title}
            className="skill"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <span className="skill__num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
