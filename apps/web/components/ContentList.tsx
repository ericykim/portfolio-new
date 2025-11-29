"use client";

import Link from "next/link";

export interface ContentListItem {
  _id: string;
  title?: string;
  slug: { current: string } | string;
  publishedAt?: string;
  date?: string;
}

export interface ContentListProps<T extends ContentListItem> {
  items: T[];
  basePath: string;
  activeSlug?: string;
  renderItem?: (item: T) => React.ReactNode;
}

export function ContentList<T extends ContentListItem>({
  items,
  basePath,
  activeSlug,
  renderItem,
}: ContentListProps<T>) {
  const defaultRenderItem = (item: T) => {
    const slugCurrent =
      typeof item.slug === "string" ? item.slug : item.slug.current;
    const isActive = activeSlug === slugCurrent;
    const date = item.publishedAt || item.date;

    return (
      <Link
        href={`${basePath}/${slugCurrent}`}
        key={item._id}
        className={`
          block p-4 md:p-4 border-l-2 md:border-l-2 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-200
          ${
            isActive
              ? "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "border-l-transparent hover:border-l-neutral-300 dark:hover:border-l-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
          }
        `}
      >
        <h3 className="text-base md:text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 mb-1">
          {item.title || "Untitled"}
        </h3>
        {date && (
          <p className="text-sm md:text-xs text-neutral-600 dark:text-neutral-400">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </Link>
    );
  };

  return (
    <aside
      className="
        w-full md:w-[200px] md:min-w-[200px]
        h-auto md:h-full
        border-b md:border-b-0 md:border-r
        border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-950
        md:overflow-y-auto md:overflow-x-hidden scroll-smooth
        rounded-none md:rounded-bl-2xl
      "
    >
      <div>
        {items.map((item) =>
          renderItem ? renderItem(item) : defaultRenderItem(item)
        )}
      </div>
      {items.length === 0 && (
        <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 text-sm">
          No items to display
        </div>
      )}
    </aside>
  );
}
