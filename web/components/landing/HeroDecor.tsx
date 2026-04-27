"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Декоративный Playfair-watermark в Hero. Огромная italic-цифра «01»
 * плавно уезжает вверх при скролле — даёт ощущение глубины,
 * не перегружая композицию.
 */
export function HeroDecor() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute -left-[4vw] top-[18%] font-display italic font-semibold text-navy/[0.04] select-none leading-none"
      >
        <span className="block text-[clamp(340px,56vw,780px)]">01</span>
      </motion.div>
    </div>
  );
}
