import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            backgroundColor: "#f4f4f5",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
