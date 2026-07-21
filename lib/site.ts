// Central site configuration & external links.
// App/docs URLs are env-overridable so deployment can point them at the real hosts.

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.daoships.org";

// Orchard testnet deployment of the app — still live for experimentation.
export const TESTNET_APP_URL =
  process.env.NEXT_PUBLIC_TESTNET_APP_URL ?? "https://testnet.daoships.org";

export const site = {
  name: "DAO Ships",
  tagline: "Launch a DAO on Quai. In one transaction.",
  description:
    "Open-source, audited DAO governance for Quai Network — with a Quai Vault multisig treasury and the right to walk away. Inspired by MolochDAO v3, rewritten from scratch.",
  url: "https://daoships.org",
  launchUrl: `${APP_URL}/launch`,
  exploreUrl: `${APP_URL}/explore`,
  appUrl: APP_URL,
  testnetAppUrl: TESTNET_APP_URL,
  // Org hosting the open-source repos (verified from git remotes).
  github: "https://github.com/DAO-Ships",
  quai: "https://qu.ai",
  quaiVault: "https://quaivault.org",
};

export const nav = [
  { label: "Why", href: "/why" },
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "Learn", href: "/learn" },
  { label: "Docs", href: "/docs" },
];
