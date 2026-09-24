"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Dot + trailing ring. Elements opt in to a label with data-cursor="View".
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? "");
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  const size = label ? 88 : hover ? 56 : 32;

  return (
    <>
      <div
        ref={ring}
        className="cursor-ui pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        aria-hidden
      >
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-out"
          style={{
            width: size,
            height: size,
            borderColor: label ? "transparent" : "color-mix(in srgb, var(--bone) 35%, transparent)",
            background: label ? "var(--volt)" : hover ? "color-mix(in srgb, var(--volt) 8%, transparent)" : "transparent",
          }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-ink transition-opacity"
            style={{ opacity: label ? 1 : 0 }}
          >
            {label}
          </span>
        </div>
      </div>
      <div
        ref={dot}
        className="cursor-ui pointer-events-none fixed left-0 top-0 z-[91] hidden md:block"
        aria-hidden
      >
        <div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt transition-opacity"
          style={{ opacity: label ? 0 : 1 }}
        />
      </div>
    </>
  );
}
