"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/lib/data";
import { RevealLines, SectionLabel } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

function ProjectArt({ p }: { p: Project }) {
  const [a, b] = p.hue;
  const host = p.url ? new URL(p.url).host.replace(/^www\./, "") : p.status ? "coming soon" : "private build";

  return (
    <div
      className="relative h-full min-h-[260px] overflow-hidden rounded-2xl"
      style={{ background: `radial-gradient(120% 120% at 20% 10%, ${a}55, transparent 55%), radial-gradient(90% 90% at 90% 100%, ${b}, transparent 70%), #0b0b10` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
      <span
        className="art-glyph serif absolute -bottom-[0.2em] -right-[0.05em] select-none text-[clamp(8rem,20vw,18rem)] leading-none"
        style={{ color: a, opacity: 0.18 }}
        aria-hidden
      >
        {p.glyph}
      </span>

      {/* Browser mock */}
      <div className="art-window absolute left-[8%] right-[8%] top-[14%] overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/50">
            {host}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-3 p-4">
          <div className="col-span-3 space-y-2.5">
            <div className="h-2 w-1/3 rounded-full" style={{ background: a }} />
            <div className="h-4 w-full rounded bg-white/15" />
            <div className="h-4 w-4/5 rounded bg-white/15" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-3 h-6 w-24 rounded-full" style={{ background: a }} />
          </div>
          <div className="col-span-2 rounded-lg" style={{ background: `linear-gradient(135deg, ${a}, ${b})`, opacity: 0.85 }} />
          <div className="col-span-5 grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((k) => (
              <div key={k} className="h-12 rounded-md border border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const Wrapper = p.url ? "a" : "div";
  const linkProps = p.url
    ? { href: p.url, target: "_blank", rel: "noreferrer", "data-cursor": "Visit" }
    : { "data-cursor": p.status ? "Soon" : "Case" };

  return (
    <div className="work-card sticky top-[10vh] flex h-[80vh] min-h-[560px] items-start justify-center pt-4" style={{ zIndex: i + 1 }}>
      <Wrapper
        {...linkProps}
        className="work-inner group grid h-full w-full origin-top grid-rows-[auto_1fr] gap-6 overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-5 md:grid-cols-[1fr_1.25fr] md:grid-rows-1 md:gap-10 md:p-8"
      >
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-volt">/{String(i + 1).padStart(2, "0")}</span>
              <span className="label">
                {p.year}
                {p.status ? ` · ${p.status}` : ""}
              </span>
            </div>
            <h3 className="mt-6 text-[clamp(2rem,4.2vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              {p.title}
            </h3>
            <p className="serif mt-2 text-xl text-bone/60">{p.kind}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/75 md:text-base">{p.description}</p>
          </div>

          <div className="hidden space-y-5 md:block">
            <ul className="space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-bone/70">
                  <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-volt" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone/70">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {p.url && (
                <span className="inline-flex items-center gap-2 text-sm text-volt">
                  Visit live site
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              )}
              {p.extra && (
                // The whole card is already a link, so this can't be a nested <a>.
                <span
                  role="link"
                  tabIndex={0}
                  data-cursor={p.extra.label}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(p.extra!.href, "_blank", "noopener");
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(p.extra!.href, "_blank", "noopener");
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-bone/80 transition-colors hover:border-volt hover:text-volt"
                >
                  {p.extra.label} ↗
                </span>
              )}
            </div>
          </div>
        </div>

        <ProjectArt p={p} />
      </Wrapper>
    </div>
  );
}

export function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector(".work-inner");
        // Once the next card is well on its way, this one dims slightly and steps back beneath it.
        // Explicit start value: tweening from "none" would pass through brightness(0), i.e. black.
        gsap.fromTo(inner, { scale: 1, filter: "brightness(1)" }, {
          scale: 0.95,
          filter: "brightness(0.7)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 55%",
            end: "top 10%",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".art-glyph").forEach((g) => {
        gsap.fromTo(
          g,
          { yPercent: 30 },
          { yPercent: -10, ease: "none", scrollTrigger: { trigger: g, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
        <div className="space-y-8">
          <SectionLabel no="03">Selected work</SectionLabel>
          <RevealLines
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            lines={[
              "Things I've",
              <>
                <span className="serif font-normal text-volt">shipped</span> lately.
              </>,
            ]}
          />
        </div>
        <p className="label">({String(projects.length).padStart(2, "0")}) Projects</p>
      </div>

      <div className="relative">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
