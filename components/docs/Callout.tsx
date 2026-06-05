import { Info, Lightbulb, AlertTriangle, ShieldAlert } from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type Variant = "info" | "tip" | "warning" | "danger";

const styles: Record<Variant, { icon: typeof Info; ring: string; text: string }> = {
  info: { icon: Info, ring: "border-primary-500/40 bg-primary-500/5", text: "text-primary-300" },
  tip: { icon: Lightbulb, ring: "border-accent-500/40 bg-accent-500/5", text: "text-accent-300" },
  warning: { icon: AlertTriangle, ring: "border-amber-500/40 bg-amber-500/5", text: "text-amber-300" },
  danger: { icon: ShieldAlert, ring: "border-quai/40 bg-quai/5", text: "text-quai" },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={clsx("my-6 flex gap-3 rounded-xl border p-4", s.ring)}>
      <Icon className={clsx("mt-0.5 h-5 w-5 shrink-0", s.text)} />
      <div className="min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {title && (
          <p className={clsx("mb-1 font-display text-sm font-semibold", s.text)}>{title}</p>
        )}
        <div className="text-sm text-dao-text-secondary [&>p]:my-2">{children}</div>
      </div>
    </div>
  );
}
