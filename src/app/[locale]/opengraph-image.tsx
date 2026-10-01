import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const alt = "Santi's Makeover & Beauty Salon | Academy — Debra Bazaar, West Bengal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/bridal-saree.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fdf6f0" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 70px",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#8a6a33", textTransform: "uppercase" }}>
            Debra Bazaar · Since 2010
          </div>
          <div style={{ fontSize: 76, color: "#8c1f3a", marginTop: 18, lineHeight: 1.05, fontWeight: 700 }}>
            Santi&apos;s Makeover
          </div>
          <div style={{ fontSize: 36, color: "#1a1015", marginTop: 10 }}>Beauty Salon &amp; Academy</div>
          <div style={{ display: "flex", marginTop: 34, gap: 14 }}>
            {["Bridal Makeup", "Hair & Skin", "ISO Certified Courses"].map((label) => (
              <div
                key={label}
                style={{
                  fontSize: 22,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "2px solid #c9a96e",
                  color: "#4a3540",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#b5334e", marginTop: 40 }}>+91 90027 17291 · makeoverbysanti.in</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={420} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
