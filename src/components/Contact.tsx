"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, socials } from "@/lib/data";
import { RevealLines, SectionLabel } from "./Reveal";
import { LocalTime } from "./LocalTime";
import { BookCallTerminal } from "./BookCallTerminal";
import { useSite } from "./Providers";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSite();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-name",
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: ".footer-name", start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" ref={root} className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--volt)_12%,transparent),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1600px] px-4 pt-28 md:px-10 md:pt-40">
        <SectionLabel no="08">Contact</SectionLabel>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] [&>*]:min-w-0">
          <RevealLines
            className="text-[clamp(3rem,8.5vw,9rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
            lines={[
              "Have an idea?",
              <>
                Let&apos;s make it <span className="serif font-normal text-volt">real.</span>
              </>,
            ]}
          />

          <div className="flex min-w-0 justify-center lg:justify-end">
            <BookCallTerminal />
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <p className="label">Email</p>
            <button
              onClick={copy}
              data-cursor={copied ? "Copied" : "Copy"}
              className="group mt-3 flex items-center gap-3 text-left text-xl font-medium tracking-[-0.02em] md:text-2xl"
            >
              <span className="bg-[linear-gradient(var(--volt),var(--volt))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {profile.email}
              </span>
              <span className="font-mono text-xs text-volt">{copied ? "Copied ✓" : ""}</span>
            </button>
          </div>
          <div>
            <p className="label">Socials</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-lg text-bone/80 transition-colors hover:text-volt"
                  >
                    {s.label}
                    <span className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="label">Local time</p>
            <p className="mt-3 text-lg text-bone/80">
              {profile.location} · <LocalTime />
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden">
        <p
          className="footer-name select-none whitespace-nowrap text-center text-[13.2vw] font-semibold uppercase leading-[0.78] tracking-[-0.07em] text-outline transition-colors duration-700 hover:text-volt"
          aria-hidden
        >
          Chirag Jethva
        </p>
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 border-t border-line px-4 py-6 sm:flex-row md:px-10">
        <p className="label">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <button onClick={() => scrollTo(0)} className="label transition-colors hover:text-volt">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
