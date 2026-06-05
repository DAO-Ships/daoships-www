import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Anchor, BookOpen } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Chapter } from "@/components/learn/Chapter";
import { ChapterNav } from "@/components/learn/ChapterNav";
import { CrewVisual } from "@/components/learn/CrewVisual";
import { ProposalVisual } from "@/components/learn/ProposalVisual";
import { TreasuryVisual } from "@/components/learn/TreasuryVisual";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn — Take the Helm",
  description:
    "An interactive walkthrough of how a DAO works on DAO Ships — crew and tokens, proposals and votes, treasury and exit. No wallet required.",
};

export default function LearnPage() {
  return (
    <>
      <ChapterNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dao-border/60">
        <div className="absolute inset-0 grid-faint mask-fade-b opacity-50" aria-hidden />
        <div
          className="absolute left-1/2 top-[-30%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-[120px]"
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-120px] top-[10%] hidden h-[360px] w-[360px] opacity-[0.12] mask-radial lg:block"
        >
          <div className="h-full w-full animate-spin-slow">
            <Image src="/logos/dao_ships_helm_dark_transparent.svg" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="section relative py-20 sm:py-24">
          <Reveal>
            <span className="eyebrow">
              <Anchor className="h-3.5 w-3.5" />
              Take the helm
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-dao-text sm:text-6xl">
              Learn how a DAO works — <span className="text-gradient">by steering one.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-dao-text-secondary">
              Three short chapters take you from members and tokens, through proposals and
              voting, to the treasury and the right to leave. Everything here is a live demo
              you can poke — no wallet, no risk.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#crew" className="btn-primary mt-8">
              Start the voyage
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <div className="section">
        {/* Chapter 1 — Crew & tokens */}
        <Chapter
          id="crew"
          num={1}
          total={3}
          eyebrow="Crew & tokens"
          title="Every DAO has a crew."
          visual={<CrewVisual />}
        >
          <p>
            A DAO is a group of people — the <strong>crew</strong> — who make decisions
            together. Each member holds two kinds of tokens, and the split is the heart of
            how DAO Ships works.
          </p>
          <p>
            <strong className="text-primary-300">Shares</strong> are voting power.{" "}
            <strong className="text-accent-300">Loot</strong> is economic weight with no
            vote — perfect for investors, contributors, or rewards that shouldn&apos;t come
            with governance control.
          </p>
          <p>
            Members can <strong>delegate</strong> their voting power to someone they trust
            without giving up their tokens. Try lending Wren&apos;s votes to Mara in the
            panel — watch the voting bars shift while the Loot stays put.
          </p>
          <p>
            <Link href="/docs/concepts/shares-vs-loot">Read more: Shares vs. Loot →</Link>
          </p>
        </Chapter>

        {/* Chapter 2 — Proposals & votes */}
        <Chapter
          id="proposals"
          num={2}
          total={3}
          eyebrow="Proposals & votes"
          title="Decisions move through a lifecycle."
          reverse
          visual={<ProposalVisual />}
        >
          <p>
            Anyone in the crew can propose an action — fund a grant, add a member, change a
            rule. Each proposal walks a clear path:{" "}
            <strong>Submitted → Voting → Grace → Ready → Processed.</strong>
          </p>
          <p>
            For a proposal to pass, enough voting power has to show up — that&apos;s{" "}
            <strong>quorum</strong> — and Yes has to beat No. Cast some votes in the panel and
            watch the tally climb toward the quorum line, then hit{" "}
            <strong>Process</strong> to execute it.
          </p>
          <p>
            Unlike older frameworks, DAO Ships processes proposals{" "}
            <strong>in parallel</strong> — there&apos;s no queue, so one slow decision never
            blocks the rest.
          </p>
          <p>
            <Link href="/docs/concepts/proposal-lifecycle">Read more: The proposal lifecycle →</Link>{" "}
            ·{" "}
            <Link href="/docs/concepts/quorum-grace-retention">Quorum, grace &amp; retention →</Link>
          </p>
        </Chapter>

        {/* Chapter 3 — Treasury & exit */}
        <Chapter
          id="treasury"
          num={3}
          total={3}
          eyebrow="Treasury & exit"
          title="The treasury is a multisig — and you can always leave."
          visual={<TreasuryVisual />}
        >
          <p>
            When a proposal passes, the money moves on its own. The crew&apos;s funds live in
            a <strong>Quai Vault</strong> — a hardened M-of-N multisig. Governance{" "}
            <em>proposes</em>; the vault <em>holds and executes</em>; its owners keep an
            emergency brake.
          </p>
          <p>
            And if you don&apos;t like where the ship is heading, you can{" "}
            <strong>ragequit</strong>: burn your tokens and leave with your fair share of the
            treasury. A <strong>retention floor</strong> stops anyone from draining the DAO —
            try ragequitting until the panel blocks you.
          </p>
          <p>
            That exit right is what protects minorities: no vote can trap your capital
            somewhere you refuse to go.
          </p>
          <p>
            <Link href="/docs/concepts/quai-vault-treasury">Read more: The Quai Vault treasury →</Link>{" "}
            ·{" "}
            <Link href="/docs/concepts/ragequit">Ragequit &amp; exit rights →</Link>
          </p>
        </Chapter>
      </div>

      {/* Graduation */}
      <section className="section pb-10 pt-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-dao-dark-3 to-dao-dark-2 px-8 py-16 text-center shadow-indigo-glow-lg">
            <div className="absolute inset-0 grid-faint opacity-30" aria-hidden />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-dao-text sm:text-4xl">
                You just ran a DAO. Do it for real.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-dao-text-secondary">
                That&apos;s the whole loop — crew, proposals, treasury, exit. Launching your
                own on Quai testnet takes a few minutes and one transaction.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={site.launchUrl} className="btn-primary">
                  Launch a DAO
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link href="/use-cases" className="btn-secondary">
                  Pick a template
                </Link>
                <Link href="/docs/concepts/what-is-a-dao" className="btn-secondary">
                  <BookOpen className="h-4 w-4" />
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
