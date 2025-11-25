"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { SM_BREAKPOINT } from "@/utils/breakpoints";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  open: () => {},
  close: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Start closed to match server-side rendering
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // Open on desktop after hydration to avoid hydration mismatch
  useEffect(() => {
    const openMenuOnDesktop = () => {
      const isDesktop = window.innerWidth >= SM_BREAKPOINT;
      if (isDesktop) {
        open();
      }
    };
    openMenuOnDesktop();
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  );
}
