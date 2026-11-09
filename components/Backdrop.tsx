"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Star = { x: number; y: number; z: number; r: number; tw: number; sp: number; hue: number };

/** Deep-space backdrop: twinkling parallax starfield, drifting nebulae, the odd shooting star. */
export default function Backdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const nebulaA = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
  const nebulaB = useTransform(scrollYProgress, [0, 1], ["0vh", "25vh"]);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0;
    let stars: Star[] = [];
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 2600);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 1.6,
        z: Math.random(), // depth → parallax + size
        r: Math.random() * 1.1 + 0.25,
        tw: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.8,
        hue: [220, 260, 45, 200, 0][Math.floor(Math.random() * 5)],
      }));
    };

    const draw = (t: number) => {
      const light = document.documentElement.dataset.theme === "light";
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const s of stars) {
        const y = (((s.y - sy * (0.04 + s.z * 0.18)) % (h * 1.6)) + h * 1.6) % (h * 1.6);
        if (y > h) continue;
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.sp + s.tw));
        const r = s.r * (0.6 + s.z);
        ctx.beginPath();
        ctx.arc(s.x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = light
          ? `hsla(${s.hue}, 40%, 30%, ${a * 0.35})`
          : `hsla(${s.hue}, ${s.hue === 0 ? 0 : 70}%, ${s.hue === 0 ? 100 : 85}%, ${a})`;
        ctx.fill();
        if (!light && s.z > 0.92) {
          ctx.beginPath();
          ctx.arc(s.x, y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${a * 0.08})`;
          ctx.fill();
        }
      }

      // shooting star
      if (!shooting && Math.random() < 0.004) {
        shooting = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, vx: -9, vy: 4.5, life: 1 };
      }
      if (shooting) {
        const s = shooting;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
        g.addColorStop(0, light ? `rgba(40,40,90,${0.5 * s.life})` : `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.018;
        if (s.life <= 0) shooting = null;
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <div className="backdrop" aria-hidden>
        <motion.div className="nebula nebula--violet" style={{ y: nebulaA }} />
        <motion.div className="nebula nebula--cyan" style={{ y: nebulaB }} />
        <motion.div className="nebula nebula--rose" style={{ y: nebulaA }} />
        <canvas ref={canvas} className="stars" />
      </div>
    </>
  );
}
