"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{now ?? "--:--:--"} IST</span>;
}
