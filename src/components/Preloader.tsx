"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSite } from "./Providers";

const WORDS = ["Design", "Build", "Ship", "Scale"];

export function Preloader() {
  const { setLoaded } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { v: 0 };
    const wordTimer = window.setInterval(
      () => setWord((w) => Math.min(w + 1, WORDS.length - 1)),
      reduce ? 60 : 520,
    );

    const ctx = gsap.context(() => {}, root);
    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    const q = ctx.selector!;
    tl.to(counter, {
      v: 100,
      duration: reduce ? 0.2 : 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .to(q(".pl-bar"), { scaleX: 1, duration: reduce ? 0.1 : 2.2, ease: "power2.inOut" }, 0)
      .to(q(".pl-fade"), { opacity: 0, y: -20, duration: 0.4, stagger: 0.04 })
      .call(() => setLoaded(true))
      .to(root.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduce ? 0.2 : 1.1,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
      ctx.revert();
      window.clearInterval(wordTimer);
    };
  }, [setLoaded]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink-2 p-6 md:p-10"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="pl-fade flex items-center justify-between">
        <span className="label">Chirag Jethva</span>
        <span className="label">Portfolio ©{new Date().getFullYear()}</span>
      </div>

      <div className="pl-fade text-center">
        <p className="serif text-5xl text-bone md:text-7xl">
          {WORDS[word]}
          <span className="text-volt">.</span>
        </p>
      </div>

      <div className="pl-fade">
        <div className="flex items-end justify-between">
          <span className="label">Loading experience</span>
          <span
            ref={count}
            className="font-mono text-6xl font-light tabular-nums text-volt md:text-8xl"
          >
            000
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div className="pl-bar h-px origin-left scale-x-0 bg-volt" />
        </div>
      </div>
    </div>
  );
}
