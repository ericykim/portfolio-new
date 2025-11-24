"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  FileText,
  Camera,
  Headphones,
  Footprints,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Hammer,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@heroui/react";

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
  const [backdropReady, setBackdropReady] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      close();
    }
  }, [pathname, close]);

  // Delay backdrop interactivity to prevent immediate close on mobile
  useEffect(() => {
    if (isOpen) {
      // Small delay before backdrop becomes clickable
      const timer = setTimeout(() => setBackdropReady(true), 100);
      return () => {
        clearTimeout(timer);
        setBackdropReady(false);
      };
    }
    return () => setBackdropReady(false);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay on mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={backdropReady ? close : undefined}
          style={{ pointerEvents: backdropReady ? "auto" : "none" }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 bottom-0 z-50 md:z-0
          transition-all duration-200 ease-in-out
          bg-white dark:bg-neutral-950
          border-r border-neutral-200 dark:border-neutral-800
          ${isOpen ? "w-56" : "w-0 md:w-0"}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full w-56 p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-2 py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" />
              <span className="font-semibold text-sm whitespace-nowrap">
                Eric Kim
              </span>
            </div>

            <button
              onClick={toggle}
              className="flex p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto">
            {/* Main Navigation */}
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md
                    text-sm font-medium whitespace-nowrap
                    transition-colors duration-150 ease-in-out
                    ${
                      isActive
                        ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }
                  `}
                >
                  <Icon
                    className="w-[18px] h-[18px] flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Craft Section */}
            <div className="pt-4">
              <div className="px-2 mb-1">
                <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                  Craft
                </p>
              </div>

              {craftNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md
                      text-sm font-medium whitespace-nowrap
                      transition-colors duration-150 ease-in-out
                      ${
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100"
                      }
                    `}
                  >
                    <Icon
                      className="w-[18px] h-[18px] flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Personal Section */}
            <div className="pt-4">
              <div className="px-2 mb-1">
                <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                  Personal
                </p>
              </div>

              {personalNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md
                      text-sm font-medium whitespace-nowrap
                      transition-colors duration-150 ease-in-out
                      ${
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-neutral-100"
                      }
                    `}
                  >
                    <Icon
                      className="w-[18px] h-[18px] flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Theme Toggle */}
          <div className="mt-auto pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              onClick={toggleTheme}
              variant="light"
              className="flex items-center gap-2.5 px-2 py-1.5 w-full justify-start"
              startContent={
                theme === "light" ? (
                  <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
                ) : (
                  <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
                )
              }
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
