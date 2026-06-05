"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

const CHAPTERS = [
  { id: "crew", label: "Crew & tokens" },
  { id: "proposals", label: "Proposals & votes" },
  { id: "treasury", label: "Treasury & exit" },
];

export function ChapterNav() {
  const [active, setActive] = useState("crew");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.chapter || "crew");
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document.querySelectorAll("[data-chapter]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block" aria-label="Chapters">
      <ul className="flex flex-col gap-4">
        {CHAPTERS.map((c, i) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} className="group flex items-center gap-3">
                <span
                  className={clsx(
                    "flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-all",
                    on
                      ? "scale-125 border-primary-400 bg-primary-400 shadow-indigo-glow"
                      : "border-dao-border bg-transparent group-hover:border-dao-text-hint"
                  )}
                />
                <span
                  className={clsx(
                    "font-mono text-xs transition-all",
                    on
                      ? "text-primary-200 opacity-100"
                      : "text-dao-text-hint opacity-0 group-hover:opacity-100"
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {c.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
