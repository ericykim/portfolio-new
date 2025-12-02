import React, { Suspense } from "react";
import { ContentList, type ContentListItem } from "./ContentList";
import { type Tag } from "./Tag";

function ContentListSkeleton() {
  return (
    <aside
      className="
      flex flex-col h-full
      w-full md:w-[300px] md:min-w-[200px]
      border-b md:border-b-0 md:border-r
      border-neutral-200 dark:border-neutral-800
      bg-white dark:bg-neutral-950
      rounded-none md:rounded-bl-2xl
      overflow-hidden
      "
    >
      {/* Filter skeleton */}
      <div className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="h-9 sm:h-8 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse" />
        <div className="flex gap-1.5 sm:gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-5 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>
      {/* List skeleton */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="h-5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse flex-1" />
              <div className="h-4 w-12 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-1 h-4">
              <div className="h-4 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse" />
              <div className="h-4 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export interface ContentLayoutProps<T extends ContentListItem> {
  items: T[];
  basePath: string;
  activeSlug?: string;
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
  allTags?: Tag[];
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
  allTags,
}: ContentLayoutProps<T>) {
  return (
    <>
      {/* Mobile: Show list when no item selected, show content when item is selected */}
      <div className="md:hidden w-full h-full flex flex-col">
        {activeSlug ? (
          // Show content when an item is selected
          <main className="w-full h-full overflow-y-auto">
            {children || emptyState}
          </main>
        ) : (
          // Show list when no item is selected
          <Suspense fallback={<ContentListSkeleton />}>
            <ContentList
              items={items}
              basePath={basePath}
              activeSlug={activeSlug}
              allTags={allTags}
            />
          </Suspense>
        )}
      </div>

      {/* Desktop: Show list + content */}
      <div className="hidden md:flex md:flex-row h-full w-full overflow-hidden">
        {/* Sidebar - 200px fixed on desktop with independent scroll */}

        <Suspense fallback={<ContentListSkeleton />}>
          <ContentList
            items={items}
            basePath={basePath}
            activeSlug={activeSlug}
            allTags={allTags}
          />
        </Suspense>

        {/* Main content area - remaining space on desktop with independent scroll */}
        <main className="flex-1 overflow-y-auto grow" data-scroll-container>
          {children || emptyState}
        </main>
      </div>
    </>
  );
}
