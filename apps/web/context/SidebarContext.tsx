"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
} from "react";
import { usePathname } from "next/navigation";
import { SM_BREAKPOINT } from "@/utils/breakpoints";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  hasInteracted: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  open: () => {},
  close: () => {},
  hasInteracted: false,
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Default to true (open) - CSS will handle initial visibility per screen size
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();

  const toggle = () => {
    setHasInteracted(true);
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setHasInteracted(true);
    setIsOpen(true);
  };

  const close = () => {
    setHasInteracted(true);
    setIsOpen(false);
  };

  // Close sidebar on mobile when route changes (only after user has interacted)
  useEffect(() => {
    const isMobile = window.innerWidth < SM_BREAKPOINT;
    if (isMobile && hasInteracted) {
      startTransition(() => {
        setIsOpen(false);
      });
    }
  }, [pathname, hasInteracted]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close, hasInteracted }}>
      {children}
    </SidebarContext.Provider>
  );
}
