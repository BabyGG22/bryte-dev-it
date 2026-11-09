"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hero, owner, products, experiments } from "@/data/site";

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

const orbiters = [...products, ...experiments.slice(0, 3)];

function Orbit() {
  return (
    <div className="orbit" aria-hidden>
      <motion.div
        className="planet"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease }}
      >
        <span className="planet__ring" />
        <span className="planet__core" />
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
                  <motion.span
                    className="orbit__label"
                    animate={{ rotate: ring ? 360 : -360 }}
                    transition={{ duration: ring ? 90 : 60, repeat: Infinity, ease: "linear" }}
                  >
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

      <div className="hero__visual">
        <Orbit />
      </div>
    </section>
  );
}
