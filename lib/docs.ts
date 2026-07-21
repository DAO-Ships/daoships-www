// Docs navigation tree. Drives the sidebar, breadcrumbs, and prev/next pager.
// Keep order intentional — it defines the reading sequence.

export type DocLink = { title: string; href: string };
export type DocSection = { title: string; summary: string; links: DocLink[] };

export const docsNav: DocSection[] = [
  {
    title: "Concepts",
    summary: "Understand how DAOs work on DAO Ships.",
    links: [
      { title: "What is a DAO?", href: "/docs/concepts/what-is-a-dao" },
      { title: "Shares vs. Loot", href: "/docs/concepts/shares-vs-loot" },
      { title: "The proposal lifecycle", href: "/docs/concepts/proposal-lifecycle" },
      { title: "Quorum, grace & retention", href: "/docs/concepts/quorum-grace-retention" },
      { title: "Ragequit & exit rights", href: "/docs/concepts/ragequit" },
      { title: "Navigators", href: "/docs/concepts/navigators" },
      { title: "The Quai Vault treasury", href: "/docs/concepts/quai-vault-treasury" },
    ],
  },
  {
    title: "Navigators",
    summary: "The full navigator catalog and per-navigator reference.",
    links: [
      { title: "Overview & catalog", href: "/docs/navigators/overview" },
      { title: "Onboarder", href: "/docs/navigators/onboarder" },
      { title: "ERC-20 Tribute", href: "/docs/navigators/erc20-tribute" },
      { title: "NFT-Gate", href: "/docs/navigators/nft-gate" },
      { title: "Signal (polls)", href: "/docs/navigators/signal" },
      { title: "Timelock", href: "/docs/navigators/timelock" },
      { title: "Vesting", href: "/docs/navigators/vesting" },
      { title: "Budget", href: "/docs/navigators/budget" },
      { title: "Subscription", href: "/docs/navigators/subscription" },
    ],
  },
  {
    title: "Guides",
    summary: "Step-by-step, task-oriented walkthroughs.",
    links: [
      { title: "Launch a DAO", href: "/docs/guides/launch-a-dao" },
      { title: "Configure governance", href: "/docs/guides/governance-parameters" },
      { title: "Use navigators", href: "/docs/guides/use-navigators" },
      { title: "Make a proposal", href: "/docs/guides/first-proposal" },
      { title: "Manage members & shares", href: "/docs/guides/manage-members" },
      { title: "Vote & delegate", href: "/docs/guides/vote-and-delegate" },
    ],
  },
  {
    title: "Developers",
    summary: "Build on and integrate with DAO Ships.",
    links: [
      { title: "Architecture overview", href: "/docs/developers/architecture" },
      { title: "Contracts & addresses", href: "/docs/developers/contracts" },
      { title: "Launch from TypeScript", href: "/docs/developers/launch-from-typescript" },
      { title: "Indexer & data layer", href: "/docs/developers/indexer" },
      { title: "Frontend integration", href: "/docs/developers/frontend-integration" },
      { title: "Build a Navigator", href: "/docs/developers/build-a-navigator" },
    ],
  },
  {
    title: "Reference",
    summary: "Quick answers and lookups.",
    links: [{ title: "FAQ", href: "/docs/faq" }],
  },
];

// Flattened, ordered list for prev/next paging.
export const flatDocs: DocLink[] = docsNav.flatMap((s) => s.links);

export function getPager(pathname: string) {
  const i = flatDocs.findIndex((d) => d.href === pathname);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? flatDocs[i - 1] : null,
    next: i < flatDocs.length - 1 ? flatDocs[i + 1] : null,
  };
}

