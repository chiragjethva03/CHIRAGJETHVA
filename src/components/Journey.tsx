"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/lib/data";
import { RevealLines, SectionLabel } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".journey-list", start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".journey-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          end: "bottom 70%",
          toggleClass: { targets: row, className: "is-active" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="relative mx-auto max-w-[1600px] px-4 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="space-y-8 md:sticky md:top-32">
            <SectionLabel no="05">Journey</SectionLabel>
            <RevealLines
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
              lines={[
                "Where I've",
                <>
                  <span className="serif font-normal text-volt">grown</span> so far.
                </>,
              ]}
            />
          </div>
        </div>

        <div className="journey-list relative md:col-span-8">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
          <div className="journey-progress absolute bottom-0 left-[7px] top-0 w-px origin-top bg-volt" />

          <ol className="space-y-4">
            {journey.map((j) => (
              <li key={j.role + j.period} className="journey-row group relative pl-10 [&.is-active_.dot]:scale-100 [&.is-active_.dot]:bg-volt [&.is-active_h3]:text-bone">
                <span className="dot absolute left-0 top-9 h-[15px] w-[15px] scale-75 rounded-full border border-volt bg-ink transition-all duration-500" />
                <div className="rounded-3xl border border-transparent p-6 transition-colors duration-500 hover:border-line hover:bg-ink-2 md:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-volt">{j.period}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-bone/60 transition-colors duration-500 md:text-4xl">
                    {j.role}
                  </h3>
                  <p className="serif mt-1 text-lg text-bone/60 md:text-xl">{j.org}</p>
                  <ul className="mt-5 space-y-2">
                    {j.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-bone/70 md:text-base">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-bone/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
