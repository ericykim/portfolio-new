"use client";

import { usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  "/": "Home",
  "/writing": "Writing",
  "/projects": "Projects",
  "/demo": "Demo",
  "/ama": "AMA",
  "/listening": "Listening",
  "/hikes": "Hikes",
  "/reads": "Good reads",
  "/photos": "Photos",
};

export function PageHeader() {
  const pathname = usePathname();

  // Get the page name from the route map
  // For slug pages, use the parent route
  let pageName: string;

  if (routeNames[pathname]) {
    // Exact match
    pageName = routeNames[pathname];
  } else {
    // Check if it's a slug page by getting the parent route
    const parentRoute = "/" + pathname.split("/")[1];
    pageName = routeNames[parentRoute] || pathname.slice(1) || "Home";
  }

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 flex items-center min-h-[60px]">
      <h1 className="text-xl font-semibold leading-none">{pageName}</h1>
    </div>
  );
}