// ── Search ──────────────────────────────────────────────────────────
// Synonyms / extra terms per page to improve matching beyond the title.
const KEYWORDS: Record<string, string> = {
  "/docs/concepts/what-is-a-dao": "intro basics governance decentralized organization treasury",
  "/docs/concepts/shares-vs-loot": "tokens voting power economic delegation mint membership",
  "/docs/concepts/proposal-lifecycle": "submit sponsor vote grace ready processed defeated expired states types parallel",
  "/docs/concepts/quorum-grace-retention": "basis points threshold voting period minimum participation veto parameters",
  "/docs/concepts/ragequit": "exit leave burn withdraw fair share minority protection guild tokens",
  "/docs/concepts/navigators": "shamans extensions plugins onboarder tribute nft permissions admin manager governor",
  "/docs/concepts/quai-vault-treasury": "multisig vault avatar module timelock owners delegatecall emergency brake funds",
  "/docs/navigators/overview": "catalog list permissions bitmask admin manager governor trust sanctioned self-asserted module read-only shipped planned",
  "/docs/navigators/onboarder": "onboard native quai tribute mint shares loot multiplier fixed price allowlist cap join membership",
  "/docs/navigators/erc20-tribute": "erc20 token tribute stablecoin usdc permit fee on transfer onboard mint membership join",
  "/docs/navigators/nft-gate": "nft erc721 gate claim ticket token id holder collection free tribute membership canonboard",
  "/docs/navigators/signal": "signal poll vote temperature check non binding read only snapshot weighted sanction labels options",
  "/docs/navigators/timelock": "timelock delay governance config queue execute bypass advisory second ragequit window governor",
  "/docs/navigators/vesting": "vesting cliff linear schedule claim revoke escrow contributor mint shares loot beneficiary",
  "/docs/navigators/budget": "budget treasury disburse payroll allowance period ceiling manager module enablemodule vault recurring spend",
  "/docs/navigators/subscription": "subscription dues recurring fee membership pay grace delinquent keeper collect burn convert loot",
  "/docs/guides/launch-a-dao": "create summon wizard deploy steps shares loot vault new connect wallet",
  "/docs/guides/governance-parameters": "configure templates quorum voting period retention basis points tuning settings",
  "/docs/guides/use-navigators": "onboarder tribute erc20 nft gated onboarding mint allowlist cap plugin extension",
  "/docs/guides/first-proposal": "funding submit sponsor offering action create propose",
  "/docs/guides/manage-members": "shares loot mint burn membership add member convert ragequit guild tokens",
  "/docs/guides/vote-and-delegate": "voting yes no tally quorum reason delegation power delegate",
  "/docs/developers/architecture": "contracts overview zodiac avatar clones module system diagram",
  "/docs/developers/contracts": "addresses abi deployment cyprus chain 9 15000 mainnet testnet orchard rpc explorer quaiscan reference singleton launcher poster",
  "/docs/developers/launch-from-typescript": "sdk quais code initparams create2 salt launchdaoshipandvault programmatic",
  "/docs/developers/indexer": "supabase postgrest realtime ds tables query data api events graphql trust status sanctioned schema columns navigator",
  "/docs/developers/frontend-integration": "frontend security xss sanitize dompurify bigint numeric address lowercase trust level badge realtime reorg reindex url validation rendering",
  "/docs/developers/build-a-navigator": "inavigator extension solidity permissions mint cap allowlist immutable",
  "/docs/faq": "questions answers help common audited mainnet testnet networks cost",
};

export type SearchResult = DocLink & { section: string };

export function searchDocs(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  const flat: SearchResult[] = docsNav.flatMap((s) =>
    s.links.map((l) => ({ ...l, section: s.title }))
  );
  if (!q) return flat;
  const terms = q.split(/\s+/);
  return flat
    .map((r) => {
      const hay = `${r.title} ${r.section} ${KEYWORDS[r.href] ?? ""}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (r.title.toLowerCase().includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
      }
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}

export function getBreadcrumb(pathname: string) {
  for (const section of docsNav) {
    const link = section.links.find((l) => l.href === pathname);
    if (link) return { section: section.title, title: link.title };
  }
  return null;
}
