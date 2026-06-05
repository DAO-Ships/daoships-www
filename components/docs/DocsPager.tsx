"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { getPager, getBreadcrumb } from "@/lib/docs";

export function Breadcrumb() {
  const pathname = usePathname();
  const crumb = getBreadcrumb(pathname);
  if (!crumb) return null;
  return (
    <div className="mb-6 flex items-center gap-1.5 font-mono text-xs text-dao-text-hint">
      <Link href="/docs" className="hover:text-dao-text-secondary">
        Docs
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span>{crumb.section}</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-dao-text-secondary">{crumb.title}</span>
    </div>
  );
}

export function DocsPager() {
  const pathname = usePathname();
  const { prev, next } = getPager(pathname);
  if (!prev && !next) return null;
  return (
    <div className="mt-16 grid gap-4 border-t border-dao-border/60 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="card card-hover group flex flex-col p-5 text-left"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-dao-text-hint">
            <ArrowLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <span className="mt-1 font-display font-medium text-dao-text group-hover:text-primary-200">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="card card-hover group flex flex-col items-end p-5 text-right sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-dao-text-hint">
            Next <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 font-display font-medium text-dao-text group-hover:text-primary-200">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}
