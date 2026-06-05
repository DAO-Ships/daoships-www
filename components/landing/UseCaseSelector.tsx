"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { templates } from "@/lib/templates";
import { site } from "@/lib/site";

export function UseCaseSelector() {
  const [active, setActive] = useState(0);
  const t = templates[active];

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <div className="flex flex-col gap-2" role="tablist" aria-label="DAO templates">
        {templates.map((c, i) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
              i === active
                ? "border-primary-500/60 bg-primary-500/10 text-dao-text shadow-indigo-glow"
                : "border-dao-border bg-dao-dark-3/60 text-dao-text-secondary hover:border-primary-500/30 hover:text-dao-text"
            }`}
          >
            <span>
              <span className="block font-display text-sm font-semibold">{c.name}</span>
              <span className="block text-xs text-dao-text-muted">{c.range}</span>
            </span>
            <ArrowRight
              className={`h-4 w-4 transition-opacity ${
                i === active ? "opacity-100 text-primary-300" : "opacity-0 group-hover:opacity-60"
              }`}
            />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={t.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="card flex flex-col justify-between p-7"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-2xl font-semibold text-dao-text">{t.name}</h3>
              <span className="rounded-full border border-dao-border px-3 py-1 font-mono text-xs text-dao-text-muted">
                {t.range}
              </span>
              <span className="rounded-full border border-dao-border px-3 py-1 font-mono text-xs text-dao-text-muted">
                {t.treasury}
              </span>
            </div>
            <p className="mt-3 max-w-xl text-dao-text-secondary">{t.blurb}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {t.highlights.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 rounded-lg border border-dao-border/70 bg-dao-dark-2/50 px-3 py-2 text-sm text-dao-text-secondary"
                >
                  <Check className="h-4 w-4 shrink-0 text-accent-400" />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/use-cases/${t.key}`} className="btn-primary w-fit">
              Explore {t.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`${site.launchUrl}?template=${t.key}`} className="btn-secondary w-fit">
              Launch one
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
