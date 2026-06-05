"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { docsNav } from "@/lib/docs";
import { DocsSearch } from "./DocsSearch";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-7" aria-label="Documentation">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-dao-text-hint">
            {section.title}
          </p>
          <ul className="space-y-0.5 border-l border-dao-border">
            {section.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      active
                        ? "border-primary-400 font-medium text-primary-200"
                        : "border-transparent text-dao-text-secondary hover:border-dao-text-hint hover:text-dao-text"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-4">
      <div className="mb-6">
        <DocsSearch />
      </div>

      {/* Desktop nav */}
      <div className="hidden lg:block">
        <NavList />
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="btn-secondary !px-4 !py-2 text-sm"
          aria-label="Open docs navigation"
        >
          <Menu className="h-4 w-4" />
          Browse docs
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="w-80 max-w-[85vw] overflow-y-auto border-l border-dao-border bg-dao-dark-2 p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display font-semibold text-dao-text">Documentation</span>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5 text-dao-text-muted" />
                </button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
