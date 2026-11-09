"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hero, owner, products, experiments } from "@/data/site";
import { CardFace } from "./ProjectCard";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % owner.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="role">
      <AnimatePresence mode="wait">
        <motion.span
          key={owner.roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {owner.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fan = [products[0], products[1], experiments[0]];

export default function Hero() {
  return (
    <section id="intro" className="hero">
      <div className="hero__copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <span className="dot" /> {hero.eyebrow}
        </motion.p>

        <h1 className="hero__title">
          {[hero.headlineTop, hero.headlineBottom].map((line, i) => (
            <span className="line" key={line}>
              <motion.span
                className={i === 1 ? "glow" : undefined}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero__role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="muted">Bright Wallan —</span> <RotatingRole />
        </motion.div>

        <motion.p
          className="hero__welcome"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
        >
          {hero.welcome}
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease }}
        >
          <a href="#products" className="btn btn--primary">
            See the work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Start a project
          </a>
        </motion.div>

        <motion.p
          className="hero__status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span className="pulse" /> Currently shipping <strong>Callit</strong> &amp; <strong>PredArena</strong> · {owner.location}
        </motion.p>
      </div>

      <div className="hero__fan" aria-hidden>
        {fan.map((p, i) => (
          <motion.div
            key={p.slug}
            className="hero__fancard"
            style={{ zIndex: 3 - i }}
            initial={{ opacity: 0, y: 80, rotate: 0 }}
            animate={{ opacity: 1, y: i * 26, x: i * 22, rotate: -8 + i * 7 }}
            whileHover={{ y: i * 26 - 14, rotate: -8 + i * 7 - 2 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 90, damping: 16 }}
          >
            <CardFace project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
