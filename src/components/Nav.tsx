"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks, profile, socials } from "@/lib/data";
import { useSite } from "./Providers";
import { Magnetic } from "./Magnetic";

export function Nav() {
  const { loaded, scrollTo } = useSite();
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      bar.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.6 },
    );
  }, [loaded]);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out"
        style={{ transform: hidden && !open ? "translateY(-110%)" : undefined }}
      >
        <nav ref={bar} className="mx-auto flex opacity-0 max-w-[1600px] items-center justify-between px-4 py-4 md:px-10 md:py-6">
          <button
            onClick={() => go("#top")}
            className="group flex items-center gap-2 font-medium tracking-tight"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-volt text-sm font-bold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              CJ
            </span>
            <span className="hidden text-sm sm:inline">
              Chirag<span className="text-muted"> Jethva</span>
            </span>
          </button>

          {/* On small screens the hero hides this badge, so it lives in the bar instead. */}
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-volt backdrop-blur sm:hidden">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt" />
            </span>
            Open to new projects
          </span>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-ink/60 px-2 py-1.5 backdrop-blur-xl md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="group relative overflow-hidden rounded-full px-4 py-1.5 text-sm text-bone/80 transition-colors hover:text-ink"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
            <Magnetic>
              <a
                href={profile.cal}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-volt"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
                Book a call
              </a>
            </Magnetic>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-[70] grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/60 backdrop-blur md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className="absolute h-px w-5 bg-bone transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
              />
              <span
                className="absolute h-px w-5 bg-bone transition-transform duration-300"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[45] flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] md:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.href} className="mask">
              <button
                onClick={() => go(l.href)}
                tabIndex={open ? 0 : -1}
                className="block text-5xl font-medium tracking-tight transition-transform duration-700"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: open ? `${150 + i * 60}ms` : "0ms",
                }}
              >
                <span className="mr-3 font-mono text-sm text-volt">0{i + 1}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-6">
          <a
            href={profile.cal}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className="block rounded-full bg-volt py-4 text-center font-medium text-ink"
          >
            Book a 30-min call
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={open ? 0 : -1}
                className="label hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
