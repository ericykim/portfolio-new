"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { Tag as TagChip, type Tag } from "./Tag";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

interface ContentFilterProps {
  allTags?: Tag[];
  onSearchChange: (query: string) => void;
}

export function ContentFilter({
  allTags = [],
  onSearchChange,
}: ContentFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedCallback(onSearchChange, 300);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 p-3 md:p-4 space-y-3 md:space-y-4">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        startContent={
          <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
        }
        classNames={{
          input: "text-sm md:text-xs",
          inputWrapper:
            "h-9 md:h-8 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
        }}
        size="sm"
        radius="md"
      />

      {/* Tag Chips - Horizontal Scrollable List */}
      <div className="flex gap-1.5 md:gap-1 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
        {allTags.length === 0 ? (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            No tags found
          </p>
        ) : (
          allTags.map((tag) => (
            <div
              key={tag._id}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <TagChip slug={tag.slug.current} name={tag.name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
