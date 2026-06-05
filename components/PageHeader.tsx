import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-dao-border/60">
      <div className="absolute inset-0 grid-faint mask-fade-b opacity-50" aria-hidden />
      <div
        className="absolute left-1/2 top-[-40%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-[120px]"
        aria-hidden
      />
      <div className="section relative py-16 sm:py-20">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-dao-text sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dao-text-secondary">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
