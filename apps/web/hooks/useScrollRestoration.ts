import { useEffect, useRef } from "react";

interface UseScrollRestorationOptions {
  storageKey: string;
  enabled: boolean;
}

/**
 * Custom hook to save and restore scroll position using sessionStorage
 * Useful for preserving scroll position when navigating away and back
 */
export function useScrollRestoration({
  storageKey,
  enabled,
}: UseScrollRestorationOptions) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isRestoringRef = useRef(false);

  // Save scroll position before navigating away
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem(
          storageKey,
          scrollContainerRef.current.scrollTop.toString()
        );
      }
    };

    // Save scroll position when clicking links
    const handleLinkClick = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem(
          storageKey,
          scrollContainerRef.current.scrollTop.toString()
        );
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      const links = container.querySelectorAll("a");
      links.forEach((link) => link.addEventListener("click", handleLinkClick));

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        links.forEach((link) =>
          link.removeEventListener("click", handleLinkClick)
        );
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [storageKey, enabled]);

  // Restore scroll position when enabled becomes true
  useEffect(() => {
    if (enabled && scrollContainerRef.current && !isRestoringRef.current) {
      const savedScrollPosition = sessionStorage.getItem(storageKey);
      if (savedScrollPosition) {
        isRestoringRef.current = true;
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = parseInt(
              savedScrollPosition,
              10
            );
            // Clear the flag after restoration
            setTimeout(() => {
              isRestoringRef.current = false;
            }, 100);
          }
        });
      }
    }
  }, [enabled, storageKey]);

  return scrollContainerRef;
}
