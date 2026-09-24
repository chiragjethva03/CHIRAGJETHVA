"use client";

import { useRef } from "react";
import gsap from "gsap";

// 3D tilt toward the pointer with a spotlight that follows it.
export function TiltCard({
  children,
  className = "",
  max = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 900,
    });
  };

  const leave = () =>
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.4)" });

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`group relative [transform-style:preserve-3d] ${className}`}
    >
      <div className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}
