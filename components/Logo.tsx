import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

export function Logo({
  withWordmark = true,
  size = 36,
  className,
}: {
  withWordmark?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={clsx("group inline-flex items-center gap-2.5", className)}
      aria-label="DAO Ships home"
    >
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-500/25 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
        <Image
          src="/logos/dao_ships_helm_dark_transparent.svg"
          alt=""
          width={size}
          height={size}
          className="relative transition-transform duration-700 ease-out group-hover:rotate-[24deg]"
          priority
        />
      </span>
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-dao-text">
          DAO&nbsp;Ships
        </span>
      )}
    </Link>
  );
}
