"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Vote, Coins, ArrowRight, RotateCcw } from "lucide-react";

type Crew = { name: string; shares: number; loot: number; color: string };

const CREW: Crew[] = [
  { name: "Mara", shares: 40, loot: 10, color: "#6366f1" },
  { name: "Idris", shares: 25, loot: 20, color: "#06b6d4" },
  { name: "Wren", shares: 15, loot: 35, color: "#a5b4fc" },
];

export function CrewVisual() {
  // Wren delegates her voting power to Mara when true.
  const [delegated, setDelegated] = useState(false);

  const power = CREW.map((c) => {
    if (c.name === "Mara" && delegated) return c.shares + 15; // + Wren's 15
    if (c.name === "Wren" && delegated) return 0;
    return c.shares;
  });
  const maxPower = 55;

  return (
    <div className="card p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-dao-text-hint">
          The crew
        </span>
        <button
          onClick={() => setDelegated((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dao-border px-3 py-1.5 text-xs font-medium text-dao-text-secondary transition-colors hover:border-primary-500/50 hover:text-dao-text"
        >
          {delegated ? <RotateCcw className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          {delegated ? "Reset delegation" : "Wren delegates to Mara"}
        </button>
      </div>

      <div className="space-y-4">
        {CREW.map((c, i) => (
          <div key={c.name} className="flex items-center gap-3">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
              style={{ backgroundColor: c.color + "33", color: c.color }}
            >
              {c.name[0]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-dao-text">{c.name}</span>
                <span className="flex items-center gap-3 font-mono text-xs text-dao-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Vote className="h-3 w-3 text-primary-400" />
                    {c.shares}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Coins className="h-3 w-3 text-accent-400" />
                    {c.loot}
                  </span>
                </span>
              </div>
              {/* voting power bar */}
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-dao-dark-1">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(power[i] / maxPower) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {c.name === "Wren" && delegated && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 font-mono text-[11px] text-quai"
                >
                  → voting power lent to Mara (keeps her Loot)
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-dao-border/60 pt-4 text-xs text-dao-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Vote className="h-3.5 w-3.5 text-primary-400" /> Shares = voting power
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Coins className="h-3.5 w-3.5 text-accent-400" /> Loot = economic, no vote
        </span>
      </div>
    </div>
  );
}
