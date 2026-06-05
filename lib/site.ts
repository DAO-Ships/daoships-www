// Central site configuration & external links.
// App/docs URLs are env-overridable so deployment can point them at the real hosts.

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.daoships.xyz";

export const site = {
  name: "DAO Ships",
  tagline: "Launch a DAO on Quai. In one transaction.",
  description:
    "Open-source, audited DAO governance for Quai Network — with a Quai Vault multisig treasury and the right to walk away. Inspired by MolochDAO v3, rewritten from scratch.",
  url: "https://daoships.xyz",
  launchUrl: `${APP_URL}/launch`,
  exploreUrl: `${APP_URL}/explore`,
  appUrl: APP_URL,
  github: "https://github.com/daoships",
  discord: "https://discord.gg/quai",
  x: "https://x.com/daoships",
  quai: "https://qu.ai",
  quaiVault: "https://quaivault.xyz",
};

export const nav = [
  { label: "Why", href: "/why" },
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "Learn", href: "/learn" },
  { label: "Docs", href: "/docs" },
];
