"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  FileText,
  Camera,
  Headphones,
  AppWindow,
  Bookmark,
  Sun,
  Moon,
  Hammer,
  Linkedin,
  Github,
  Instagram,
  ChevronsLeft,
  Sparkles,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { Button, cn } from "@heroui/react";
import { NavSection } from "./NavSection";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [{ href: "/", label: "Home", icon: Home }];

const craftNavItems: NavItem[] = [
  { href: "/posts", label: "Posts", icon: FileText },
  { href: "/projects", label: "Projects", icon: Hammer },
  { href: "/playground", label: "Playground", icon: Sparkles },
];

const personalNavItems: NavItem[] = [
  { href: "/photos", label: "Photos", icon: Camera },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/apps", label: "Apps I'm Using", icon: AppWindow },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const { isOpen, toggle, close, hasMounted } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Backdrop overlay on mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          `
          fixed sm:relative z-50 sm:z-0
          bg-neutral-100 dark:bg-neutral-900
          overflow-hidden
          
          sm:top-0 sm:left-0 sm:bottom-0
          
          top-4 left-4 bottom-4
          rounded-2xl sm:rounded-none
          shadow-xl sm:shadow-none
        `,
          // Only animate after mount to prevent flash
          hasMounted && "transition-[width,transform] duration-200 ease-in-out",
          // Before mount: use CSS to show correct initial state (open on desktop, closed on mobile)
          // After mount: use JS isOpen state
          !hasMounted
            ? "w-0 sm:w-56" // CSS-only initial state
            : isOpen
              ? "w-56"
              : "w-0"
        )}
      >
        <div className="flex flex-col h-full sm:h-dvh w-56 p-0 sm:py-4 sm:pl-4">
          {/* Header */}
          <div className="flex items-center justify-between min-h-[60px] px-4 sm:pl-2 sm:pr-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-neutral-200 dark:ring-neutral-800">
                <Image
                  src="/eric.jpg"
                  alt="Eric Kim"
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-sm whitespace-nowrap">
                Eric Kim
              </span>
            </div>

            <Button
              onClick={toggle}
              variant="light"
              isIconOnly
              className="flex-shrink-0"
              aria-label="Close sidebar"
            >
              <ChevronsLeft className="w-[18px] h-[18px]" strokeWidth={2} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 sm:px-0">
            {/* Main Navigation */}
            <NavSection items={mainNavItems} currentPath={pathname} />

            {/* Craft Section */}
            <NavSection
              items={craftNavItems}
              currentPath={pathname}
              title="Craft"
              className="pt-4"
            />

            {/* Personal Section */}
            <NavSection
              items={personalNavItems}
              currentPath={pathname}
              title="Personal"
              className="pt-4"
            />
          </nav>

          {/* Theme Toggle and Social Links */}
          <div className="mt-auto flex items-center gap-2 px-2 sm:px-0 pb-3 sm:pb-0">
            <Button
              onClick={toggleTheme}
              variant="light"
              isIconOnly
              className="flex-shrink-0"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
              ) : (
                <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
              )}
            </Button>

            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex items-center gap-2">
              <Button
                as="a"
                href="https://www.instagram.com/lens.eric/"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                isIconOnly
                className="flex-shrink-0"
                aria-label="Instagram"
              >
                <Instagram className="w-[18px] h-[18px]" strokeWidth={2} />
              </Button>

              <Button
                as="a"
                href="https://www.linkedin.com/in/erickimdev"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                isIconOnly
                className="flex-shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[18px] h-[18px]" strokeWidth={2} />
              </Button>

              <Button
                as="a"
                href="https://github.com/ericykim"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                isIconOnly
                className="flex-shrink-0"
                aria-label="GitHub"
              >
                <Github className="w-[18px] h-[18px]" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
