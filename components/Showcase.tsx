"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { Project } from "@/data/site";
import { products, experiments } from "@/data/site";

const host = (u?: string) => (u ? u.replace(/^https?:\/\//, "").replace(/\/$/, "") : "");
/** Relative asset path so the site works at a domain root or a sub-path */
export const asset = (p?: string) => (p ? p.replace(/^\//, "") : undefined);

export function Logo({ project, size = 44 }: { project: Project; size?: number }) {
  return (
    <span
      className="logo-tile"
      style={{ width: size, height: size, background: project.logoBg ?? "transparent", borderRadius: size * 0.26 }}
    >
      {project.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(project.logo)} alt={`${project.name} logo`} />
      ) : (
        <span className="logo-tile__txt">{project.name.slice(0, 1)}</span>
      )}
    </span>
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
  enter: (d: number) => ({ x: d > 0 ? "40%" : "-40%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
};

const groups = { products, experiments } as const;
type Group = keyof typeof groups;

export default function Showcase() {
  const [group, setGroup] = useState<Group>("products");
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const list = groups[group];
  const p = list[i];
  const n = list.length;

  const go = useCallback((d: number) => setState(([cur]) => [(cur + d + n) % n, d]), [n]);
  const jump = (to: number) => setState(([cur]) => [to, to >= cur ? 1 : -1]);
  const switchGroup = (g: Group) => {
    setGroup(g);
    setState([0, 1]);
  };

  // Nav links #products / #experiments pick the tab
  useEffect(() => {
    const sync = () => {
      if (location.hash === "#experiments") switchGroup("experiments");
      if (location.hash === "#products") switchGroup("products");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section id="products" className="section showcase">
      <span id="experiments" className="anchor" aria-hidden />
      <header className="section__head">
        <span className="section__index">03</span>
        <h2>Work</h2>
        <div className="tabs" role="tablist">
          {(["products", "experiments"] as Group[]).map((g) => (
            <button key={g} role="tab" aria-selected={group === g} className={`tabs__btn ${group === g ? "is-on" : ""}`} onClick={() => switchGroup(g)}>
              <span>
                {g === "products" ? "Products" : "Experiments"} <em>{groups[g].length}</em>
              </span>
            </button>
          ))}
        </div>
      </header>

      <motion.div
        className="mac"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-roledescription="carousel"
        aria-label={`${p.name}, ${i + 1} of ${n}`}
      >
        <div className="mac__body">
          <div className="mac__screen">
            <div className="menubar">
              <span className="menubar__logo" />
              <strong>Bright Wallan</strong>
              <span className="menubar__item menubar__hide">{group === "products" ? "Products" : "Experiments"}</span>
              <span className="menubar__item">{p.name}</span>
              <span className="menubar__spacer" />
              <span className="menubar__item">
                {i + 1}/{n}
              </span>
              <Clock />
            </div>

            <div className="screen__stage">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={group + p.slug}
                  className="slide"
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                >
                  <div className="browser">
                    <div className="browser__bar">
                      <span className="lights">
                        <i />
                        <i />
                        <i />
                      </span>
                      {p.url ? (
                        <a className="urlbar" href={p.url} target="_blank" rel="noreferrer">
                          <svg className="urlbar__lock" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V7Z"/></svg> {host(p.url)} <span className="urlbar__go">↗</span>
                        </a>
                      ) : (
                        <span className="urlbar urlbar--off">{p.repo ? "local build · not deployed" : "private build"}</span>
                      )}
                    </div>

                    <div className="browser__view" style={{ background: `radial-gradient(120% 120% at 80% 0%, ${p.tint[1]}, ${p.tint[0]} 70%)` }}>
                      {p.shot ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className={`browser__shot ${p.shotFit === "contain" ? "is-contain" : ""}`} src={asset(p.shot)} alt={`${p.name} interface`} draggable={false} />
                      ) : (
                        <div className="browser__empty">
                          <Logo project={p} size={84} />
                          <span>{p.status === "Live" ? "Invite-only pilot" : "Preview coming soon"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="info">
                    <div className="info__head">
                      <Logo project={p} size={46} />
                      <div>
                        <h3>{p.name}</h3>
                        <div className="info__meta">
                          <span className={`status status--${p.status.replace(" ", "").toLowerCase()}`}>{p.status}</span>
                          {p.network && <span className="info__net">{p.network}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="info__summary">{p.summary}</p>
                    <dl className="info__facts">
                      <div>
                        <dt>Role</dt>
                        <dd>{p.role}</dd>
                      </div>
                      <div>
                        <dt>Built with</dt>
                        <dd>{p.stack.join(" · ")}</dd>
                      </div>
                    </dl>
                    <div className="info__links">
                      {p.url && (
                        <a className="btn btn--primary btn--sm" href={p.url} target="_blank" rel="noreferrer">
                          Visit site ↗
                        </a>
                      )}
                      {p.repo && (
                        <a className="btn btn--glass btn--sm" href={p.repo} target="_blank" rel="noreferrer">
                          View code ↗
                        </a>
                      )}
                      {!p.url && !p.repo && <span className="btn btn--glass btn--sm is-disabled">Private repo</span>}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="dock">
              {list.map((q, k) => (
                <motion.button
                  key={q.slug}
                  className={`dock__app ${k === i ? "is-active" : ""}`}
                  onClick={() => jump(k)}
                  whileHover={{ y: -8, scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Show ${q.name}`}
                  title={q.name}
                >
                  <Logo project={q} size={40} />
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
    </section>
  );
}
