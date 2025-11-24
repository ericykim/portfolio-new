"use client";

import { Button } from "@heroui/react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

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
  const { toggle } = useSidebar();

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
    <div
      className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex flex-row items-center justify-start gap-2 min-h-[30px] sm:min-h-[60px] px-2 sm:px-6"
    >
      <Button
        isIconOnly
        aria-label="Toggle menu"
        color="default"
        variant="light"
        size="md"
        onClick={toggle}
        className="text-neutral-900 dark:text-neutral-100"
      >
        <Menu className="w-5 h-5" />
      </Button>
      <h1 className="text-xl font-semibold leading-none h-[15px]">
        {pageName}
      </h1>
    </div>
  );
}
