'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  close: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Store sidebar state in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-open');
    if (stored !== null) {
      setIsOpen(stored === 'true');
    } else {
      // Default: open on desktop, closed on mobile
      setIsOpen(window.innerWidth >= 768);
    }
  }, []);

  const toggle = () => {
    setIsOpen((prev) => {
      const newValue = !prev;
      localStorage.setItem('sidebar-open', String(newValue));
      return newValue;
    });
  };

  const close = () => {
    setIsOpen(false);
    localStorage.setItem('sidebar-open', 'false');
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

