import React from "react";
import { ContentList, type ContentListItem } from "./ContentList";

export interface ContentLayoutProps<T extends ContentListItem> {
  items: T[];
  basePath: string;
  activeSlug?: string;
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * ContentLayout provides a responsive split-pane layout with integrated ContentList
 * Desktop (>= md): ContentList sidebar on left (200px) + content on right
 * Mobile: Only shows ContentList, content is hidden (should be on separate route)
 * Both sidebar and content scroll independently on desktop
 */
export function ContentLayout<T extends ContentListItem>({
  items,
  basePath,
  activeSlug,
  emptyState,
  children,
}: ContentLayoutProps<T>) {
  return (
    <>
      {/* Mobile: Show list when no item selected, show content when item is selected */}
      <div className="md:hidden overflow-y-auto w-full" data-scroll-container>
        {activeSlug ? (
          // Show content when an item is selected
          <main className="w-full">{children || emptyState}</main>
        ) : (
          // Show list when no item is selected
          <ContentList
            items={items}
            basePath={basePath}
            activeSlug={activeSlug}
          />
        )}
      </div>

      {/* Desktop: Show list + content */}
      <div className="hidden md:flex md:flex-row h-full w-full">
        {/* Sidebar - 200px fixed on desktop with independent scroll */}
        <div className="shrink-0 overflow-y-auto">
          <ContentList
            items={items}
            basePath={basePath}
            activeSlug={activeSlug}
          />
        </div>

        {/* Main content area - remaining space on desktop with independent scroll */}
        <main className="flex-1 overflow-y-auto grow" data-scroll-container>
          {children || emptyState}
        </main>
      </div>
    </>
  );
}
