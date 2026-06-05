import { Vote, ArrowRight, Vault, Coins, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const nodes = [
  {
    icon: Vote,
    label: "Governance",
    sub: "Proposals & votes",
    tone: "primary",
  },
  {
    icon: Vault,
    label: "Quai Vault",
    sub: "M-of-N multisig",
    tone: "accent",
  },
  {
    icon: Coins,
    label: "Treasury assets",
    sub: "QUAI + ERC-20s",
    tone: "quai",
  },
];

const toneRing: Record<string, string> = {
  primary: "border-primary-500/50 text-primary-300 bg-primary-500/10",
  accent: "border-accent-500/50 text-accent-300 bg-accent-500/10",
  quai: "border-quai/50 text-quai bg-quai/10",
};

export function TreasuryBand() {
  return (
    <section className="relative overflow-hidden border-y border-dao-border/60 bg-dao-dark-2/40 py-20">
      <div className="absolute inset-0 grid-faint opacity-40" aria-hidden />
      <div className="section relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">The differentiator</span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-dao-text sm:text-4xl">
            Your treasury is a{" "}
            <span className="text-gradient-quai">Quai Vault multisig</span>.
          </h2>
          <p className="mt-4 text-lg text-dao-text-secondary">
            Most DAO frameworks park funds in a bare governance contract. DAO Ships
            settles them in a hardened multisig wallet — timelocked, owner-guarded,
            and protected from delegate-call attacks.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
            {nodes.map((n, i) => (
              <div key={n.label} className="flex flex-col items-center gap-4 md:flex-row">
                <div className="card flex w-full items-center gap-4 p-5 md:w-56">
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${toneRing[n.tone]}`}
                  >
                    <n.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display font-semibold text-dao-text">
                      {n.label}
                    </span>
                    <span className="block font-mono text-xs text-dao-text-muted">
                      {n.sub}
                    </span>
                  </span>
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight className="h-5 w-5 rotate-90 text-dao-text-hint md:rotate-0" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-display text-lg text-dao-text">
            Governance <span className="text-dao-text-muted">proposes.</span> The multisig{" "}
            <span className="text-dao-text-muted">holds.</span>{" "}
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-accent-400" />
              Owners keep the brake.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
