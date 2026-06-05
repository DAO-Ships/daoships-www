import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Why DAO Ships", href: "/why" },
      { label: "Features", href: "/features" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Interactive guide", href: "/learn" },
      { label: "Concepts", href: "/docs/concepts/what-is-a-dao" },
      { label: "Guides", href: "/docs/guides/launch-a-dao" },
      { label: "FAQ", href: "/docs/faq" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Developer docs", href: "/docs/developers/architecture" },
      { label: "Contracts", href: "/docs/developers/contracts" },
      { label: "Indexer", href: "/docs/developers/indexer" },
      { label: "GitHub", href: site.github, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-dao-border/60 bg-dao-dark-2/50">
      {/* Quai-red ecosystem hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-quai/60 to-transparent" />
      <div className="section grid grid-cols-2 gap-8 py-14 md:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-dao-text-muted">
            DAO governance built for Quai Network. Launch, govern, and exit —
            transparent on-chain, secured by a Quai Vault multisig.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={site.github}
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-dao-border text-dao-text-muted transition-colors hover:text-dao-text"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={site.discord}
              aria-label="Discord"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-dao-border text-dao-text-muted transition-colors hover:text-dao-text"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-dao-text-hint">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-dao-text-secondary transition-colors hover:text-primary-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-dao-text-secondary transition-colors hover:text-primary-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section flex flex-col items-center justify-between gap-3 border-t border-dao-border/60 py-6 text-xs text-dao-text-hint md:flex-row">
        <p>© {new Date().getFullYear()} DAO Ships. Open-source.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-quai" />
          Part of the{" "}
          <a href={site.quai} className="text-dao-text-secondary hover:text-quai">
            Quai Network
          </a>{" "}
          ecosystem · treasuries powered by{" "}
          <a href={site.quaiVault} className="text-dao-text-secondary hover:text-primary-300">
            Quai Vault
          </a>
        </p>
      </div>
    </footer>
  );
}
