"use client";

import Link from "next/link";
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
        <div className="flex flex-col h-full sm:h-dvh w-56 p-0 sm:p-4">
          {/* Header */}
          <div className="flex items-center justify-between min-h-[60px] px-4">
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
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
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

          {/* Theme Toggle and Social Links */}
          <div className="mt-auto pt-3 pb-3 px-3 flex items-center gap-2">
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
