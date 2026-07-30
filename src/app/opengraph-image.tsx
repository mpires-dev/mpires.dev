import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Matheus Pires — Fullstack Developer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#f4f4f5",
              borderRadius: 3,
            }}
          />
          <span
            style={{
              color: "#a1a1aa",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            matheuspires.dev
          </span>
        </div>
        <div
          style={{
            color: "#f4f4f5",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Matheus Pires
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 32,
            marginTop: 16,
          }}
        >
          Fullstack Developer · TypeScript · AI Products
        </div>
      </div>
    ),
    { ...size },
  );
}
