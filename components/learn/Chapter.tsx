import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Chapter({
  id,
  num,
  total,
  eyebrow,
  title,
  visual,
  reverse = false,
  children,
}: {
  id: string;
  num: number;
  total: number;
  eyebrow: string;
  title: string;
  visual: ReactNode;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-chapter={id}
      className="learn-chapter scroll-mt-24 border-t border-dao-border/50 py-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2">
        {/* Text column */}
        <div className={clsx("max-w-xl", reverse ? "lg:order-2" : "lg:order-1")}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-primary-400">
              {String(num).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-dao-border" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-dao-text-hint">
              {eyebrow} · {num}/{total}
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-dao-text sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-dao-text-secondary [&_a]:font-medium [&_a]:text-primary-300 [&_a:hover]:text-primary-200">
            {children}
          </div>
        </div>

        {/* Visual column (sticky on desktop) */}
        <div className={clsx(reverse ? "lg:order-1" : "lg:order-2")}>
          <div className="lg:sticky lg:top-24">{visual}</div>
        </div>
      </div>
    </section>
  );
}
