import Image from "next/image";
import { Starfield } from "./Starfield";

// Decorative hero backdrop: faint grid, radial indigo glow, drifting particles,
// and a slowly rotating ship's-helm compass. Purely visual; hidden from a11y.
export function HelmBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-faint mask-fade-b opacity-70" />
      <Starfield className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute left-1/2 top-[-10%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
      <div className="absolute right-[10%] top-[30%] h-[320px] w-[320px] rounded-full bg-accent-500/10 blur-[100px]" />
      <div className="absolute left-[6%] bottom-[6%] h-[280px] w-[280px] rounded-full bg-quai/5 blur-[100px]" />

      <div className="absolute right-[-160px] top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative h-[560px] w-[560px] opacity-[0.16] mask-radial">
          <div className="absolute inset-0 animate-spin-slow">
            <Image
              src="/logos/dao_ships_helm_dark_transparent.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute inset-[18%] animate-spin-slower rounded-full border border-dashed border-primary-400/30" />
        </div>
      </div>
    </div>
  );
}
