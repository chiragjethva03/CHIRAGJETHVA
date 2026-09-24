"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, profile } from "@/lib/data";
import { FadeUp, SectionLabel } from "./Reveal";
import { Magnetic } from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT = new Set(["fast,", "reliable", "end", "end."]);

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Words light up one by one as the paragraph scrolls through the viewport.
      gsap.fromTo(
        ".about-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative mx-auto max-w-[1600px] px-4 py-28 md:px-10 md:py-44">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel no="01">About</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <p className="about-text text-[clamp(1.75rem,3.6vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {about.statement.split(" ").map((w, i) => (
              <span
                key={i}
                className={`about-word ${HIGHLIGHT.has(w) ? "serif text-volt" : ""}`}
              >
                {w}{" "}
              </span>
            ))}
          </p>

          <FadeUp className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 transition-colors hover:border-volt hover:text-volt"
              >
                Download résumé
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <p className="label max-w-xs normal-case tracking-normal">
              B.Tech in IT · based in {profile.location}, working with clients worldwide.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 border-t border-line md:mt-36 md:grid-cols-4">
        {about.stats.map((s, i) => (
          <FadeUp
            key={s.label}
            delay={i * 0.08}
            className={`border-line py-8 pr-4 md:py-10 ${i % 2 === 0 ? "border-r" : ""} ${
              i < 3 ? "md:border-r" : "md:border-r-0"
            } ${i > 0 ? "md:pl-8" : ""} ${i % 2 === 1 ? "pl-4" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
          >
            <p className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em]">
              <span className="stat-num" data-value={s.value}>
                0
              </span>
              <span className="text-volt">{s.suffix}</span>
            </p>
            <p className="label mt-4">{s.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
