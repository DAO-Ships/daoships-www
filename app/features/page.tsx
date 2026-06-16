import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight, ArrowRight, Vote, Vault, Plug, Radio, Check,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "A product tour of DAO Ships — governance, a Quai Vault multisig treasury, navigator extensions, and a real-time transparency layer.",
};

const proposalTypes = [
  "Funding", "Membership", "Guild tokens", "Governance config",
  "Navigators", "Profile update", "Announcement", "Custom action",
];

const navigatorNames = [
  "Onboarder", "ERC-20 Tribute", "NFT-Gate", "Signal",
  "Timelock", "Vesting", "Budget", "Subscription",
];

const pillars = [
  {
    icon: Vote,
    eyebrow: "Governance",
    title: "A complete on-chain governance engine",
    body:
      "Dual-token membership, a clear proposal lifecycle, delegation, and parallel processing — everything a DAO needs to make and execute decisions transparently.",
    points: [
      { h: "Shares + Loot", p: "Separate voting power from economic weight, so investors and contributors can hold value without controlling governance." },
      { h: "Full lifecycle", p: "Submitted → Voting → Grace → Ready → Processed, with quorum, grace, and retention checks at every step." },
      { h: "Parallel proposals", p: "No sequential queue — any Ready proposal processes independently, so one slow vote never blocks the rest." },
      { h: "Delegation", p: "Members lend voting power to trusted delegates without giving up their tokens." },
    ],
    docs: "/docs/concepts/proposal-lifecycle",
    extra: "types",
  },
  {
    icon: Vault,
    eyebrow: "Treasury",
    title: "A treasury that's a Quai Vault multisig",
    body:
      "Funds live in a hardened M-of-N multisig — not a bare contract. Governance proposes; the vault holds and executes; owners keep an emergency brake.",
    points: [
      { h: "Module execution", p: "Passed proposals run through execTransactionFromModule as batched, audited calls." },
      { h: "Owner emergency brake", p: "Vault owners can disable the governance module if something goes wrong." },
      { h: "Timelocks & DelegateCall whitelist", p: "Native delays and a strict whitelist defend against Bybit-class attacks." },
      { h: "Ragequit", p: "Members exit during the grace window with their proportional slice — protected by a retention floor." },
    ],
    docs: "/docs/concepts/quai-vault-treasury",
  },
  {
    icon: Plug,
    eyebrow: "Navigators",
    title: "Extend a DAO without forking it",
    body:
      "Navigators are immutable, governance-endorsed plug-ins that add onboarding, polling, and treasury automation. Eight ship today across three trust classes — each is bounded and revocable, and can't exceed the powers a DAO grants it.",
    points: [
      { h: "Onboard members", p: "Admit crew by native QUAI tribute, an ERC-20 token, or proof of NFT ownership — with allowlists, caps, and expiry." },
      { h: "Govern safely", p: "A Timelock adds a mandatory delay to config changes; Signal runs non-binding, share-weighted polls before a real vote." },
      { h: "Automate the treasury", p: "Budgets disburse on a recurring allowance, Subscriptions collect membership dues, and Vesting releases tokens on a cliff + linear schedule." },
      { h: "Bounded & immutable", p: "Every navigator is endorsed by governance — via a permission bitmask, a vault sanction, or a module enable — and can be paused or revoked." },
    ],
    docs: "/docs/navigators/overview",
    extra: "navigators",
  },
  {
    icon: Radio,
    eyebrow: "Transparency",
    title: "Everything visible, in real time",
    body:
      "An event-driven indexer and an on-chain metadata bus make every DAO legible — to members, to analysts, and to the apps built on top.",
    points: [
      { h: "Real-time indexer", p: "A Supabase-backed indexer streams DAOs, members, proposals, and votes with live subscriptions." },
      { h: "On-chain profiles", p: "DAO and member profiles are posted on-chain via Poster (EIP-3722)." },
      { h: "Vote reasoning", p: "Members record the rationale behind their votes, on-chain." },
      { h: "Decoded actions", p: "Proposals are shown in plain English — you see exactly what will execute." },
    ],
    docs: "/docs/developers/indexer",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product tour"
        title={
          <>
            Everything a DAO needs, <span className="text-gradient">in one ship.</span>
          </>
        }
        intro="Governance, treasury, extensions, and transparency — designed to work together so you can launch a real organization, not assemble one from parts."
      />

      {pillars.map((pillar, i) => (
        <section
          key={pillar.eyebrow}
          className={i % 2 === 1 ? "border-y border-dao-border/60 bg-dao-dark-2/40" : ""}
        >
          <div className="section py-16">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">
                <pillar.icon className="h-3.5 w-3.5" />
                {pillar.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
                {pillar.title}
              </h2>
              <p className="mt-4 text-lg text-dao-text-secondary">{pillar.body}</p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {pillar.points.map((pt, j) => (
                <Reveal key={pt.h} delay={j * 0.05}>
                  <div className="card h-full p-6">
                    <div className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                      <div>
                        <h3 className="font-display font-semibold text-dao-text">{pt.h}</h3>
                        <p className="mt-1 text-sm text-dao-text-secondary">{pt.p}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {pillar.extra === "types" && (
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-wider text-dao-text-hint">
                    Eight built-in proposal types
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {proposalTypes.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-dao-border bg-dao-dark-3/60 px-3 py-1.5 text-sm text-dao-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {pillar.extra === "navigators" && (
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-wider text-dao-text-hint">
                    Eight shipped navigators
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {navigatorNames.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-dao-border bg-dao-dark-3/60 px-3 py-1.5 text-sm text-dao-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <Link
                href={pillar.docs}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary-300 hover:text-primary-200"
              >
                Learn more in the docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      {/* No-code + code */}
      <section className="section py-16">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold text-dao-text">
                No code required
              </h3>
              <p className="mt-3 text-dao-text-secondary">
                Launch, propose, vote, and manage a treasury entirely through the app — a
                guided 7-step wizard gets you from idea to live DAO in minutes.
              </p>
              <a href={site.launchUrl} className="btn-primary mt-6">
                Launch a DAO
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="card p-7">
              <h3 className="font-display text-xl font-semibold text-dao-text">
                Built to build on
              </h3>
              <p className="mt-3 text-dao-text-secondary">
                Launch DAOs from TypeScript, query the indexed data layer, or ship your own
                navigator. The whole stack is open-source.
              </p>
              <Link href="/docs/developers/architecture" className="btn-secondary mt-6">
                Developer docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
