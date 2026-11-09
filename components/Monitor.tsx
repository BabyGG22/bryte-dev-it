"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { Project } from "@/data/site";

type Props = {
  id: string;
  index: string;
  title: string;
  intro: string;
  projects: Project[];
};

const host = (u?: string) => (u ? u.replace(/^https?:\/\//, "").replace(/\/$/, "") : "");

/** Live screenshot of the product's UI (blurred behind the screen content). A local /public/shots image wins if set. */
function shotFor(p: Project) {
  if (p.shot) return p.shot;
  if (!p.url) return null;
  const q = new URLSearchParams({
    url: p.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
    waitForTimeout: "2500",
  });
  return `https://api.microlink.io/?${q.toString()}`;
}

function ScreenBg({ project }: { project: Project }) {
  const [ok, setOk] = useState(true);
  const src = shotFor(project);
  const [a, b] = project.tint;
  return (
    <div className="screen__bg" style={{ background: `radial-gradient(120% 120% at 85% 0%, ${b} 0%, ${a} 65%)` }}>
      {src && ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" onError={() => setOk(false)} />
      )}
      <div className="screen__tint" style={{ background: `linear-gradient(160deg, ${a}e6 0%, ${a}b3 45%, ${b}80 100%)` }} />
    </div>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", weekday: "short", timeZone: "Africa/Lagos" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const i = setInterval(tick, 20000);
    return () => clearInterval(i);
  }, []);
  return <span>{t}</span>;
}

const slide = {
  enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0, scale: 0.96 }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0, scale: 0.96 }),
};

export default function Monitor({ id, index, title, intro, projects }: Props) {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const p = projects[i];
  const n = projects.length;

  const go = useCallback((d: number) => setState(([cur]) => [(cur + d + n) % n, d]), [n]);
  const jump = (to: number) => setState(([cur]) => [to, to > cur ? 1 : -1]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section id={id} className="section showcase">
      <header className="section__head">
        <span className="section__index">{index}</span>
        <h2>{title}</h2>
        <p className="section__intro">{intro}</p>
      </header>

      <motion.div
        className="mac"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label={`${title}: ${p.name}, ${i + 1} of ${n}`}
      >
        <div className="mac__body">
          <div className="mac__screen">
            {/* menu bar */}
            <div className="menubar">
              <span className="menubar__logo">◆</span>
              <strong>Bryte OS</strong>
              <span className="menubar__item">{p.name}</span>
              <span className="menubar__item menubar__hide">View</span>
              <span className="menubar__item menubar__hide">Go</span>
              <span className="menubar__spacer" />
              <span className="menubar__item">{i + 1}/{n}</span>
              <Clock />
            </div>

            <div className="screen__stage">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={p.slug}
                  className="screen__slide"
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                >
                  <ScreenBg project={p} />

                  <div className="window">
                    <div className="window__bar">
                      <span className="lights">
                        <i />
                        <i />
                        <i />
                      </span>
                      {p.url ? (
                        <a className="urlbar" href={p.url} target="_blank" rel="noreferrer">
                          <span className="urlbar__lock">🔒</span> {host(p.url)} <span className="urlbar__go">↗</span>
                        </a>
                      ) : (
                        <span className="urlbar urlbar--off">{p.name.toLowerCase()} · not public yet</span>
                      )}
                    </div>

                    <div className="window__body">
                      <div className="window__meta">
                        <span className={`status status--${p.status.replace(" ", "").toLowerCase()}`}>{p.status}</span>
                        <span className="window__net">{p.network}</span>
                      </div>
                      <h3 className="window__name">{p.name}</h3>
                      <p className="window__tagline">{p.tagline}</p>
                      <p className="window__desc">{p.description}</p>
                      <p className="window__role">
                        <span>My role</span> {p.role}
                      </p>
                      <div className="window__stack">
                        {p.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                      <div className="window__links">
                        {p.url ? (
                          <a className="btn btn--primary btn--sm" href={p.url} target="_blank" rel="noreferrer">
                            Visit {host(p.url)} ↗
                          </a>
                        ) : (
                          <span className="btn btn--ghost btn--sm is-disabled">Not public yet</span>
                        )}
                        {p.repo ? (
                          <a className="btn btn--ghost btn--sm" href={p.repo} target="_blank" rel="noreferrer">
                            View repo ↗
                          </a>
                        ) : (
                          <span className="btn btn--ghost btn--sm is-disabled">Private repo</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* dock */}
            <div className="dock">
              {projects.map((q, k) => (
                <motion.button
                  key={q.slug}
                  className={`dock__app ${k === i ? "is-active" : ""}`}
                  onClick={() => jump(k)}
                  whileHover={{ y: -8, scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  style={{ background: `linear-gradient(145deg, ${q.tint[1]}, ${q.tint[0]})` }}
                  aria-label={`Open ${q.name}`}
                  title={q.name}
                >
                  {q.name.slice(0, 1).toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="mac__chin">
            <span className="mac__badge">B</span>
          </div>
        </div>
        <div className="mac__neck" />
        <div className="mac__foot" />
      </motion.div>

      {n > 1 && (
        <div className="showcase__controls">
          <button className="btn btn--round" onClick={() => go(-1)} aria-label="Previous">
            ←
          </button>
          <span className="showcase__count">
            <strong>{p.name}</strong> · {i + 1} of {n}
          </span>
          <button className="btn btn--primary showcase__next" onClick={() => go(1)}>
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
