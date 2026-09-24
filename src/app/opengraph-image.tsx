import { ImageResponse } from "next/og";

// Link preview shown when the site is shared on WhatsApp, LinkedIn, X, Slack, etc.
export const alt = "Chirag Jethva — Full Stack Developer in Surat, Gujarat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const volt = "#c8ff2e";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 20%, rgba(200,255,46,0.22), transparent 45%), #07070a",
          color: "#edede6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 999,
                background: volt,
                color: "#07070a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              CJ
            </div>
            <div style={{ fontSize: 26, color: "#8a8a86", letterSpacing: 4 }}>CHIRAGJETHVA.TECH</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: volt, letterSpacing: 3 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: volt }} />
            OPEN TO NEW PROJECTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>CHIRAG</div>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9, color: volt }}>JETHVA</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 38, fontWeight: 700 }}>Full Stack Developer · Surat, Gujarat</div>
          <div style={{ fontSize: 26, color: "#8a8a86" }}>
            Websites · Web apps · APIs · Flutter apps — Next.js · Node.js · NestJS · PostgreSQL
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
