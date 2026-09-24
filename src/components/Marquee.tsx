"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marquee } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Two endless rows; scrolling speeds them up and flips their direction.
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".marquee-track");
      const tweens = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 },
        ),
      );
      let dir = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction !== dir) dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: boost * dir, duration: 0.2, overwrite: true });
            gsap.to(t, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
          });
        },
      });
      gsap.to(".marquee-skew", {
        skewX: -4,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const row = (outline: boolean) =>
    [...marquee, ...marquee].map((item, i) => (
      <span key={i} className="flex items-center">
        <span
          className={`px-6 text-[clamp(2.5rem,7vw,6.5rem)] font-semibold uppercase leading-none tracking-[-0.04em] md:px-10 ${
            outline ? "text-outline" : "text-bone"
          }`}
        >
          {item}
        </span>
        <span className="text-[clamp(1.5rem,3vw,3rem)] text-volt">✦</span>
      </span>
    ));

  return (
    <div ref={root} className="relative overflow-hidden border-y border-line py-10 md:py-14" aria-label="Technologies I use">
      <div className="marquee-skew space-y-4">
        <div className="marquee-track">{row(false)}</div>
        <div className="marquee-track">{row(true)}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
