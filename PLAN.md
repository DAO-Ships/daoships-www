# DAO Ships — Marketing, Docs & Education Website Plan

> Working plan for `daoships-www`. Synthesized from deep review of `daoships-contracts`,
> `daoships-app`, `daoships-indexer`, and `QUAI-VAULT`. Last updated 2026-06-04.

---

## 0. What we're building & why

`daoships-www` is the **front door** to DAO Ships — the place that turns a curious visitor
into a DAO founder, member, or builder. The live dapp (`daoships-app`) is excellent at *doing*,
but assumes you already know what a DAO is, why Quai, and why DAO Ships specifically. This site
fills that gap and funnels people into the app.

It must serve **four audiences**, each with a distinct job-to-be-done:

| Audience | They arrive asking… | We send them to… |
|---|---|---|
| **The Curious** | "What even is a DAO?" | Interactive education → "Aha, I get it" |
| **The Founder** | "Can I launch my own org?" | Use-case match → `/launch` in the app |
| **The Member** | "Should I trust / join this?" | Security + treasury story → join a DAO |
| **The Builder** | "Can I build on this?" | Developer docs → contracts / indexer / navigators |

**One-line positioning:**
> **DAO Ships — Launch a DAO on Quai in one transaction. Governed by code, secured by a Quai Vault multisig, exit anytime.**

---

## 1. The DAO Ships story (the substance we have to sell)

Distilled from the research; this is the raw material every page draws on.

### The hook
- A **complete, audited, production-ready DAO framework + launchpad** for Quai Network.
- Inspired by **MolochDAO v3 / Baal**, but **rewritten from scratch** — *"not a fork with patches."*
- **One transaction** deploys: a governance ship (DAOShip) + voting token (Shares) + economic token (Loot) + a **Quai Vault multisig treasury** — atomically.
- **~300K gas to launch vs ~4M upstream (93% cheaper)** via EIP-1167 minimal-proxy clones.

