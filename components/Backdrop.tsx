"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Ambient light + grain + scroll progress. No grid lines, ever. */
export default function Backdrop() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const sunY = useTransform(scrollYProgress, [0, 1], ["-10vh", "60vh"]);
  const emberY = useTransform(scrollYProgress, [0, 1], ["70vh", "-10vh"]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <div className="backdrop" aria-hidden>
        <motion.div className="orb orb--sun" style={{ y: sunY }} />
        <motion.div className="orb orb--ember" style={{ y: emberY }} />
        <div className="grain" />
      </div>
    </>
  );
}
