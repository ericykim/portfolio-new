import localFont from "next/font/local";

export const ppTelegraf = localFont({
  src: [
    {
      path: "../public/font/PPTelegraf-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/PPTelegraf-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/PPTelegraf-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/PPTelegraf-UltraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/PPTelegraf-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pp-telegraf",
});

export const ppWoodland = localFont({
  src: [
    {
      path: "../public/font/PPWoodland-Ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/PPWoodland-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/PPWoodland-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/PPWoodland-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pp-woodland",
});
