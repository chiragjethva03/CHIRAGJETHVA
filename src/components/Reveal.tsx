"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Slides each masked line up into view when it scrolls in.
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rl-inner", {
        yPercent: 110,
        rotate: 2,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="mask">
          <span className={`rl-inner block origin-top-left ${lineClassName}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

// Fades and lifts children when they scroll in.
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 1.2,
        delay,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SectionLabel({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-volt">({no})</span>
      <span className="h-px w-10 bg-line" />
      <span className="label">{children}</span>
    </div>
  );
}
