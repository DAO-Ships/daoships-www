"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Vault, Wallet, DoorOpen, RotateCcw, Lock } from "lucide-react";
import { clsx } from "clsx";

const START = 1000;
const MIN_RETENTION = 0.66; // 66% must remain

export function TreasuryVisual() {
  const [balance, setBalance] = useState(START);
  const [flow, setFlow] = useState<null | "execute" | "ragequit">(null);
  const [log, setLog] = useState<string[]>([]);

  const retentionFloor = START * MIN_RETENTION;
  const ragequitAmount = 150; // Wren's proportional slice
  const ragequitBlocked = balance - ragequitAmount < retentionFloor;

  function run(kind: "execute" | "ragequit") {
    if (flow) return;
    if (kind === "ragequit" && ragequitBlocked) {
      setLog((l) => ["⚠ Ragequit blocked — would breach 66% retention floor.", ...l].slice(0, 4));
      return;
    }
    setFlow(kind);
  }

  function onArrive(kind: "execute" | "ragequit") {
    setFlow(null);
    if (kind === "execute") {
      setBalance((b) => b - 100);
      setLog((l) => ["✓ Proposal executed — vault sent 100 QUAI to the grantee.", ...l].slice(0, 4));
    } else {
      setBalance((b) => b - ragequitAmount);
      setLog((l) => [`✓ Wren ragequit — left with ${ragequitAmount} QUAI (her fair share).`, ...l].slice(0, 4));
    }
  }

  function reset() {
    setFlow(null);
    setBalance(START);
    setLog([]);
  }

  const pct = (balance / START) * 100;

  return (
    <div className="card p-6">
      {/* flow diagram */}
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <Node icon={Vote} label="Governance" tone="primary" />
          <Connector />
          <Node icon={Vault} label="Quai Vault" tone="accent" badge={<Lock className="h-3 w-3" />} />
          <Connector />
          <Node
            icon={flow === "ragequit" ? DoorOpen : Wallet}
            label={flow === "ragequit" ? "Exiting member" : "Recipient"}
            tone="quai"
          />
        </div>

        {/* animated packet */}
        <AnimatePresence>
          {flow && (
            <motion.div
              key={flow}
              className="absolute top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-indigo-glow"
              initial={{ left: flow === "execute" ? "4%" : "50%", opacity: 0 }}
              animate={{ left: flow === "execute" ? ["4%", "50%", "92%"] : ["50%", "92%"], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: flow === "execute" ? 1.4 : 0.9, ease: "easeInOut" }}
              onAnimationComplete={() => onArrive(flow)}
            >
              ◈
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* treasury balance + retention */}
      <div className="mt-7">
        <div className="flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-dao-text-hint">
            Treasury
          </span>
          <span className="font-display text-2xl font-semibold text-dao-text">
            {balance.toLocaleString()}{" "}
            <span className="text-sm font-normal text-dao-text-muted">QUAI</span>
          </span>
        </div>
        <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-dao-dark-1">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
          {/* retention floor marker */}
          <div
            className="absolute top-0 h-full w-px bg-quai"
            style={{ left: `${MIN_RETENTION * 100}%` }}
          />
        </div>
        <p className="mt-1 font-mono text-[11px] text-dao-text-hint">
          <span className="text-quai">|</span> 66% retention floor — protects against draining
        </p>
      </div>

      {/* controls */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={() => run("execute")} disabled={!!flow} className="tctrl tctrl-primary">
          <Vote className="h-3.5 w-3.5" /> Execute proposal
        </button>
        <button
          onClick={() => run("ragequit")}
          disabled={!!flow}
          className={clsx("tctrl", ragequitBlocked && "tctrl-blocked")}
        >
          <DoorOpen className="h-3.5 w-3.5" /> Ragequit (Wren)
        </button>
        <button onClick={reset} className="tctrl ml-auto">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* log */}
      <div
        aria-live="polite"
        className="mt-4 min-h-[44px] rounded-lg border border-dao-border/60 bg-dao-dark-1/60 p-3"
      >
        {log.length === 0 ? (
          <p className="font-mono text-[11px] text-dao-text-hint">
            Try executing a proposal, then ragequit until the floor blocks it.
          </p>
        ) : (
          <ul className="space-y-1">
            {log.map((line, i) => (
              <li key={i} className="font-mono text-[11px] text-dao-text-secondary">
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .tctrl {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          border-radius: 0.5rem;
          border: 1px solid var(--dao-border);
          background: rgba(37, 37, 64, 0.5);
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--dao-text-secondary);
          transition: all 0.15s;
        }
        .tctrl:hover:not(:disabled) {
          color: var(--dao-text);
          border-color: rgba(99, 102, 241, 0.5);
        }
        .tctrl:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .tctrl-primary {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.5);
          color: #c7d2fe;
        }
        .tctrl-blocked {
          border-color: rgba(226, 1, 1, 0.4);
          color: #fca5a5;
        }
      `}</style>
    </div>
  );
}

function Node({
  icon: Icon,
  label,
  tone,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "primary" | "accent" | "quai";
  badge?: React.ReactNode;
}) {
  const ring = {
    primary: "border-primary-500/50 text-primary-300 bg-primary-500/10",
    accent: "border-accent-500/50 text-accent-300 bg-accent-500/10",
    quai: "border-quai/50 text-quai bg-quai/10",
  }[tone];
  return (
    <div className="flex flex-1 flex-col items-center gap-2 text-center">
      <span className={clsx("relative inline-flex h-12 w-12 items-center justify-center rounded-xl border", ring)}>
        <Icon className="h-5 w-5" />
        {badge && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-dao-border bg-dao-dark-2 text-dao-text-muted">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[11px] font-medium text-dao-text-secondary">{label}</span>
    </div>
  );
}

function Connector() {
  return <span className="mb-5 h-px flex-1 bg-dao-border" />;
}
