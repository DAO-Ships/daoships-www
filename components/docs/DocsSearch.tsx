"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { clsx } from "clsx";
import { searchDocs } from "@/lib/docs";

export function DocsSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchDocs(query).slice(0, 8), [query]);

  // Global hotkey: Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-dao-border bg-dao-dark-2/60 px-3 py-2 text-sm text-dao-text-muted transition-colors hover:border-primary-500/40 hover:text-dao-text-secondary"
      >
        <Search className="h-4 w-4" />
        <span>Search docs…</span>
        <kbd className="ml-auto rounded border border-dao-border bg-dao-dark-1 px-1.5 py-0.5 font-mono text-[10px] text-dao-text-hint">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-dao-border bg-dao-dark-2 shadow-indigo-glow-lg"
          >
            <div className="flex items-center gap-3 border-b border-dao-border px-4">
              <Search className="h-4 w-4 shrink-0 text-dao-text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search the docs…"
                className="w-full bg-transparent py-4 text-dao-text outline-none placeholder:text-dao-text-hint"
                aria-label="Search documentation"
              />
              <kbd className="rounded border border-dao-border bg-dao-dark-1 px-1.5 py-0.5 font-mono text-[10px] text-dao-text-hint">
                esc
              </kbd>
            </div>

            <ul className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-dao-text-hint">
                  No matches for “{query}”.
                </li>
              ) : (
                results.map((r, i) => (
                  <li key={r.href}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r.href)}
                      className={clsx(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        i === active ? "bg-primary-500/15" : "hover:bg-dao-surface/40"
                      )}
                    >
                      <span className="min-w-0">
                        <span
                          className={clsx(
                            "block text-sm font-medium",
                            i === active ? "text-primary-100" : "text-dao-text"
                          )}
                        >
                          {r.title}
                        </span>
                        <span className="block font-mono text-[11px] text-dao-text-hint">
                          {r.section}
                        </span>
                      </span>
                      {i === active && (
                        <CornerDownLeft className="h-4 w-4 shrink-0 text-primary-300" />
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
