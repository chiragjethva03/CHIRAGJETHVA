"use client";

import { services } from "@/lib/data";
import { FadeUp, RevealLines, SectionLabel } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function Services() {
  return (
    <section className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-44">
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
        <div className="space-y-8">
          <SectionLabel no="02">What I do</SectionLabel>
          <RevealLines
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            lines={[
              "One developer,",
              <>
                the <span className="serif font-normal text-volt">whole</span> stack.
              </>,
            ]}
          />
        </div>
        <FadeUp className="max-w-sm text-bone/70">
          From the first sketch to the production server, I own every layer, so nothing gets lost
          between teams. Web and app development for businesses in Surat, across India and worldwide.
        </FadeUp>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <FadeUp key={s.no} delay={i * 0.08}>
            <TiltCard className="h-full rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-volt/40">
              <div className="flex h-full min-h-[260px] md:min-h-[340px] flex-col justify-between p-7 [transform:translateZ(40px)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-volt">{s.no}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-bone/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                    ↗
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/65">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
