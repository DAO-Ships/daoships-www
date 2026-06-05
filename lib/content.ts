// Marketing copy & structured content, sourced from the platform research
// (daoships-contracts, daoships-app, daoships-indexer, QUAI-VAULT).

export const whyCards = [
  {
    icon: "Rocket",
    title: "One-transaction launch",
    body:
      "Deploy a governance ship, voting + economic tokens, and a Quai Vault multisig treasury — atomically, in a single transaction.",
    stat: "~93% cheaper to launch than upstream (EIP-1167 clones).",
  },
  {
    icon: "Vault",
    title: "Treasury is a Quai Vault multisig",
    body:
      "Your funds live in an M-of-N multisig wallet with timelocks and DelegateCall hardening — not a bare contract. Governance proposes; the vault holds and executes.",
    stat: "Multi-owner, timelocked, audited.",
  },
  {
    icon: "ShieldCheck",
    title: "Enhanced security, audited",
    body:
      "Rewritten from scratch with documented hardening over MolochDAO v3 — scoped execution, flash-loan-resistant sponsorship, auto-expiring proposals.",
    stat: "Zero unresolved findings at any severity.",
  },
  {
    icon: "DoorOpen",
    title: "Exit anytime — ragequit",
    body:
      "Disagree with a decision? Burn your shares and loot during the grace window and leave with your proportional slice of the treasury. Minority protection, built in.",
    stat: "Proportional, on-chain, permissionless.",
  },
];

export const explainer = [
  {
    step: "01",
    title: "Crew & tokens",
    body:
      "Members hold Shares (voting power) and Loot (economic weight, no vote). Delegation lets crew lend their voice without giving up their stake.",
  },
  {
    step: "02",
    title: "Proposals & votes",
    body:
      "Submit → sponsor → vote → grace → ready → process. Quorum and retention checks gate execution. Proposals run in parallel — no queue, no bottleneck.",
  },
  {
    step: "03",
    title: "Treasury & exit",
    body:
      "Passed proposals execute through the Quai Vault multisig. Members can ragequit during the grace window for their fair share. Owners keep an emergency brake.",
  },
];

// DAO templates now live in lib/templates.ts (single source of truth).

export const securityPoints = [
  {
    title: "Scoped execution",
    body:
      "executeAsGovernance can only call the DAO itself — never an arbitrary external address. This closes upstream's single largest privilege-escalation surface.",
  },
  {
    title: "Flash-loan-resistant sponsorship",
    body:
      "Sponsorship power is snapshotted one second in the past, blocking borrow-delegate-sponsor attacks within a single block.",
  },
  {
    title: "Auto-expiring proposals",
    body:
      "Ready proposals expire after a grace + expiry window, so no passed-but-unexecuted proposal can lurk forever as a zombie.",
  },
  {
    title: "DelegateCall whitelist",
    body:
      "The Quai Vault only permits DelegateCall to MultiSendCallOnly, which rejects nested delegate calls — defense against Bybit-class storage-corruption attacks.",
  },
  {
    title: "Ragequit veto & retention",
    body:
      "If too much of the treasury exits during voting, a proposal is blocked. Minorities can't be diluted or rugged through governance.",
  },
  {
    title: "Immutable by design",
    body:
      "Tokens and governance are non-upgradeable EIP-1167 clones. No proxy admin, no upgrade key, no surprise rewrites.",
  },
];

// vs MolochDAO v3 / Baal / Zodiac
export const comparison: { feature: string; upstream: string; daoships: string }[] = [
  {
    feature: "Codebase",
    upstream: "Fork-and-patch lineage",
    daoships: "Rewritten from scratch (Solidity 0.8.22, OZ v5)",
  },
  {
    feature: "Treasury",
    upstream: "Gnosis Safe avatar",
    daoships: "Quai Vault multisig (purpose-built, hardened)",
  },
  {
    feature: "Governance execution",
    upstream: "Can call any external address",
    daoships: "Scoped to self-calls only",
  },
  {
    feature: "Proposal throughput",
    upstream: "Sequential queue (one at a time)",
    daoships: "Parallel — any Ready proposal processes independently",
  },
  {
    feature: "Sponsorship",
    upstream: "Current-block votes (flash-loanable)",
    daoships: "Prior-second snapshot (flash-loan resistant)",
  },
  {
    feature: "Ready proposals",
    upstream: "Processable forever (zombies)",
    daoships: "Auto-expire after grace + window",
  },
  {
    feature: "Deploy cost",
    upstream: "~4M gas",
    daoships: "~300K gas (EIP-1167 clones)",
  },
  {
    feature: "Extensions",
    upstream: "Shamans",
    daoships: "Navigators — instant QUAI / ERC-20 / NFT-gated onboarding",
  },
];
