import { ImageResponse } from "next/og";

export const alt = "Dineshbabu Elumalai | Senior Software Engineer – iOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #05070b 0%, #07111d 56%, #090b10 100%)",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            left: -160,
            top: 70,
            borderRadius: 520,
            background: "rgba(10,132,255,0.13)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            right: -110,
            bottom: -120,
            borderRadius: 430,
            background: "rgba(255,107,44,0.09)",
            filter: "blur(70px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 34,
            border: "1px solid rgba(96,165,250,0.18)",
            borderRadius: 30,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "74px 82px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#0a84ff",
                boxShadow: "0 0 24px rgba(10,132,255,0.85)",
              }}
            />
            <div
              style={{
                color: "#93c5fd",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              NATIVE iOS · ARCHITECTURE · PRODUCT ENGINEERING
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 890 }}>
            <div
              style={{
                fontSize: 70,
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: "-0.045em",
              }}
            >
              Dineshbabu Elumalai
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.2,
                fontWeight: 700,
                color: "#60a5fa",
              }}
            >
              Senior Software Engineer – iOS
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#a8b3c7",
                lineHeight: 1.45,
              }}
            >
              Swift · SwiftUI · UIKit · Objective-C · Design Systems · Secure Integrations
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                padding: "13px 20px",
                borderRadius: 999,
                border: "1px solid rgba(96,165,250,0.35)",
                background: "rgba(10,132,255,0.07)",
                color: "#dbeafe",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              BUILD · ARCHITECT · INTEGRATE · SHIP
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#ff7a2f" }}>erbdinesh.com</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 78,
            top: 120,
            width: 168,
            height: 330,
            borderRadius: 40,
            border: "2px solid rgba(96,165,250,0.25)",
            boxShadow: "0 0 44px rgba(10,132,255,0.14)",
            background: "rgba(3,7,18,0.52)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "linear-gradient(145deg, #ff9a3c, #ff5a1f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
              color: "white",
              boxShadow: "0 0 30px rgba(255,107,44,0.28)",
            }}
          >
            iOS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
