"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/data";
import { useSite } from "./Providers";
import { Magnetic } from "./Magnetic";
import { LocalTime } from "./LocalTime";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(
  () => (profile.heroScene === "glass" ? import("./HeroGlass") : import("./HeroGlobe")),
  { ssr: false },
);

function Chars({ text, className = "" }: { text: string; className?: string }) {
  return (
    // Right padding keeps the last letter's stroke (tight letter-spacing) inside the reveal mask.
    <span className={`mask pr-[0.08em] ${className}`} aria-hidden>
      {text.split("").map((c, i) => (
        <span key={i} className="hero-char inline-block" style={{ transform: "translateY(110%)" }}>
          {c}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { loaded, scrollTo } = useSite();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);

  // Stop rendering the 3D scene when the hero is off screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.to(".hero-char", { y: 0, duration: 1.3, ease: "expo.out", stagger: 0.035 })
        .from(".hero-fade", { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, "-=0.9")
        .from(".hero-line", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, "<");

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--volt)_10%,transparent),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--bone)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--bone)_4%,transparent)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      <div className="absolute inset-0">
        <HeroScene ready={loaded} active={active} />
      </div>

      <div className="hero-content pointer-events-none relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-4 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
        <div className="flex items-start justify-between gap-6">
          <div className="hero-fade space-y-1">
            <p className="label text-bone">{profile.role}</p>
            <p className="label">{profile.tagline}</p>
          </div>
          <div className="hero-fade hidden text-right sm:block">
            <p className="label">
              {profile.location} · <LocalTime />
            </p>
            <p className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-volt">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
              </span>
              Open to new projects
            </p>
          </div>
        </div>

        <div>
          <h1 className="select-none font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-[23vw] md:text-[clamp(4.2rem,17vw,17.5rem)]">
            <span className="sr-only">{profile.name}, {profile.role} in Surat, Gujarat</span>
            <Chars text={profile.firstName} />
            <span className="flex items-end justify-between gap-4 md:justify-end md:gap-10">
              <span className="hero-fade serif mb-[0.12em] hidden max-w-[22ch] text-left text-[clamp(1rem,1.6vw,1.6rem)] normal-case leading-snug tracking-normal text-bone/80 md:block">
                Building <span className="text-volt">scalable</span> products, from API to pixel.
              </span>
              <Chars text={profile.lastName} className="text-outline-volt" />
            </span>
          </h1>

          <div className="hero-line mt-6 h-px w-full origin-left bg-line md:mt-8" />

          <div className="pointer-events-auto mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="hero-fade serif text-xl text-bone/80 md:hidden">
              Building <span className="text-volt">scalable</span> products, from API to pixel.
            </p>
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={profile.cal}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-volt px-6 py-3.5 font-medium text-ink"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] group-hover:translate-y-0" />
                  <span className="relative">Book a 30-min call</span>
                  <span className="relative transition-transform duration-500 group-hover:rotate-45">↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => scrollTo("#work")}
                  className="rounded-full border border-line px-6 py-3.5 text-bone/90 backdrop-blur transition-colors hover:border-bone"
                >
                  See my work
                </button>
              </Magnetic>
            </div>
            <button
              onClick={() => scrollTo("#about")}
              className="hero-fade hidden items-center gap-3 sm:flex"
              aria-label="Scroll to about"
            >
              <span className="label">Scroll</span>
              <span className="relative block h-10 w-6 rounded-full border border-line">
                <span className="absolute left-1/2 top-2 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded bg-volt" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