### What makes it special (the "why us")
1. **Treasuries are Quai Vault multisigs.** Your money lives in an M-of-N multisig smart-contract wallet with timelocks, not a bare contract. Governance *proposes*; the vault *holds and executes*; owners keep an emergency brake.
2. **Enhanced security over upstream** (all documented, audited to *zero unresolved findings at any severity*):
   - `executeAsGovernance` can only call the DAO itself — not arbitrary external addresses (kills upstream's biggest privilege-escalation surface).
   - **Flash-loan-resistant** sponsorship (1-second prior-vote snapshot).
   - **Auto-expiring** proposals (no zombie Ready proposals forever).
   - **DelegateCall whitelist** on the vault (only MultiSendCallOnly) — defense against Bybit-class storage attacks.
3. **Parallel proposals** — no sequential queue; any Ready proposal processes independently. Higher throughput.
4. **Exit rights (Ragequit).** Don't like a decision? Burn your shares/loot during the grace period and walk away with your proportional slice of the treasury. Minority protection is built in.
5. **Navigators (not "shamans").** Immutable, permissioned plug-ins extend a DAO without touching core governance — instant onboarding via QUAI tribute, ERC-20 tribute, or NFT-gated claims.
6. **Five battle-tested templates** for different orgs (below).

### The nautical metaphor (brand spine)
- **DAOShip** = the governance vessel · **Crew** = members · **Navigators** = extension plug-ins ·
  **Treasury / the hold** = Quai Vault · **Ragequit** = abandon ship with your cargo · A deployment is a **ship**, many are a **fleet**.
- Logo asset already exists: a **ship's helm** (`dao_ships_helm_*.svg`). We lean into "take the helm / chart your course / set sail."

### The five DAO templates (use-case engine)
| Template | For | Signature settings |
|---|---|---|
| **Startup Team** (3–10) | founders, dev shops, hackathon teams | 1-day votes, 50% quorum, no spam fee, high trust |
| **Community DAO** (20–50) | service/media DAOs, guilds | 3-day votes, 20% quorum, tribute onboarding |
| **Protocol DAO** (50–200) | DeFi / infra governance | 5-day votes, 10% quorum, timelocks, vesting |
| **Investment DAO** (10–100) | venture / treasury / RWA funds | 7-day votes, paused (non-transferable) shares, 75% retention |
| **Agent DAO** (2–50 agents) | AI agent collectives, bot treasuries | 5-min votes, budget navigators, circuit breakers |

### Governance in plain English (the mechanics to teach)
Shares (vote) + Loot (economic, no vote) → **Submit → Sponsor → Vote → Grace (ragequit window) → Ready → Process**.
Quorum + retention checks gate execution. Delegation supported. Everything on-chain, indexed in real time.

### Developer surface
- **Contracts:** DAOShip, SharesERC20, LootERC20, DAOShipAndVaultLauncher, Poster (EIP-3722 metadata bus), 3 Navigators. Live on Cyprus-1 (chain 15000). Deterministic address prediction.
- **Indexer:** event-driven, Supabase/PostgREST + Realtime, ~13 `ds_*` tables (daos, members, proposals, votes, navigators, ragequits, …). No bespoke API — devs query Supabase directly or run their own.
- **Extensibility:** write a Navigator (immutable, `INavigator`, bounded mint cap/allowlist/expiry) to add custom onboarding or treasury logic.

---

## 2. Information architecture (sitemap)

```
/                     Landing — the pitch, for all four audiences
/why                  Why DAO Ships — vs Moloch/Baal/Zodiac, the security & efficiency story
/features             Product tour — governance, treasury, navigators, ragequit, indexer
/treasury             Deep-dive: "Your treasury is a Quai Vault multisig" (the differentiator)
/use-cases            The five templates, each its own scrollytelling sub-page
  /use-cases/startup  /community  /protocol  /investment  /agent
/security             Audits, the upstream hardening table, trust model, bug bounty
/learn                ★ Interactive Education App — "Take the Helm" (see §4)
/docs                 Documentation hub (see §5)
  /docs/concepts/*      DAO basics, shares vs loot, proposal lifecycle, ragequit, navigators
  /docs/guides/*        Connect wallet, launch a DAO, first proposal, vote, manage treasury
  /docs/developers/*    Contracts, addresses, ABIs, indexer schema, build a navigator
  /docs/faq
/blog                 Launch announcements, governance write-ups (optional phase 2)
→ Launch CTA          deep-links to daoships-app /launch (external, the app)
→ Explore CTA         deep-links to daoships-app /explore
```

Persistent top-nav: **Why · Features · Use Cases · Security · Learn · Docs · [Launch a DAO ▸]**
Persistent footer: ecosystem links (Quai, Quai Vault), GitHub, Discord/X, docs, audits.

---

## 3. Landing page — section by section

1. **Hero.** Helm logo + animated starfield/ocean horizon. Headline: *"Launch a DAO on Quai. In one transaction."* Sub: *"Open-source, audited governance with a Quai Vault multisig treasury — and the right to walk away."* Primary CTA **Launch a DAO ▸**, secondary **See how it works** (→ /learn). Live stat strip pulled from the indexer: *N ships launched · N crew · N proposals · X QUAI under governance.*
2. **The 60-second explainer.** Three-panel "How a DAO Ship works": **Crew & tokens → Proposals & votes → Treasury & exit.** Each links into /learn.
3. **Why DAO Ships** (3–4 cards): *One-transaction launch · Quai Vault multisig treasury · Enhanced security (audited) · Exit anytime (ragequit).*
4. **Treasury differentiator band.** Animated diagram: Governance → `execTransactionFromModule` → Quai Vault → assets. "Governance proposes. The multisig holds. You keep the brake."
5. **Use-case selector.** Interactive picker — "What are you building?" → 5 template cards → each routes to its sub-page and pre-fills intent toward `/launch`.
6. **Security strip.** "Audited to zero unresolved findings." Upstream-hardening highlights, link to /security.
7. **For builders.** Code snippet (launch a DAO in TS), navigator concept, link to /docs/developers.
8. **Final CTA.** "Ready to take the helm?" Launch / Explore / Read the docs.

---

## 4. ★ Interactive Education App — `/learn` ("Take the Helm")

The centerpiece and the most ambitious piece. A **client-side, no-wallet, simulated DAO sandbox** that
teaches DAO concepts *by letting people run a DAO* — mirroring the real app's flows 1:1 so the lesson
transfers directly to `daoships-app`. All state is in-browser (Zustand), deterministic, resettable. No chain, no risk.

**Structure — a guided "voyage" in chapters, each interactive:**

1. **Commission your ship.** A miniaturized launch wizard (name, crew + share/loot allocation, pick a template that pre-fills governance params). Teaches: shares vs loot, quorum, voting/grace periods — with inline "why this matters."
2. **Recruit your crew.** Add members via a simulated Onboarder navigator (QUAI tribute → shares). Teaches: navigators, onboarding, allowlists/caps.
3. **Chart a course (propose).** Submit a funding proposal from the simulated treasury. Teaches: proposal types, the offering/anti-spam deposit, MultiSend actions in plain English.
4. **Call the vote.** Sponsor → vote yes/no as different crew members → watch tallies, quorum bar, and the state machine advance in real time. Teaches: sponsorship threshold, delegation, quorum, majority.
5. **The grace window & abandon ship.** Trigger a ragequit on a controversial proposal; watch retention checks and proportional payout. Teaches: minority protection, ragequit math, retention %.
6. **Execute & inspect the treasury.** Process the Ready proposal; see the Quai Vault execute and balances change. Teaches: module execution, the vault's role, the multisig brake.
7. **Graduation.** "You just ran a DAO. Do it for real." → deep-link to `/launch` with a matching template, plus links to relevant docs.

**Design principles for /learn:**
- Mirror the app's actual components, vocabulary, and visual system so muscle memory transfers.
- Each chapter = *do the thing*, then a "What just happened / Why it's safe" debrief panel.
- A persistent **DAO state HUD** (treasury, shares, loot, active proposals) updates live — make the invisible mechanics visible.
- Progress saved to localStorage; shareable "I ran a DAO" completion card.
- Tooltips link every term to its `/docs/concepts/*` page (education ↔ docs are cross-woven).

**Phasing:** ship chapters 1, 3, 4 first (commission → propose → vote — the core loop), then add 2, 5, 6.

---

## 5. Documentation

A real docs system (MDX), not marketing prose. Three tracks off `/docs`:

- **Concepts** (the Curious & Members): What is a DAO? · Shares vs Loot · The proposal lifecycle ·
  Quorum, grace & retention · Ragequit & exit rights · Navigators · What a Quai Vault treasury is.
- **Guides** (Founders & Members, task-oriented, screenshot-driven): Install Pelagus & get testnet QUAI ·
  Connect your wallet · Launch a DAO (the 7-step wizard, annotated) · Write your first proposal ·
  Vote & delegate · Manage the treasury · Ragequit safely · Choosing governance parameters (the basis-points gotcha!).
- **Developers**: Architecture overview · Contract reference & live addresses (Cyprus-1) · Launch a DAO from TypeScript ·
  Indexer schema & querying Supabase · Build a Navigator (the `INavigator` contract, caps/allowlist/expiry) ·
  Security model & deployment checklist.

Reuse content we already have: `DAO-CONFIGURATIONS.md`, `DAOSHIPS_VS_ZODIAC_BAAL.md`, `SECURITY_GUIDE.md`,
`FRONTEND_GUIDE.md`, and the indexer docs are 80% of the source text — adapt, don't rewrite.

---

## 6. Design system

**Recommendation: inherit the dapp's design system**, not the Quai-red ecosystem look — the marketing
site should feel like the *same product* as the app it funnels into.

- **Palette (from `daoships-app`):** deep midnight backgrounds `#0a0a12 / #0f0f1a / #161625`, surfaces `#252540`,
  borders `#2e2e4a`; **indigo primary `#6366f1`** (CTAs), **cyan accent `#06b6d4`** (highlights/glow); text `#f3f4f6`.
  Signature glow shadows (`0 0 20px rgba(99,102,241,.3)`). Light mode supported, dark default.
- **Type:** **Space Grotesk** (display/headlines), **Inter** (body/UI), **JetBrains Mono** (code/addresses).
- **Brand:** the **ship's-helm** mark + nautical voice (chart your course, take the helm, set sail, the fleet).
  Subtle ocean-horizon / starfield / compass motifs; restrained, premium, not skeuomorphic.
- **Motion:** fade/slide-in, glow-pulse on accents, gentle card lift — match the app's existing animation tokens.
- A small amount of **3D/canvas** (à la quaivault-www's hero) for the landing hero and the treasury diagram — optional, perf-budgeted.

We can lift the app's `tailwind.config.js` tokens and `index.css` custom properties almost verbatim for instant consistency.

---

## 7. Tech stack

**Recommendation: Next.js 15 (App Router) + Tailwind + MDX, deployed on Vercel.**

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 App Router** | Matches 3/4 ecosystem sites; SSG/SEO critical for a marketing+docs site; great MDX story |
| Styling | **Tailwind 3.4** + app's design tokens | Direct reuse of the dapp's system |
| Docs | **MDX** (Fumadocs or Nextra) | Versioned, searchable, code-highlighted docs without a separate platform |
| Interactive /learn | **React + Zustand** (client sim) | Mirrors the app's own state approach; zero backend |
| Live stats | **Supabase** (read-only, the existing indexer) | Real "ships launched / QUAI governed" numbers on the landing page |
| Animation | **Framer Motion** + optional **R3F/Three.js** hero | Ecosystem-standard; 3D only where it earns its weight |
| Deploy | **Vercel** (+ strict CSP headers like siblings) | Universal in this ecosystem |

Trade-off noted: the dapp itself is Vite/React. Next.js is the better call *for this site* (SEO + docs + SSG)
while still sharing the design tokens and component idioms. If maximal code-sharing with the app matters more
than SEO, Vite + React-Router is the alternative.

---

## 8. Build roadmap

- **Phase 0 — Foundation:** scaffold Next.js, port design tokens from the app, nav/footer, brand kit, deploy skeleton to Vercel.
- **Phase 1 — Landing + Why + Security:** the core pitch pages with live indexer stats and the treasury differentiator. *(Highest marketing ROI.)*
- **Phase 2 — Docs:** MDX system + Concepts/Guides/Developers, adapted from existing markdown.
- **Phase 3 — /learn core loop:** chapters 1, 3, 4 (commission → propose → vote).
- **Phase 4 — Use-case sub-pages + /learn full voyage** (chapters 2, 5, 6, 7) + graduation deep-links.
- **Phase 5 — Polish:** 3D hero, blog, SEO/OG, analytics, perf budget, a11y pass.

---

## 9. Decisions (locked 2026-06-05)

1. **Tech stack** — ✅ **Next.js 15 (App Router) + MDX**, Tailwind, Vercel.
2. **Design direction** — ✅ **Hybrid**: lead with the dapp's indigo/cyan **ship's-helm** system; use **Quai-red (`#e20101`) accents** + ecosystem footer to signal membership in the Quai family. Continuity into the app comes first.
3. **/learn ambition** — ✅ **Lightweight animated explainers** (scrollytelling + animated diagrams), not a full simulated sandbox. Lower build cost; revisit the full "Take the Helm" sandbox as a later upgrade.
4. **Deliverable** — ✅ Building **Phase 0 + Phase 1** now (scaffold + tokens + nav/footer + landing/Why/Security with live indexer stats).

> Note: §4's full 7-chapter sandbox is deferred. For now `/learn` = animated, scroll-driven
> explainers of the same concepts (crew & tokens → proposals & votes → treasury & exit), each
> cross-linked to `/docs/concepts/*`. Keep the chapter structure as the content outline.
