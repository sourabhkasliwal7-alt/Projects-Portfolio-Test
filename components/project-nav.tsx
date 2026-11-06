"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface NavCategory {
  key: string;
  label: string;
  emoji?: string;
}

interface ProjectNavProps {
  /** The scrollable wrapper id that "All" jumps to. */
  topId: string;
  categories: NavCategory[];
}

export function ProjectNav({ topId, categories }: ProjectNavProps) {
  const [active, setActive] = useState<string>("all");
  const navRef = useRef<HTMLDivElement>(null);

  // Section ids to watch (everything except the synthetic "all").
  const sectionKeys = categories.filter((c) => c.key !== "all").map((c) => c.key);

  // ── Scroll spy ──────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand[0]) {
          setActive(inBand[0].target.id.replace(/^cat-/, ""));
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sectionKeys.forEach((key) => {
      const el = document.getElementById(`cat-${key}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKeys.join(",")]);

  // Snap back to "All" when scrolled above the first section (into the hero).
  useEffect(() => {
    const onScroll = () => {
      const first = document.getElementById(`cat-${sectionKeys[0]}`);
      if (first && first.getBoundingClientRect().top > 160) setActive("all");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKeys.join(",")]);

  // Keep the active chip in view on mobile horizontal scroll.
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>(`[data-key="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  function goTo(key: string) {
    const target =
      key === "all"
        ? document.getElementById(topId)
        : document.getElementById(`cat-${key}`);
    target?.scrollIntoView({ behavior: "smooth", block: key === "all" ? "start" : "start" });
    setActive(key);
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav
        ref={navRef}
        aria-label="Project categories"
        className="mx-auto max-w-6xl overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex w-max gap-1.5">
        {categories.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              data-key={cat.key}
              onClick={() => goTo(cat.key)}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          );
        })}
        </div>
      </nav>
    </div>
  );
}
