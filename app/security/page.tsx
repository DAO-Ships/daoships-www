import type { Metadata } from "next";
import { ShieldCheck, Vault, KeyRound, Clock, EyeOff, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { securityPoints } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "DAO Ships security model: audited to zero unresolved findings, with documented hardening over MolochDAO v3 and a Quai Vault multisig treasury.",
};

const vaultHardening = [
  {
    icon: KeyRound,
    title: "M-of-N multisig ownership",
    body: "Up to 20 owners with a configurable approval threshold. No single key can move funds.",
  },
  {
    icon: Clock,
    title: "Native timelocks",
    body: "A vault-level minimum execution delay floors every transaction; per-transaction overrides handle urgent vs. routine ops.",
  },
  {
    icon: EyeOff,
    title: "DelegateCall hardening",
    body: "DelegateCall is disabled by default; only an explicit whitelist (MultiSendCallOnly) is allowed — blocking Bybit-class storage attacks.",
  },
  {
    icon: ShieldCheck,
    title: "Epoch approval invalidation",
    body: "Removing an owner atomically invalidates all of their pending approvals in O(1) — no stale signatures linger.",
  },
];

const audits = [
  { label: "DAO Ships contracts", detail: "5 review passes", finding: "0 unresolved, any severity" },
  { label: "Quai Vault contracts", detail: "4 audit rounds", finding: "0 critical / high / medium open" },
  { label: "DAO Ships indexer", detail: "Audited Apr 2026", finding: "0 critical / high / medium open" },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title={
          <>
            Governance is only as good as{" "}
            <span className="text-gradient">what secures it.</span>
          </>
        }
        intro="DAO Ships was rewritten from scratch with a security-first posture, audited across multiple passes, and paired with a hardened Quai Vault multisig for the treasury. Here's exactly what protects your DAO."
      />

      {/* Audit summary */}
      <section className="section py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {audits.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.06}>
              <div className="card h-full p-7">
                <CheckCircle2 className="h-6 w-6 text-accent-400" />
                <h3 className="mt-4 font-display text-lg font-semibold text-dao-text">
                  {a.label}
                </h3>
                <p className="mt-1 font-mono text-xs text-dao-text-hint">{a.detail}</p>
                <p className="mt-4 border-t border-dao-border/60 pt-4 text-sm text-dao-text-secondary">
                  {a.finding}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Governance hardening */}
      <section className="section py-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-dao-text">
            Hardening over upstream
          </h2>
          <p className="mt-3 text-dao-text-secondary">
            Each of these is a deliberate improvement over MolochDAO v3 / Baal, documented
            in the contract security guide.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <h3 className="font-display font-semibold text-dao-text">{p.title}</h3>
                <p className="mt-2 text-sm text-dao-text-secondary">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vault hardening */}
      <section className="section py-16">
        <Reveal className="flex items-center gap-3">
          <Vault className="h-7 w-7 text-accent-300" />
          <h2 className="font-display text-3xl font-semibold text-dao-text">
            A treasury that defends itself
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-dao-text-secondary">
            Because the treasury is a Quai Vault, your DAO inherits an entire multisig
            security model on top of governance.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {vaultHardening.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card flex h-full gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-500/40 bg-accent-500/10 text-accent-300">
                  <v.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-dao-text">{v.title}</h3>
                  <p className="mt-1 text-sm text-dao-text-secondary">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="section pb-10">
        <Reveal>
          <div className="card flex flex-col items-start justify-between gap-5 p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-xl font-semibold text-dao-text">
                Found something? We want to hear it.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-dao-text-secondary">
                DAO Ships and Quai Vault are open-source and run a bug bounty. Responsible
                disclosure keeps the whole fleet safe.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={site.github} className="btn-secondary">
                Review the code
              </a>
              <a href={site.quaiVault} className="btn-primary">
                Quai Vault
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
