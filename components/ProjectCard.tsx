"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/site";
import { owner } from "@/data/site";

/** Live screenshot of the site (blurred on the card). A local /public/shots image wins if set. */
function shotFor(p: Project) {
  if (p.shot) return p.shot;
  if (!p.url) return null;
  const q = new URLSearchParams({
    url: p.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
    waitForTimeout: "2500",
  });
  return `https://api.microlink.io/?${q.toString()}`;
}

function Backplate({ project }: { project: Project }) {
  const [ok, setOk] = useState(true);
  const src = shotFor(project);
  const [a, b] = project.tint;
  return (
    <div className="card__bg" style={{ background: `radial-gradient(120% 140% at 0% 0%, ${b} 0%, ${a} 60%)` }}>
      {src && ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" onError={() => setOk(false)} />
      )}
      <div className="card__tint" style={{ background: `linear-gradient(135deg, ${a}d9 0%, ${a}8c 45%, ${b}66 100%)` }} />
      <div className="card__sheen" />
    </div>
  );
}

function Chip() {
  return (
    <span className="emv" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function Contactless() {
  return (
    <svg className="contactless" viewBox="0 0 24 24" aria-hidden>
      {[5, 9, 13].map((r) => (
        <path key={r} d={`M${6 + r * 0.25} ${12 - r * 0.55} a${r} ${r} 0 0 1 0 ${r * 1.1}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </svg>
  );
}

const host = (u?: string) => (u ? u.replace(/^https?:\/\//, "").replace(/\/$/, "") : "");

export function CardFace({ project }: { project: Project }) {
  const number = host(project.url) || `${project.name} • ${project.status}`;
  return (
    <div className="card__face card__face--front">
      <Backplate project={project} />
      <div className="card__content">
        <div className="card__top">
          <span className="card__name">{project.name}</span>
          <span className={`status status--${project.status.replace(" ", "").toLowerCase()}`}>{project.status}</span>
        </div>

        <div className="card__mid">
          <Chip />
          <Contactless />
        </div>

        <div className="card__number">{number.toUpperCase()}</div>

        <div className="card__bottom">
          <div>
            <span className="card__label">Cardholder</span>
            <span className="card__holder">{owner.name.toUpperCase()}</span>
            <span className="card__role">{project.role}</span>
          </div>
          <span className="card__network">{project.network}</span>
        </div>
      </div>
    </div>
  );
}

function CardBack({ project }: { project: Project }) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div className="card__face card__face--back">
      <Backplate project={project} />
      <div className="card__stripe" />
      <div className="card__content card__content--back">
        <p className="card__tagline">{project.tagline}</p>
        <p className="card__desc">{project.description}</p>
        <div className="card__stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="card__links">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" onClick={stop} className="btn btn--card">
              Visit ↗
            </a>
          ) : (
            <span className="btn btn--card is-disabled">Not public yet</span>
          )}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer" onClick={stop} className="btn btn--card btn--card-ghost">
              Repo ↗
            </a>
          ) : (
            <span className="btn btn--card btn--card-ghost is-disabled">Private repo</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);

  // Subtle pointer tilt (desktop); ignored on touch
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="cardwrap">
      <motion.div
        className="tilt"
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.button
          className="card"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
          aria-label={`${project.name} card. ${flipped ? "Showing details" : "Tap to see details"}`}
          aria-pressed={flipped}
        >
          <CardFace project={project} />
          <CardBack project={project} />
          <motion.span className="card__glare" style={{ left: glareX }} aria-hidden />
        </motion.button>
      </motion.div>
      <p className="cardwrap__caption">
        <strong>{project.name}</strong> · {project.tagline}
        <span className="cardwrap__hint">{flipped ? "Tap to flip back" : "Tap for details"}</span>
      </p>
    </div>
  );
}
