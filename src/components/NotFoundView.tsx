"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/data";
import { Magnetic } from "./Magnetic";

export function NotFoundView() {
  const [shown, setShown] = useState(false);
  // The 404 page is prerendered once, so the requested path is only known in the browser.
  const [path, setPath] = useState("/");

  useEffect(() => {
    const id = window.setTimeout(() => {
      setPath(window.location.pathname);
      setShown(true);
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[30%] h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,255,46,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,237,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,237,230,0.04)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <header className="absolute inset-x-0 top-0 z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 md:px-10 md:py-6">
        <Link href="/" className="group flex items-center gap-2 font-medium tracking-tight" aria-label="Go to homepage">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-volt text-sm font-bold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
            CJ
          </span>
          <span className="hidden text-sm sm:inline">
            Chirag<span className="text-muted"> Jethva</span>
          </span>
        </Link>
        <span className="label">Error 404</span>
      </header>

      <div
        className="relative z-10 mx-auto my-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center transition-all duration-1000 ease-out md:pb-20"
        style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)" }}
      >
        <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
          This page got <span className="serif font-normal text-volt">lost</span> in transit.
        </h1>

        <div className="mt-6 w-full max-w-md overflow-hidden rounded-2xl border border-line bg-ink/70 text-left font-mono text-[12px] backdrop-blur sm:text-[13px]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-muted">terminal</span>
          </div>
          <div className="space-y-1 px-4 py-3.5 leading-relaxed">
            <p className="truncate">
              <span className="text-volt">$</span> <span className="text-bone/85">curl chiragjethva.tech{path}</span>
            </p>
            <p className="text-[#ff6b6b]">✖ 404 Not Found</p>
            <p className="text-muted">{"// the route doesn't exist, or it moved."}</p>
            <p>
              <span className="text-volt">$</span> <span className="text-bone/85">cd ~</span>
              <span className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-volt" />
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-volt px-6 py-3.5 font-medium text-ink"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] group-hover:translate-y-0" />
              <span className="relative transition-transform duration-500 group-hover:-translate-x-0.5">←</span>
              <span className="relative">Back to home</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cal}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-3.5 text-bone/90 backdrop-blur transition-colors hover:border-bone"
            >
              Book a call
            </a>
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
