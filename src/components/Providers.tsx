"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Ctx = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  scrollTo: (target: string | number) => void;
};

const SiteContext = createContext<Ctx>({
  loaded: false,
  setLoaded: () => {},
  scrollTo: () => {},
});

export const useSite = () => useContext(SiteContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hold scroll while the preloader is on screen.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (loaded) {
      lenis?.start();
      document.documentElement.style.overflow = "";
      ScrollTrigger.refresh();
    } else {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [loaded]);

  const scrollTo = (target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4, offset: 0 });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <SiteContext.Provider value={{ loaded, setLoaded, scrollTo }}>
      {children}
    </SiteContext.Provider>
  );
}
