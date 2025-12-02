"use client";

import { Input } from "@heroui/react";
import { Search, X } from "lucide-react";
import { Tag as TagChip, type Tag } from "./Tag";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

interface ContentFilterProps {
  allTags?: Tag[];
  searchQuery: string;
  selectedTagIds: string[];
  onSearchChange: (query: string) => void;
  onTagsChange: (tagIds: string[]) => void;
}

export function ContentFilter({
  allTags = [],
  searchQuery,
  selectedTagIds,
  onSearchChange,
  onTagsChange,
}: ContentFilterProps) {
  const debouncedSearch = useDebouncedCallback(onSearchChange, 300);

  const handleSearchChange = (value: string) => {
    // Call both immediate (for UI) and debounced (for URL/filtering)
    onSearchChange(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    onSearchChange("");
  };

  const handleTagSelect = (tagId: string) => {
    const newSelectedTags = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    onTagsChange(newSelectedTags);
  };

  const handleTagRemove = (tagId: string) => {
    const newSelectedTags = selectedTagIds.filter((id) => id !== tagId);
    onTagsChange(newSelectedTags);
  };

  // Preserve the order tags were selected by mapping selectedTagIds to tags
  const selectedTags = selectedTagIds
    .map((id) => allTags.find((tag) => tag._id === id))
    .filter((tag): tag is Tag => tag !== undefined);
  const availableTags = allTags.filter(
    (tag) => !selectedTagIds.includes(tag._id)
  );

  return (
    <div className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        startContent={
          <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
        }
        endContent={
          searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )
        }
        classNames={{
          input: "text-sm sm:text-xs",
          inputWrapper:
            "h-9 sm:h-8 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
        }}
        size="sm"
        radius="md"
      />

      {/* Selected Tags - Wrapping List */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-1">
          {selectedTags.map((tag) => (
            <TagChip
              key={tag._id}
              slug={tag.slug.current}
              name={tag.name}
              isSelected
              onRemove={() => handleTagRemove(tag._id)}
            />
          ))}
        </div>
      )}

      {/* Available Tag Chips - Horizontal Scrollable List */}
      <div className="flex gap-1.5 sm:gap-1 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide">
        {availableTags.length === 0 ? (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {allTags.length === 0 ? "No tags found" : "All tags selected"}
          </p>
        ) : (
          availableTags.map((tag) => (
            <TagChip
              key={tag._id}
              slug={tag.slug.current}
              name={tag.name}
              onClick={() => handleTagSelect(tag._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
