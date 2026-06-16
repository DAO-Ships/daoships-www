// Single source of truth for the five DAO templates.
// Parameters and rationale adapted from daoships-contracts/DAO-CONFIGURATIONS.md.

export type Param = { label: string; value: string; note: string };
export type Template = {
  key: string;
  name: string;
  range: string;
  treasury: string;
  tagline: string;
  blurb: string;
  highlights: string[]; // short chips for the selector
  bestFor: string[];
  params: Param[];
  navigators: { name: string; note: string }[];
  decisions: { title: string; body: string }[];
};

export const templates: Template[] = [
  {
    key: "startup",
    name: "Startup Team",
    range: "3–10 members",
    treasury: "Under $100K",
    tagline: "High trust, fast decisions, lean governance.",
    blurb:
      "A founding team, dev shop, or hackathon crew that knows each other and needs to move quickly without governance overhead.",
    highlights: ["1-day votes", "50% quorum", "No spam fee", "Onboarder allowlist"],
    bestFor: ["Founding teams & co-ops", "Dev shops and agencies", "Hackathon & grant teams", "Small investment clubs"],
    params: [
      { label: "Voting period", value: "1 day", note: "Small group coordinates fast." },
      { label: "Grace period", value: "1 day", note: "Room to ragequit without slowing ops." },
      { label: "Quorum", value: "50%", note: "A real majority of a small crew should show up." },
      { label: "Sponsor threshold", value: "1 share", note: "Any member can sponsor a proposal." },
      { label: "Min. retention", value: "66%", note: "Standard ragequit-veto protection." },
      { label: "Proposal offering", value: "0 QUAI", note: "No spam risk inside a trusted group." },
    ],
    navigators: [
      { name: "Onboarder (multiplier + allowlist)", note: "Gate new members; mint shares for QUAI tribute." },
    ],
    decisions: [
      { title: "Run everything through governance", body: "With so few members, there's no need for extra navigators — proposals cover all operations." },
      { title: "Keep shares transferable", body: "Trust is high; liquidity matters more than locking governance down." },
    ],
  },
  {
    key: "community",
    name: "Community DAO",
    range: "20–50 members",
    treasury: "$100K – $1M",
    tagline: "A mix of active contributors and passive holders.",
    blurb:
      "A service DAO, media collective, or guild where a core of contributors drives work and a wider membership votes on direction.",
    highlights: ["3-day votes", "20% quorum", "Tribute onboarding", "Small spam fee"],
    bestFor: ["Service & media DAOs", "Protocol guilds", "Community treasuries", "Creator collectives"],
    params: [
      { label: "Voting period", value: "3 days", note: "Enough time for a dispersed membership." },
      { label: "Grace period", value: "2 days", note: "Clear ragequit window before execution." },
      { label: "Quorum", value: "20%", note: "Realistic for a group with passive holders." },
      { label: "Sponsor threshold", value: "10 shares", note: "Filters low-effort proposals." },
      { label: "Min. retention", value: "66%", note: "Standard protection." },
      { label: "Proposal offering", value: "0.01 QUAI", note: "A small anti-spam deposit." },
    ],
    navigators: [
      { name: "Onboarder", note: "Native QUAI tribute onboarding." },
      { name: "ERC-20 Tribute", note: "Accept a stablecoin or project token for membership." },
    ],
    decisions: [
      { title: "Add a small offering", body: "A tiny deposit deters spam once membership is open and larger." },
      { title: "Plan for a budget navigator", body: "As contributor payroll recurs, a budget navigator reduces proposal overhead." },
    ],
  },
  {
    key: "protocol",
    name: "Protocol DAO",
    range: "50–200 members",
    treasury: "$1M – $10M",
    tagline: "Consequential decisions that demand timelocks.",
    blurb:
      "Governance for a DeFi protocol, NFT platform, or piece of infrastructure, where votes move real value and need guardrails.",
    highlights: ["5-day votes", "10% quorum", "Timelock navigator", "Vesting"],
    bestFor: ["DeFi protocols", "NFT & gaming platforms", "Infrastructure & ecosystem funds", "Standards bodies"],
    params: [
      { label: "Voting period", value: "5 days", note: "Time for large, dispersed governance to weigh in." },
      { label: "Grace period", value: "5 days", note: "Generous exit window for high-stakes changes." },
      { label: "Quorum", value: "10%", note: "Achievable at scale while still meaningful." },
      { label: "Sponsor threshold", value: "100 shares", note: "Proposals come from committed holders." },
      { label: "Min. retention", value: "50%", note: "Balances exit rights with treasury stability." },
      { label: "Proposal offering", value: "0.1 QUAI", note: "Deters spam at scale." },
    ],
    navigators: [
      { name: "Onboarder (fixed-price rounds)", note: "Predictable membership pricing." },
      { name: "ERC-20 Tribute", note: "Token-based onboarding." },
      { name: "Timelock (recommended)", note: "Delay parameter changes for safety." },
      { name: "Vesting (recommended)", note: "Cliff + linear vesting for core contributors." },
    ],
    decisions: [
      { title: "Add a timelock", body: "A delay on governance-config changes gives the community time to react to contested votes." },
      { title: "Set an expiry window", body: "Ready proposals auto-expire so passed-but-stale actions can't be executed much later." },
    ],
  },
  {
    key: "investment",
    name: "Investment DAO",
    range: "10–100 members",
    treasury: "$500K – $50M",
    tagline: "Security is paramount.",
    blurb:
      "An investment club, venture DAO, or real-world-asset fund where capital is large and governance-by-acquisition must be prevented.",
    highlights: ["7-day votes", "Paused (non-transferable) shares", "75% retention", "Timelock"],
    bestFor: ["Venture & investment clubs", "Treasury management funds", "Real-world-asset funds", "Endowments"],
    params: [
      { label: "Voting period", value: "7 days", note: "Deliberate pace for high-value decisions." },
      { label: "Grace period", value: "7 days", note: "Long, clear exit window." },
      { label: "Quorum", value: "30%", note: "High participation for consequential capital moves." },
      { label: "Sponsor threshold", value: "1,000 shares", note: "Only serious stakeholders propose." },
      { label: "Min. retention", value: "75%", note: "Strong protection against draining the fund." },
      { label: "Proposal offering", value: "1 QUAI", note: "Meaningful anti-spam deposit." },
    ],
    navigators: [
      { name: "Timelock (non-negotiable)", note: "Mandatory delay on governance-config changes." },
      { name: "Subscription", note: "Charge a recurring management fee; lapsed members are collected automatically." },
      { name: "Vesting (recommended)", note: "Cliff + linear schedules for the fund's core team." },
    ],
    decisions: [
      { title: "Pause the shares", body: "Non-transferable shares prevent someone from buying control of the fund on a secondary market." },
      { title: "Treat the timelock as required", body: "For a fund this size, a delay on treasury and config changes is not optional." },
    ],
  },
  {
    key: "agent",
    name: "Agent DAO",
    range: "2–50 agents",
    treasury: "$10K – $1M",
    tagline: "Fast, programmatic decisions inside guardrails.",
    blurb:
      "An AI-agent collective or bot-managed treasury that needs to decide in seconds — with humans and circuit breakers setting the bounds.",
    highlights: ["5-minute votes", "Budget navigators", "Human brake", "Allowlisted agents"],
    bestFor: ["AI agent collectives", "Automated market-making", "Bot-managed treasuries", "Autonomous services"],
    params: [
      { label: "Voting period", value: "5 minutes", note: "Agents act at machine speed." },
      { label: "Grace period", value: "1 minute", note: "Just enough to flag an anomaly." },
      { label: "Quorum", value: "50%", note: "A majority of agents must agree." },
      { label: "Sponsor threshold", value: "1 share", note: "Any agent can propose." },
      { label: "Min. retention", value: "0%", note: "No ragequit veto — speed over exit rights here." },
      { label: "Proposal offering", value: "0 QUAI", note: "No spam concern among allowlisted agents." },
    ],
    navigators: [
      { name: "Onboarder (allowlist only)", note: "Only approved agents can join." },
      { name: "Budget (recommended)", note: "Agents spend within pre-approved budgets — no proposal needed." },
      { name: "Circuit Breaker (planned)", note: "On the roadmap — auto-pause tokens on anomalies. Until it ships, keep vault owners human as the manual brake." },
    ],
    decisions: [
      { title: "Keep humans on the brake", body: "Vault owners remain human (or a human multisig) so the collective can be halted instantly." },
      { title: "Bound every agent", body: "Budgets and circuit breakers matter more than vote timing when actors are automated." },
    ],
  },
];

export const templateKeys = templates.map((t) => t.key);

export function getTemplate(key: string): Template | undefined {
  return templates.find((t) => t.key === key);
}
