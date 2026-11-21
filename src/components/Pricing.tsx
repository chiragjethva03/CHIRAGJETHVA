"use client";

import { useEffect, useState } from "react";
import { pricing, profile, type Currency } from "@/lib/data";
import { FadeUp, RevealLines, SectionLabel } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { Magnetic } from "./Magnetic";

const formatters: Record<Currency, Intl.NumberFormat> = {
  INR: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
};

const currencies: { id: Currency; label: string }[] = [
  { id: "INR", label: "₹ INR" },
  { id: "USD", label: "$ USD" },
];

// Rolls the new figure up into view whenever the currency changes.
function Price({
  value,
  currency,
  animate,
  className = "",
}: {
  value: number;
  currency: Currency;
  animate: boolean;
  className?: string;
}) {
  return (
    <span className="mask inline-block align-bottom">
      <span key={currency} className={`${animate ? "price-in" : ""} inline-block tabular-nums ${className}`}>
        {formatters[currency].format(value)}
      </span>
    </span>
  );
}

function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  const index = currencies.findIndex((c) => c.id === value);
  return (
    // Plain toggle buttons: Tab, Enter and Space all work without custom key handling.
    <div
      role="group"
      aria-label="Currency"
      className="relative inline-grid grid-cols-2 rounded-full border border-line bg-ink-2 p-1"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-volt transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {currencies.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
          className={`relative rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-500 ${
            value === c.id ? "text-ink" : "text-bone/70 hover:text-bone"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("INR");
  // Only a visitor's own toggle plays the roll-up; the automatic switch below swaps silently.
  const [animate, setAnimate] = useState(false);

  // Visitors outside India see international pricing first; the toggle still switches freely.
  // This runs while the preloader still covers the page, so the swap is never seen.
  useEffect(() => {
    const detect = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz !== "Asia/Kolkata" && tz !== "Asia/Calcutta") setCurrency("USD");
    };
    detect();
  }, []);

  const choose = (c: Currency) => {
    setAnimate(true);
    setCurrency(c);
  };

  return (
    <section id="pricing" className="relative mx-auto max-w-[1600px] px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
        <div className="space-y-8">
          <SectionLabel no="05">Pricing</SectionLabel>
          <RevealLines
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            lines={[
              "Clear pricing,",
              <>
                no <span className="serif font-normal text-volt">surprises.</span>
              </>,
            ]}
          />
        </div>
        <FadeUp className="flex max-w-sm flex-col gap-6 md:items-end md:text-right">
          <p className="text-bone/70">{pricing.note}</p>
          <CurrencyToggle value={currency} onChange={choose} />
        </FadeUp>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricing.plans.map((p, i) => (
          <FadeUp key={p.no} delay={i * 0.1}>
            <TiltCard
              max={4}
              className={`h-full rounded-[2rem] border bg-ink-2 transition-colors duration-500 ${
                p.featured ? "border-volt/50 hover:border-volt" : "border-line hover:border-volt/40"
              }`}
            >
              {p.featured && (
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(120%_60%_at_50%_0%,color-mix(in_srgb,var(--volt)_10%,transparent),transparent_70%)]" />
              )}
              <div className="relative flex h-full flex-col p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-volt">{p.no}</span>
                  {p.featured ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-volt px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                      Most chosen
                    </span>
                  ) : (
                    <span className="label">{p.timeline}</span>
                  )}
                </div>

                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">{p.name}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-bone/65">{p.tagline}</p>

                <div className="mt-8 border-t border-line pt-8">
                  <p className="label">Starting at</p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <Price
                      value={p.from[currency]}
                      currency={currency}
                      animate={animate}
                      className="text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.05em]"
                    />
                    <span className="serif text-lg text-bone/50">/ {p.unit}</span>
                  </p>
                  {p.featured && <p className="label mt-3">{p.timeline}</p>}
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-bone/80">
                      <span
                        aria-hidden
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${
                          p.featured ? "bg-volt text-ink" : "border border-line text-volt"
                        }`}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Magnetic strength={0.2} className="mt-10 w-full">
                  <a
                    href={profile.cal}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Book"
                    className={`group/cta flex w-full items-center justify-between rounded-full px-6 py-4 text-sm font-medium transition-colors duration-300 ${
                      p.featured
                        ? "bg-volt text-ink hover:bg-bone"
                        : "border border-line text-bone hover:border-volt hover:bg-volt hover:text-ink"
                    }`}
                  >
                    Start with {p.name}
                    <span className="transition-transform duration-500 group-hover/cta:rotate-45">↗</span>
                  </a>
                </Magnetic>
              </div>
            </TiltCard>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-4">
        <div className="rounded-[2rem] border border-line bg-ink-2 p-7 md:p-9">
          <div className="mb-6 flex items-center gap-3">
            <span className="label">Ongoing & flexible</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
            {pricing.extras.map((e) => (
              <div key={e.name} className="group flex flex-col justify-between gap-6 bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/60">{e.body[currency]}</p>
                </div>
                <p className="flex items-baseline gap-2">
                  <Price
                    value={e.price[currency]}
                    currency={currency}
                    animate={animate}
                    className="text-2xl font-semibold tracking-[-0.03em] text-volt"
                  />
                  <span className="serif text-bone/50">/ {e.unit}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="label mt-6 normal-case tracking-[0.04em]">
            * {pricing.fineprint} Not sure which fits? Book a call and I&apos;ll scope it with you.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
