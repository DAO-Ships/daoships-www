import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight, ArrowRight, ArrowLeft, Check, Sliders, Plug, Lightbulb, Users,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { templates, getTemplate, templateKeys } from "@/lib/templates";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return templateKeys.map((template) => ({ template }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ template: string }>;
}): Promise<Metadata> {
  const { template } = await params;
  const t = getTemplate(template);
  if (!t) return { title: "Use case" };
  return {
    title: `${t.name} DAO template`,
    description: `${t.tagline} ${t.blurb}`,
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  const t = getTemplate(template);
  if (!t) notFound();

  const others = templates.filter((x) => x.key !== t.key);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-dao-border/60">
        <div className="absolute inset-0 grid-faint mask-fade-b opacity-50" aria-hidden />
        <div
          className="absolute left-1/2 top-[-40%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-[120px]"
          aria-hidden
        />
        <div className="section relative py-16 sm:py-20">
          <Reveal>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-dao-text-hint transition-colors hover:text-dao-text-secondary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All templates
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-dao-text sm:text-5xl">
                {t.name}
              </h1>
              <span className="rounded-full border border-dao-border px-3 py-1 font-mono text-xs text-dao-text-muted">
                <Users className="mr-1 inline h-3 w-3" />
                {t.range}
              </span>
              <span className="rounded-full border border-dao-border px-3 py-1 font-mono text-xs text-dao-text-muted">
                Treasury {t.treasury}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-lg font-medium text-primary-200">{t.tagline}</p>
            <p className="mt-2 max-w-2xl text-lg leading-relaxed text-dao-text-secondary">
              {t.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`${site.launchUrl}?template=${t.key}`} className="btn-primary">
                Launch a {t.name}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/docs/guides/governance-parameters" className="btn-secondary">
                How to tune these
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Best for */}
      <section className="section py-14">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-dao-text">Best for</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.bestFor.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 rounded-xl border border-dao-border/70 bg-dao-dark-3/60 px-4 py-3 text-sm text-dao-text-secondary"
              >
                <Check className="h-4 w-4 shrink-0 text-accent-400" />
                {b}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Recommended governance */}
      <section className="section py-6">
        <Reveal className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-primary-300" />
          <h2 className="font-display text-2xl font-semibold text-dao-text">
            Recommended governance
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-dao-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-dao-dark-2/80 font-mono text-xs uppercase tracking-wider text-dao-text-hint">
                  <th className="px-5 py-4 font-medium">Parameter</th>
                  <th className="px-5 py-4 font-medium text-primary-300">Value</th>
                  <th className="hidden px-5 py-4 font-medium sm:table-cell">Why</th>
                </tr>
              </thead>
              <tbody>
                {t.params.map((p, i) => (
                  <tr key={p.label} className={i % 2 ? "bg-dao-dark-2/30" : ""}>
                    <td className="px-5 py-4 font-medium text-dao-text">{p.label}</td>
                    <td className="px-5 py-4 font-mono text-primary-200">{p.value}</td>
                    <td className="hidden px-5 py-4 text-dao-text-muted sm:table-cell">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Navigators + decisions */}
      <section className="section py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-accent-300" />
                <h2 className="font-display text-xl font-semibold text-dao-text">
                  Suggested navigators
                </h2>
              </div>
              <ul className="mt-5 space-y-4">
                {t.navigators.map((n) => (
                  <li key={n.name}>
                    <p className="font-medium text-dao-text">{n.name}</p>
                    <p className="text-sm text-dao-text-muted">{n.note}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/docs/concepts/navigators"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-300 hover:text-primary-200"
              >
                What are navigators?
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="card h-full p-7">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent-300" />
                <h2 className="font-display text-xl font-semibold text-dao-text">
                  Key decisions
                </h2>
              </div>
              <ul className="mt-5 space-y-5">
                {t.decisions.map((d) => (
                  <li key={d.title} className="border-l-2 border-primary-500/40 pl-4">
                    <p className="font-medium text-dao-text">{d.title}</p>
                    <p className="mt-1 text-sm text-dao-text-secondary">{d.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other templates */}
      <section className="section py-6">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-dao-text">Other templates</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.key}
                href={`/use-cases/${o.key}`}
                className="card card-hover group p-5"
              >
                <p className="font-display font-semibold text-dao-text group-hover:text-primary-200">
                  {o.name}
                </p>
                <p className="mt-1 text-xs text-dao-text-muted">{o.range}</p>
                <p className="mt-3 text-sm text-dao-text-secondary">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section pb-10 pt-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-dao-dark-3 to-dao-dark-2 px-8 py-14 text-center shadow-indigo-glow-lg">
            <div className="absolute inset-0 grid-faint opacity-30" aria-hidden />
            <div className="relative">
              <h2 className="font-display text-3xl font-semibold text-dao-text">
                Set sail as a {t.name}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-dao-text-secondary">
                Launch with these defaults pre-filled — then customize anything before you deploy.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a href={`${site.launchUrl}?template=${t.key}`} className="btn-primary">
                  Launch a DAO
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link href="/learn" className="btn-secondary">
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
