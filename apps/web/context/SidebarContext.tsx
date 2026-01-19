"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  startTransition,
} from "react";
import { usePathname } from "next/navigation";
import { SM_BREAKPOINT } from "@/utils/breakpoints";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  hasMounted: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  open: () => {},
  close: () => {},
  hasMounted: false,
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Start with false on both server and client to avoid hydration mismatch
  // CSS handles the correct visual state before JS takes over
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  
  // Track when sidebar was last opened to prevent immediate close
  const lastOpenTime = useRef<number>(0);

  // After mount, sync state with actual viewport
  useEffect(() => {
    const isDesktop = window.innerWidth >= SM_BREAKPOINT;
    setIsOpen(isDesktop);
    setHasMounted(true);
  }, []);

  const toggle = () => {
    setIsOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        lastOpenTime.current = Date.now();
      }
      return newValue;
    });
  };

  const open = () => {
    lastOpenTime.current = Date.now();
    setIsOpen(true);
  };

  const close = () => {
    // Prevent closing within 100ms of opening (prevents backdrop click race condition)
    if (Date.now() - lastOpenTime.current < 100) {
      return;
    }
    setIsOpen(false);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (!hasMounted) return;
    const isMobile = window.innerWidth < SM_BREAKPOINT;
    if (isMobile) {
      startTransition(() => {
        setIsOpen(false);
      });
    }
  }, [pathname, hasMounted]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close, hasMounted }}>
      {children}
    </SidebarContext.Provider>
  );
}
