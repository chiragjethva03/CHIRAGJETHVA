"use client";

import { useRef } from "react";
import { stack } from "@/lib/data";
import { FadeUp, RevealLines, SectionLabel } from "./Reveal";

export function Stack() {
  const grid = useRef<HTMLDivElement>(null);

  // One cursor position drives the glow on every card border at once.
  const move = (e: React.PointerEvent) => {
    const g = grid.current;
    if (!g) return;
    g.querySelectorAll<HTMLElement>(".stack-card").forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
  };

  return (
    <section className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-12 space-y-8 md:mb-16">
        <SectionLabel no="06">Toolkit</SectionLabel>
        <RevealLines
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
          lines={[
            <>
              Tools I <span className="serif font-normal text-volt">trust</span>
            </>,
            "in production.",
          ]}
        />
      </div>

      <div ref={grid} onPointerMove={move} className="group/grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((s, i) => (
          <FadeUp key={s.group} delay={(i % 3) * 0.08}>
            <div
              className="stack-card relative h-full rounded-3xl p-px"
              style={{
                background:
                  "radial-gradient(360px circle at var(--x, -999px) var(--y, -999px), color-mix(in srgb, var(--volt) 55%, transparent), color-mix(in srgb, var(--bone) 8%, transparent) 45%)",
              }}
            >
              <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-ink-2 p-7">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
                  style={{
                    background: "radial-gradient(300px circle at var(--x) var(--y), color-mix(in srgb, var(--volt) 7%, transparent), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{s.group}</h3>
                  <span className="font-mono text-xs text-muted">{String(s.items.length).padStart(2, "0")}</span>
                </div>
                <div className="relative mt-8 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-line bg-ink px-3.5 py-1.5 text-sm text-bone/80 transition-colors duration-300 hover:border-volt hover:text-volt"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
