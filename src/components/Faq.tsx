"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import { FadeUp, RevealLines, SectionLabel } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="space-y-8 md:sticky md:top-32">
            <SectionLabel no="07">FAQ</SectionLabel>
            <RevealLines
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
              lines={[
                "Looking for a",
                <>
                  <span className="serif font-normal text-volt">developer</span> in Surat?
                </>,
              ]}
            />
            <FadeUp className="max-w-sm text-bone/70">
              Quick answers for founders and businesses in Surat, across Gujarat and beyond.
            </FadeUp>
          </div>
        </div>

        <div className="md:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={f.q} delay={i * 0.05} className="border-b border-line first:border-t">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span className="flex gap-4 text-lg font-medium tracking-[-0.02em] md:text-2xl">
                      <span className="mt-1 font-mono text-xs text-volt md:mt-2">0{i + 1}</span>
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-volt bg-volt text-ink" : "border-line text-bone/70 group-hover:border-volt"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                {/* Answers stay in the DOM when collapsed so search engines can read them. */}
                <div
                  id={`faq-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <p className="overflow-hidden pl-8 pr-12 text-bone/70 md:pl-10 md:text-lg">
                    <span className="block pb-7">{f.a}</span>
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
