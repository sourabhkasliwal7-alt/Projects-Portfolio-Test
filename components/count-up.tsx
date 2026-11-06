"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* useLayoutEffect on the client, useEffect on the server — lets us reset to
   zero *before* the first paint, so the final value never flashes first. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type CountUpProps = {
  /** The number to count up to. */
  value: number;
  /** Rendered after the number, e.g. "+" or "%". Fades in once the count lands. */
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  /* Seeded with the final value so SSR — and anyone without JS — still gets
     the real number in the markup. */
  const [display, setDisplay] = useState(value);
  const [settled, setSettled] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    setDisplay(0);
    setSettled(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // decelerates hard — lands rather than stops
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => setSettled(true),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      {/* Reserve the full digit width up front so the suffix never shifts
         as the count crosses 9 → 10. */}
      <span
        aria-hidden="true"
        className="inline-block text-right tabular-nums"
        style={{ minWidth: `${String(value).length}ch` }}
      >
        {display}
      </span>
      {suffix && (
        <span
          aria-hidden="true"
          className={`inline-block transition-all duration-500 ease-out ${
            settled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
