"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ThumbsUp, ThumbsDown, RotateCcw, Play } from "lucide-react";
import { clsx } from "clsx";

const STATES = ["Submitted", "Voting", "Grace", "Ready", "Processed"] as const;
const QUORUM = 30; // % of total voting power that must participate
const STEP = 15; // each click casts this much voting power

export function ProposalVisual() {
  const [stage, setStage] = useState(1); // index into STATES, start at "Voting"
  const [yes, setYes] = useState(20);
  const [no, setNo] = useState(5);

  const turnout = yes + no;
  const quorumMet = turnout >= QUORUM;
  const passing = quorumMet && yes > no;
  const decided = stage >= 3;

  function vote(side: "yes" | "no") {
    if (decided) return;
    if (side === "yes") setYes((v) => Math.min(100, v + STEP));
    else setNo((v) => Math.min(100, v + STEP));
  }
  function advance() {
    if (!quorumMet) return;
    setStage(passing ? 4 : 3); // pass → Processed; fail stays/returns to a defeated-style end
  }
  function reset() {
    setStage(1);
    setYes(20);
    setNo(5);
  }

  return (
    <div className="card p-6">
      {/* state machine */}
      <div className="mb-6 flex items-center justify-between">
        {STATES.map((s, i) => {
          const active = i === stage;
          const done = i < stage;
          return (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={clsx(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    active
                      ? "border-primary-400 bg-primary-500/20 text-primary-200 shadow-indigo-glow"
                      : done
                        ? "border-accent-500/50 bg-accent-500/10 text-accent-300"
                        : "border-dao-border text-dao-text-hint"
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span
                  className={clsx(
                    "text-[10px] font-medium",
                    active ? "text-primary-200" : "text-dao-text-hint"
                  )}
                >
                  {s}
                </span>
              </div>
              {i < STATES.length - 1 && (
                <span
                  className={clsx(
                    "mx-1 mb-4 h-px flex-1 transition-colors",
                    done ? "bg-accent-500/40" : "bg-dao-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* tally */}
      <div className="space-y-3">
        <Bar label="Yes" value={yes} color="#22d3ee" icon={<ThumbsUp className="h-3.5 w-3.5" />} />
        <Bar label="No" value={no} color="#f87171" icon={<ThumbsDown className="h-3.5 w-3.5" />} />
        {/* quorum marker */}
        <div className="relative h-5">
          <div
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${QUORUM}%` }}
          >
            <span className="h-3 w-px bg-dao-text-hint" />
            <span className="font-mono text-[10px] text-dao-text-hint">quorum {QUORUM}%</span>
          </div>
        </div>
      </div>

      {/* status banner */}
      <div
        aria-live="polite"
        className={clsx(
          "mt-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
          stage === 4
            ? "border-accent-500/40 bg-accent-500/10 text-accent-300"
            : stage === 3
              ? "border-quai/40 bg-quai/10 text-quai"
              : quorumMet
                ? "border-primary-500/40 bg-primary-500/10 text-primary-200"
                : "border-dao-border bg-dao-dark-2/60 text-dao-text-muted"
        )}
      >
        {stage === 4
          ? "✓ Passed — the Quai Vault executed the proposal."
          : stage === 3
            ? "✗ Defeated — quorum met but No outweighed Yes."
            : quorumMet
              ? passing
                ? `Quorum met · ${yes}% Yes vs ${no}% No — ready to process.`
                : `Quorum met · but No is ahead (${no}% vs ${yes}%).`
              : `Turnout ${turnout}% — needs ${QUORUM}% to reach quorum.`}
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => vote("yes")} disabled={decided} className="ctrl">
          <ThumbsUp className="h-3.5 w-3.5" /> Vote Yes
        </button>
        <button onClick={() => vote("no")} disabled={decided} className="ctrl">
          <ThumbsDown className="h-3.5 w-3.5" /> Vote No
        </button>
        <button
          onClick={advance}
          disabled={!quorumMet || decided}
          className="ctrl ctrl-primary"
        >
          <Play className="h-3.5 w-3.5" /> Process
        </button>
        <button onClick={reset} className="ctrl ml-auto">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <style jsx>{`
        .ctrl {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(var(--dao-border));
          background: rgb(var(--dao-surface) / 0.5);
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgb(var(--dao-text-secondary));
          transition: all 0.15s;
        }
        .ctrl:hover:not(:disabled) {
          color: rgb(var(--dao-text));
          border-color: rgba(99, 102, 241, 0.5);
        }
        .ctrl:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .ctrl-primary {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.5);
          color: rgb(var(--dao-link));
        }
      `}</style>
    </div>
  );
}

function Bar({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex w-12 items-center gap-1 font-mono text-xs text-dao-text-muted">
        {icon}
        {label}
      </span>
      <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-dao-dark-1">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-9 text-right font-mono text-xs text-dao-text-secondary">{value}%</span>
    </div>
  );
}
