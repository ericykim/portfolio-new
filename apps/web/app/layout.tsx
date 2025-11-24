import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { CollapsibleSidebar } from "@/components/nav/CollapsibleSidebar";
import { PageHeader } from "@/components/nav/PageHeader";
import { ppTelegraf, ppWoodland } from "@/styles/typography";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Eric Kim",
  description: "Eric's corner of the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            document.documentElement.classList.toggle(
              "dark",
              localStorage.theme === "dark" ||
                (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
          `}
        </Script>
      </head>
      <body
        className={`${ppTelegraf.variable} ${ppWoodland.variable} antialiased bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 overflow-hidden`}
      >
        <Providers>
          <div className="flex h-dvh bg-neutral-100 dark:bg-neutral-900">
            <CollapsibleSidebar />
            <div className="flex-1 transition-all duration-200 p-4 overflow-hidden">
              <div className="h-full mx-auto bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden">
                <PageHeader />
                <div className="flex-1 overflow-y-auto">{children}</div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
