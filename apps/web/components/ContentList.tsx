"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@heroui/react";
import { ContentFilter } from "./ContentFilter";
import { Tag as TagChip, type Tag } from "./Tag";
import { useURLStringState, useURLArrayState } from "@/hooks/useURLState";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

export interface ContentListItem {
  _id: string;
  title?: string;
  slug: { current: string } | string;
  publishedAt?: string;
  date?: string;
  tags?: Tag[];
}

export interface ContentListProps<T extends ContentListItem> {
  items: T[];
  basePath: string;
  activeSlug?: string;
  renderItem?: (item: T) => React.ReactNode;
  allTags?: Tag[];
}

export function ContentList<T extends ContentListItem>({
  items,
  basePath,
  activeSlug,
  renderItem,
  allTags,
}: ContentListProps<T>) {
  // Manage URL state for search and tags
  const [searchQuery, setSearchQuery] = useURLStringState(basePath, "search");
  const [selectedTagIds, setSelectedTagIds] = useURLArrayState(
    basePath,
    "tags"
  );

  // Manage scroll position restoration
  const scrollContainerRef = useScrollRestoration({
    storageKey: `${basePath}-scroll-position`,
    enabled: !activeSlug, // Only restore when viewing the list
  });

  // Filter items by search query and selected tags
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(query)
      );
    }

    // Filter by selected tags (item must have ALL selected tags)
    if (selectedTagIds.length > 0) {
      filtered = filtered.filter((item) => {
        if (!item.tags || item.tags.length === 0) return false;
        const itemTagIds = item.tags.map((tag) => tag._id);
        return selectedTagIds.every((selectedId) =>
          itemTagIds.includes(selectedId)
        );
      });
    }

    return filtered;
  }, [items, searchQuery, selectedTagIds]);

  const defaultRenderItem = (item: T) => {
    const slugCurrent =
      typeof item.slug === "string" ? item.slug : item.slug.current;
    const isActive = activeSlug === slugCurrent;
    const date = item.publishedAt || item.date;

    return (
      <Link
        href={`${basePath}/${slugCurrent}`}
        key={item._id}
        className={cn(
          "block p-4 sm:p-4 border-l-2 sm:border-l-2 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-200",
          isActive
            ? "border-l-blue-500 dark:border-l-blue-400 bg-blue-50 dark:bg-blue-950/40"
            : "border-l-transparent hover:border-l-neutral-300 dark:hover:border-l-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
        )}
      >
        {/* Title and Date Row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 flex-1">
            {item.title || "Untitled"}
          </h3>
          {date && (
            <p className="text-sm sm:text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap shrink-0">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1 h-4">
          {item.tags && item.tags.length > 0 && (
            <>
              {item.tags.map((tag) => (
                <TagChip
                  key={tag._id}
                  slug={tag.slug.current}
                  name={tag.name}
                />
              ))}
            </>
          )}
        </div>
      </Link>
    );
  };

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
      <ContentFilter
        allTags={allTags}
        searchQuery={searchQuery}
        selectedTagIds={selectedTagIds}
        onSearchChange={setSearchQuery}
        onTagsChange={setSelectedTagIds}
      />
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white dark:bg-neutral-950"
      >
        {filteredItems.map((item) =>
          renderItem ? renderItem(item) : defaultRenderItem(item)
        )}
        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
            {searchQuery || selectedTagIds.length > 0
              ? "No items match your filters"
              : "No items to display"}
          </div>
        )}
      </div>
    </aside>
  );
}
