import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Code2, HelpCircle, Navigation } from "lucide-react";
import { docsNav } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Concepts, step-by-step guides, and developer reference for building with DAO Ships on Quai Network.",
};

// One icon per section, in docsNav order: Concepts, Navigators, Guides, Developers, Reference.
const icons = [Compass, Navigation, BookOpen, Code2, HelpCircle];

export default function DocsHome() {
  return (
    <div className="not-prose">
      <span className="eyebrow">Documentation</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-dao-text">
        Learn, build, and sail.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-dao-text-secondary">
        Everything you need to understand DAO Ships and build on it. New here? Start
        with{" "}
        <Link
          href="/docs/concepts/what-is-a-dao"
          className="text-primary-300 hover:text-primary-200"
        >
          What is a DAO?
        </Link>
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {docsNav.map((section, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={section.title} className="card p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-500/40 bg-primary-500/10 text-primary-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-semibold text-dao-text">
                  {section.title}
                </h2>
              </div>
              <p className="mt-3 text-sm text-dao-text-muted">{section.summary}</p>
              <ul className="mt-5 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-dao-text-secondary transition-colors hover:bg-dao-surface/40 hover:text-dao-text"
                    >
                      <span>{link.title}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
