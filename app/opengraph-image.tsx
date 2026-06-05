import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "DAO Ships — Launch a DAO on Quai in one transaction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function helmDataUri() {
  try {
    const svg = readFileSync(
      join(process.cwd(), "public/logos/dao_ships_helm_dark_transparent.svg"),
      "utf8"
    );
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  } catch {
    return null;
  }
}

export default function OgImage() {
  const helm = helmDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 50% -10%, #1b1b3a 0%, #0a0a12 60%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* helm glow, right */}
        {helm && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={helm}
            width={520}
            height={520}
            alt=""
            style={{ position: "absolute", right: -120, top: 55, opacity: 0.16 }}
          />
        )}

        {/* top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {helm && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={helm} width={56} height={56} alt="" />
          )}
          <div style={{ fontSize: 30, fontWeight: 700, color: "#f3f4f6", letterSpacing: -0.5 }}>
            DAO Ships
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
          <div
            style={{
              fontSize: 40,
              color: "#818cf8",
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            DAO launchpad for Quai
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#f3f4f6",
              lineHeight: 1.05,
              marginTop: 18,
              letterSpacing: -1.5,
            }}
          >
            Launch a DAO on Quai.
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#a5b4fc",
            }}
          >
            In one transaction.
          </div>
        </div>

        {/* bottom: subline + accent bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", height: 5, width: 220 }}>
            <div style={{ flex: 1, background: "#6366f1" }} />
            <div style={{ flex: 1, background: "#06b6d4" }} />
            <div style={{ flex: 1, background: "#e20101" }} />
          </div>
          <div style={{ fontSize: 26, color: "#9ca3af" }}>
            Audited governance · Quai Vault multisig treasury · exit anytime
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
