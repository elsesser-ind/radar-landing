"use client";

import { animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Счётчик от 0 до target, запускается при появлении в viewport.
 * Поддерживает формат с разделителями тысяч, префикс/суффикс,
 * десятичные знаки, ease-out curve.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "ru-RU",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(from);
  const [display, setDisplay] = useState(
    formatNumber(from, decimals, locale, prefix, suffix),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(formatNumber(v, decimals, locale, prefix, suffix)),
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, locale, prefix, suffix, mv]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function formatNumber(
  v: number,
  decimals: number,
  locale: string,
  prefix: string,
  suffix: string,
): string {
  const n = Number(v.toFixed(decimals));
  const formatted = n.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}
