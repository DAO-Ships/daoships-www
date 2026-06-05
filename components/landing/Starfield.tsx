"use client";

import { useEffect, useRef } from "react";

// Lightweight drifting-particle field for the hero. Pure canvas, no deps.
// Respects prefers-reduced-motion (renders a single static frame).
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#6366f1", "#06b6d4", "#a5b4fc"];
    let w = 0;
    let h = 0;
    let raf = 0;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number; c: string };
    let parts: P[] = [];

    function seed() {
      const count = Math.min(64, Math.round((w * h) / 26000));
      parts = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.2,
        t: Math.random() * Math.PI * 2,
        c: colors[i % colors.length],
      }));
    }

    function resize() {
      const parent = el!.parentElement;
      w = parent?.clientWidth ?? el!.clientWidth;
      h = parent?.clientHeight ?? el!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el!.width = w * dpr;
      el!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw(animate: boolean) {
      ctx!.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          p.t += 0.02;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }
        const alpha = animate ? p.a * (0.6 + 0.4 * Math.sin(p.t)) : p.a;
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = p.c;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      if (animate) raf = requestAnimationFrame(() => draw(true));
    }

    resize();
    draw(!reduce);

    const ro = new ResizeObserver(resize);
    if (el.parentElement) ro.observe(el.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
