"use client";

import { Button } from "@heroui/react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const routeNames: Record<string, string> = {
  "/": "Home",
  "/posts": "Posts",
  "/projects": "Projects",
  "/playground": "Playground",
  "/listening": "Listening",
  "/apps": "Apps I'm Using",
  "/bookmarks": "Bookmarks",
  "/photos": "Photos",
};

export function PageHeader() {
  const pathname = usePathname();
  const { toggle, isOpen, hasMounted } = useSidebar();

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

  // Before mount: use CSS to show on mobile, hide on desktop (matching sidebar's initial state)
  // After mount: use JS isOpen state
  const showMenuButton = !hasMounted || !isOpen;

  return (
    <div className="sticky top-0 z-10 bg-white sm:rounded-t-2xl dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex flex-row flex-shrink-0 items-center justify-start gap-2 min-h-[60px] px-2 sm:px-6">
      {/* Show menu button when sidebar is closed */}
      {showMenuButton && (
        <Button
          isIconOnly
          aria-label="Open menu"
          color="default"
          variant="light"
          size="md"
          onClick={toggle}
          // Before mount: hide on desktop via CSS (sidebar is open on desktop)
          // After mount: always show (since showMenuButton is only true when !isOpen)
          className={`text-neutral-900 dark:text-neutral-100 ${!hasMounted ? "sm:hidden" : ""}`}
        >
          <Menu className="w-[18px] h-[18px]" />
        </Button>
      )}
      <h1 className="text-xl font-semibold leading-none h-[15px]">
        {pageName}
      </h1>
    </div>
  );
}
