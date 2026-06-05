import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Zap, GitBranch, Layers, Anchor } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { comparison } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why DAO Ships",
  description:
    "How DAO Ships compares to MolochDAO v3, Baal, and Zodiac — rewritten from scratch for security, efficiency, and Quai Network.",
};

const efficiency = [
  { icon: Zap, stat: "~300K gas", label: "to launch a full DAO (vs ~4M upstream)" },
  { icon: Layers, stat: "Parallel", label: "proposal processing — no sequential queue" },
  { icon: GitBranch, stat: "From scratch", label: "rewrite — not a fork with patches" },
];

export default function WhyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why DAO Ships"
        title={
          <>
            Inspired by MolochDAO v3.{" "}
            <span className="text-gradient">Rebuilt for what comes next.</span>
          </>
        }
        intro="DAO Ships keeps the governance model that made Moloch and Baal great — shares, loot, proposals, ragequit — and rewrites the engine underneath for stronger security, lower cost, and a multisig-secured treasury native to Quai."
      />

      {/* Efficiency highlights */}
      <section className="section py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {efficiency.map((e, i) => (
            <Reveal key={e.label} delay={i * 0.06}>
              <div className="card h-full p-7">
                <e.icon className="h-6 w-6 text-accent-400" />
                <p className="mt-4 font-display text-3xl font-semibold text-dao-text">
                  {e.stat}
                </p>
                <p className="mt-2 text-sm text-dao-text-secondary">{e.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="section py-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-dao-text">
            DAO Ships vs. upstream
          </h2>
          <p className="mt-3 text-dao-text-secondary">
            The same proven governance model, with documented hardening and Quai-native
            infrastructure. Neither is universally “better” — these trade-offs are tuned
            for Quai’s low-fee, multisig-first environment.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-dao-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-dao-dark-2/80 font-mono text-xs uppercase tracking-wider text-dao-text-hint">
                  <th className="px-5 py-4 font-medium">Aspect</th>
                  <th className="px-5 py-4 font-medium">Moloch v3 / Baal / Zodiac</th>
                  <th className="px-5 py-4 font-medium text-primary-300">DAO Ships</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 ? "bg-dao-dark-2/30" : "bg-transparent"}
                  >
                    <td className="px-5 py-4 font-medium text-dao-text">{row.feature}</td>
                    <td className="px-5 py-4 text-dao-text-muted">{row.upstream}</td>
                    <td className="px-5 py-4 text-dao-text-secondary">{row.daoships}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Nautical note */}
      <section className="section py-16">
        <Reveal>
          <div className="card flex flex-col gap-4 p-8 sm:flex-row sm:items-center">
            <Anchor className="h-8 w-8 shrink-0 text-primary-300" />
            <p className="text-dao-text-secondary">
              <span className="font-display font-semibold text-dao-text">
                Why “Ships”?
              </span>{" "}
              Each DAO is a vessel: the <em>DAOShip</em> is its governance, the crew are
              its members, <em>Navigators</em> are the extensions that chart its course,
              and the Quai Vault is the hold. Don’t like where it’s sailing? Ragequit —
              abandon ship with your share of the cargo.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section pb-10">
        <Reveal>
          <div className="rounded-3xl border border-primary-500/30 bg-gradient-to-br from-dao-dark-3 to-dao-dark-2 px-8 py-14 text-center shadow-indigo-glow-lg">
            <h2 className="font-display text-3xl font-semibold text-dao-text">
              See the security work in detail
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/security" className="btn-primary">
                The security model
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href={site.launchUrl} className="btn-secondary">
                Launch a DAO
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
