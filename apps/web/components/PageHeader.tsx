"use client";

import { usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  "/": "Home",
  "/writing": "Writing",
  "/work": "Work",
  "/demo": "Demo",
  "/ama": "AMA",
  "/listening": "Listening",
  "/hikes": "Hikes",
  "/reads": "Good reads",
  "/photos": "Photos",
};

export function PageHeader() {
  const pathname = usePathname();

  // Get the page name from the route map, or use the pathname
  const pageName = routeNames[pathname] || pathname.slice(1) || "Home";

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 flex items-center min-h-[60px]">
      <h1 className="text-xl font-semibold leading-none">{pageName}</h1>
    </div>
  );
}
