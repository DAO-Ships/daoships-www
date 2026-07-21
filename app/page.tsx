import Link from "next/link";
import {
  ArrowUpRight, ArrowRight, Rocket, Vault, ShieldCheck, DoorOpen,
  Anchor, Code2, BookOpen, Compass,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HelmBackdrop } from "@/components/landing/HelmBackdrop";
import { TreasuryBand } from "@/components/landing/TreasuryBand";
import { UseCaseSelector } from "@/components/landing/UseCaseSelector";
import { whyCards, explainer, securityPoints } from "@/lib/content";
import { getStats } from "@/lib/stats";
import { site } from "@/lib/site";

const whyIcons = { Rocket, Vault, ShieldCheck, DoorOpen } as const;

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <HelmBackdrop />
        <div className="section relative pb-20 pt-20 sm:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-3.5 py-1.5 text-xs font-medium text-accent-700 dark:text-accent-200">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              Live on Quai Mainnet
            </span>
          </Reveal>
          <Reveal delay={0.04} className="mt-6">
            <span className="eyebrow">
              <Anchor className="h-3.5 w-3.5" />
              DAO launchpad for Quai Network
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-dao-text sm:text-6xl">
              Launch a DAO on Quai.{" "}
              <span className="text-gradient">In one transaction.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-dao-text-secondary">
              Open-source, audited governance with a Quai Vault multisig treasury —
              and the right to walk away. Inspired by MolochDAO v3, rewritten from
              scratch for modern DAOs.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={site.launchUrl} className="btn-primary">
                Launch a DAO
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/learn" className="btn-secondary">
                See how it works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Live stat strip */}
          <Reveal delay={0.2}>
            <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-dao-border bg-dao-border/60">
              {stats.map((s) => (
                <div key={s.label} className="bg-dao-dark-2/80 px-5 py-5">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-dao-text-hint">
                    {s.live && (
                      <span className="inline-block h-1.5 w-1.5 animate-glow-pulse rounded-full bg-accent-400" />
                    )}
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-dao-text">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-xs text-dao-text-hint">
              Live from the DAO Ships indexer · Quai Mainnet (Cyprus-1)
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 60-second explainer ──────────────────────────────── */}
      <section className="section py-20">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">
            <Compass className="h-3.5 w-3.5" />
            How a DAO ship works
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
            A whole organization, governed by code.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {explainer.map((e, i) => (
            <Reveal key={e.step} delay={i * 0.08}>
              <div className="card card-hover h-full p-7">
                <span className="font-mono text-sm text-primary-400">{e.step}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-dao-text">
                  {e.title}
                </h3>
                <p className="mt-3 text-dao-text-secondary">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            href="/learn"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary-300 hover:text-primary-200"
          >
            Walk through it interactively
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ─── Why DAO Ships ────────────────────────────────────── */}
      <section className="section py-10">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Why DAO Ships</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
            Built for how DAOs actually operate.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {whyCards.map((c, i) => {
            const Icon = whyIcons[c.icon as keyof typeof whyIcons];
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="card card-hover flex h-full flex-col p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary-500/40 bg-primary-500/10 text-primary-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-dao-text">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-dao-text-secondary">{c.body}</p>
                  <p className="mt-5 border-t border-dao-border/60 pt-4 font-mono text-sm text-accent-300">
                    {c.stat}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="py-10" />
      <TreasuryBand />

      {/* ─── Use-case selector ────────────────────────────────── */}
      <section className="section py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Use cases</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
            What are you building?
          </h2>
          <p className="mt-4 text-lg text-dao-text-secondary">
            Five battle-tested templates pre-tune governance for your scale and trust
            model — from a 3-person founding team to a fleet of autonomous agents.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <UseCaseSelector />
        </Reveal>
      </section>

      {/* ─── Security strip ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-dao-border/60 bg-dao-dark-2/40 py-20">
        <div className="section">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <ShieldCheck className="h-3.5 w-3.5" />
                Security
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
                Audited to zero unresolved findings.
              </h2>
              <p className="mt-4 text-lg text-dao-text-secondary">
                Five review passes, every severity resolved. We document the exact
                hardening we added over upstream — and the trade-offs we chose.
              </p>
            </div>
            <Link href="/security" className="btn-secondary shrink-0">
              Read the security model
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {securityPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <h3 className="font-display font-semibold text-dao-text">{p.title}</h3>
                  <p className="mt-2 text-sm text-dao-text-secondary">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For builders ─────────────────────────────────────── */}
      <section className="section py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">
              <Code2 className="h-3.5 w-3.5" />
              For builders
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
              A protocol you can build on.
            </h2>
            <p className="mt-4 text-lg text-dao-text-secondary">
              Launch DAOs from TypeScript, query the event-indexed Supabase data layer,
              or write your own Navigator — immutable, permissioned extensions for custom
              onboarding and treasury logic.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/docs/developers/architecture" className="btn-primary">
                <BookOpen className="h-4 w-4" />
                Developer docs
              </Link>
              <a href={site.github} className="btn-secondary">
                <Code2 className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-dao-border/60 bg-dao-dark-2/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-quai/70" />
                <span className="h-3 w-3 rounded-full bg-primary-500/60" />
                <span className="h-3 w-3 rounded-full bg-accent-500/60" />
                <span className="ml-2 font-mono text-xs text-dao-text-muted">
                  launch-dao.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-dao-text-secondary">
                <code>{`const launcher = DAOShipAndVaultLauncher__factory
  .connect(LAUNCHER, signer);

// One tx → DAOShip + Shares + Loot + Quai Vault
const tx = await launcher.launchDAOShipAndVault(
  initParams,        // governance config
  [],                // navigators
  "Crew Shares", "CREW",
  "Crew Loot",   "LOOT",
  [founder],         // vault owners
  1,                 // multisig threshold
  ...salts,
);
await tx.wait();`}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <section className="section pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-dao-dark-3 to-dao-dark-2 px-8 py-16 text-center shadow-indigo-glow-lg">
          <div className="absolute inset-0 grid-faint opacity-30" aria-hidden />
          <Reveal className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-dao-text sm:text-4xl">
              Ready to take the helm?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-dao-text-secondary">
              Spin up a DAO on Quai mainnet in minutes. No fork to maintain, no
              treasury contract to trust — just governance that works.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={site.launchUrl} className="btn-primary">
                Launch a DAO
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={site.exploreUrl} className="btn-secondary">
                Explore the fleet
              </a>
              <Link href="/docs" className="btn-secondary">
                Read the docs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
