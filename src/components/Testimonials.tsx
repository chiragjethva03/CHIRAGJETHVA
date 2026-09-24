"use client";

import Image from "next/image";
import { testimonials } from "@/lib/data";
import { FadeUp, RevealLines, SectionLabel } from "./Reveal";
import { TiltCard } from "./TiltCard";

function Avatar({ name, photo, photoClass = "" }: { name: string; photo: string; photoClass?: string }) {
  if (photo) {
    return (
      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
        <Image src={photo} alt={name} fill sizes="128px" className={`object-cover ${photoClass}`} />
      </span>
    );
  }
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-volt font-semibold text-ink">
      {initials}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
        <div className="space-y-8">
          <SectionLabel no="04">Testimonials</SectionLabel>
          <RevealLines
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            lines={[
              <>
                <span className="serif font-normal text-volt">Kind</span> words from
              </>,
              "the people I build for.",
            ]}
          />
        </div>
        <p className="label max-w-xs md:text-right">Delivered through KnC Future Tech</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.1}>
            <TiltCard
              max={4}
              className="h-full rounded-[2rem] border border-line bg-ink-2 transition-colors duration-500 hover:border-volt/40"
            >
              <figure className="relative flex h-full flex-col justify-between gap-12 p-7 md:p-9">
                <div>
                  <span className="serif block h-12 select-none text-[6rem] leading-none text-volt md:h-14 md:text-[7rem]" aria-hidden>
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 text-[clamp(1.15rem,1.45vw,1.45rem)] font-medium leading-snug tracking-[-0.02em] text-bone/90">
                    {t.quote}
                  </blockquote>
                </div>

                <figcaption className="relative flex items-center gap-4 border-t border-line pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar name={t.name} photo={t.photo} photoClass={"photoClass" in t ? t.photoClass : ""} />
                    <div>
                      <p className="font-semibold tracking-[-0.01em]">{t.name}</p>
                      <p className="serif text-bone/60">
                        {t.role}, {t.company}
                      </p>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="Visit"
                        className="group/link mt-1 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-volt/80 transition-colors hover:text-volt"
                      >
                        {new URL(t.url).host.replace(/^www\./, "")}
                        <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">↗</span>
                      </a>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </TiltCard>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
