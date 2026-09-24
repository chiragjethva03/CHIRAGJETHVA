"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { TiltCard } from "./TiltCard";

type Tok = { t: string; c?: "kw" | "fn" | "str" | "cm" | "p" };

// The snippet that "types" itself out when the card scrolls into view.
const CODE: Tok[][] = [
  [{ t: "// have an idea? let's talk.", c: "cm" }],
  [
    { t: "const ", c: "kw" },
    { t: "chirag = " },
    { t: "new ", c: "kw" },
    { t: "Developer", c: "fn" },
    { t: "(", c: "p" },
    { t: '"Surat"', c: "str" },
    { t: ");", c: "p" },
  ],
  [],
  [
    { t: "await ", c: "kw" },
    { t: "chirag." },
    { t: "bookCall", c: "fn" },
    { t: "({", c: "p" },
  ],
  [{ t: "  duration: " }, { t: '"30 min"', c: "str" }, { t: ",", c: "p" }],
  [{ t: "  topic: " }, { t: '"your next product"', c: "str" }, { t: ",", c: "p" }],
  [{ t: "});", c: "p" }],
  [{ t: "// → opens cal.com/chirag-jethva", c: "cm" }],
];

const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, tok) => m + tok.t.length, 0) + 1, 0);

const COLOR: Record<NonNullable<Tok["c"]>, string> = {
  kw: "text-volt",
  fn: "text-bone font-semibold",
  str: "text-volt/80",
  cm: "text-muted italic",
  p: "text-bone/50",
};

// Splits the snippet at `typed` characters; the caret goes on the line where typing stopped.
function layout(typed: number) {
  let budget = typed;
  let caretPlaced = false;
  return CODE.map((line, li) => {
    const parts = line.map((tok) => {
      const shown = tok.t.slice(0, Math.max(0, budget));
      budget -= tok.t.length;
      return { shown, className: tok.c ? COLOR[tok.c] : "text-bone/85" };
    });
    const lineEnded = budget >= 0;
    budget -= 1; // newline
    const caret = !caretPlaced && (!lineEnded || li === CODE.length - 1);
    if (caret) caretPlaced = true;
    return { parts, caret };
  });
}

export function BookCallTerminal() {
  const root = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const done = typed >= TOTAL;

  // Start typing the first time the card scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) {
          setTyped(TOTAL);
          return;
        }
        timer = window.setInterval(() => {
          setTyped((n) => {
            if (n >= TOTAL) window.clearInterval(timer);
            return Math.min(n + 2, TOTAL);
          });
        }, 28);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const lines = layout(typed).map(({ parts, caret }, li) => (
    <div key={li} className="flex min-h-[1.7em]">
      <span className="w-6 shrink-0 select-none text-right text-muted/50 sm:w-8">{li + 1}</span>
      <span className="whitespace-pre pl-3 sm:pl-4">
        {parts.map((p, ti) => (
          <span key={ti} className={p.className}>
            {p.shown}
          </span>
        ))}
        {caret && <span className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-pulse bg-volt" />}
      </span>
    </div>
  ));

  return (
    <div ref={root} className="w-full min-w-0 max-w-xl">
      <TiltCard max={4} className="rounded-3xl border border-line bg-ink shadow-[0_40px_120px_-40px_color-mix(in_srgb,var(--volt)_35%,transparent)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted">book-call.ts</span>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-volt">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
            <span className="hidden sm:inline">Open to projects</span>
            <span className="sm:hidden">Open</span>
          </span>
        </div>

        <div className="overflow-x-auto px-3 py-5 font-mono text-[11.5px] leading-[1.7] sm:text-[13.5px]">{lines}</div>

        {/* Run button */}
        <div className="border-t border-line p-3">
          <a
            href={profile.cal}
            target="_blank"
            rel="noreferrer"
            className="group/run relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-line px-4 py-3.5 font-mono text-[13px] sm:px-5 sm:py-4 sm:text-sm transition-colors duration-500 hover:border-volt"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] group-hover/run:scale-x-100" />
            <span className="relative flex items-center gap-3 whitespace-nowrap transition-colors duration-500 group-hover/run:text-ink">
              <span className="text-volt transition-colors duration-500 group-hover/run:text-ink">$</span>
              npm run book-call
              {done && <span className="hidden text-muted sm:inline transition-colors duration-500 group-hover/run:text-ink/70">{"// 30 min"}</span>}
            </span>
            <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover/run:text-ink">
              <span className="hidden text-xs uppercase tracking-[0.14em] sm:inline">Run</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line text-base transition-all duration-500 group-hover/run:rotate-[-90deg] group-hover/run:border-ink/30">
                ↵
              </span>
            </span>
          </a>
        </div>
      </TiltCard>
    </div>
  );
}
