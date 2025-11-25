"use client";

import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Camera,
  Headphones,
  Footprints,
  BookOpen,
  Sun,
  Moon,
  Hammer,
  Linkedin,
  Github,
  ChevronsLeft,
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
  { href: "/writing", label: "Writing", icon: FileText },
  { href: "/projects", label: "Projects", icon: Hammer },
];

const personalNavItems: NavItem[] = [
  { href: "/photos", label: "Photos", icon: Camera },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/hikes", label: "Hikes", icon: Footprints },
  { href: "/reads", label: "Good reads", icon: BookOpen },
];

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useSidebar();
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
          transition-all duration-200 ease-in-out
          bg-neutral-100 dark:bg-neutral-900
          overflow-hidden
          
          sm:top-0 sm:left-0 sm:bottom-0
          
          top-4 left-4 bottom-4
          rounded-2xl sm:rounded-none
          shadow-xl sm:shadow-none
        `,
          isOpen ? "w-56" : "w-0"
        )}
      >
        <div className="flex flex-col h-full sm:h-dvh w-56 p-0 sm:py-4 sm:pl-4">
          {/* Header */}
          <div className="flex items-center justify-between min-h-[60px] pl-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
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
          <nav className="flex-1 space-y-0.5 overflow-y-auto">
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
          <div className="mt-auto pt-3 pb-3 flex items-center gap-2">
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
