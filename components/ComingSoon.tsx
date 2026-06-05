import Link from "next/link";
import { ArrowUpRight, Hammer } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function ComingSoon({
  eyebrow,
  title,
  intro,
  outline,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  outline: { heading: string; items: string[] }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <section className="section py-16">
        <Reveal>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-dao-border bg-dao-dark-2/60 px-4 py-2 font-mono text-xs text-dao-text-muted">
            <Hammer className="h-3.5 w-3.5 text-primary-300" />
            In progress — here’s what’s landing on this page
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {outline.map((o, i) => (
            <Reveal key={o.heading} delay={i * 0.06}>
              <div className="card h-full p-7">
                <h3 className="font-display text-lg font-semibold text-dao-text">
                  {o.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {o.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-sm text-dao-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={site.launchUrl} className="btn-primary">
              Launch a DAO now
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href="/why" className="btn-secondary">
              Why DAO Ships
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
