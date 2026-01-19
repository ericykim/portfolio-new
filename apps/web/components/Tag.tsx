import { cn } from "@heroui/react";
import { X } from "lucide-react";

// Tag data interface
export interface Tag {
  _id: string;
  name: string;
  slug: { current: string };
}

// Tag color mapping with Tailwind colors
const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> =
  {
    design: {
      bg: "bg-purple-100 dark:bg-purple-950",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-500 dark:border-purple-400",
    },
    dev: {
      bg: "bg-blue-100 dark:bg-blue-950",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-500 dark:border-blue-400",
    },
    list: {
      bg: "bg-amber-100 dark:bg-amber-950",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-500 dark:border-amber-400",
    },
    sports: {
      bg: "bg-green-100 dark:bg-green-950",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-500 dark:border-green-400",
    },
    project: {
      bg: "bg-red-100 dark:bg-red-950",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-500 dark:border-red-400",
    },
    "local-first": {
      bg: "bg-cyan-100 dark:bg-cyan-950",
      text: "text-cyan-700 dark:text-cyan-300",
      border: "border-cyan-500 dark:border-cyan-400",
    },
    react: {
      bg: "bg-sky-100 dark:bg-sky-950",
      text: "text-sky-700 dark:text-sky-300",
      border: "border-sky-500 dark:border-sky-400",
    },
    "react-native": {
      bg: "bg-indigo-100 dark:bg-indigo-950",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-500 dark:border-indigo-400",
    },
    travel: {
      bg: "bg-pink-100 dark:bg-pink-950",
      text: "text-pink-700 dark:text-pink-300",
      border: "border-pink-500 dark:border-pink-400",
    },
    "ui/ux": {
      bg: "bg-purple-100 dark:bg-purple-950",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-500 dark:border-purple-400",
    },
    thoughts: {
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-500 dark:border-gray-400",
    },
  };

interface TagProps {
  slug: string;
  name: string;
  isSelected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export function Tag({ slug, name, isSelected, onRemove, onClick }: TagProps) {
  const colors = TAG_COLORS[slug] || {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-700 dark:text-neutral-300",
    border: "border-neutral-500 dark:border-neutral-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs sm:text-[10px] font-medium shrink-0 transition-all whitespace-nowrap",
        colors.bg,
        colors.text,
        isSelected && `border-2 ${colors.border}`,
        !isSelected && "border border-transparent",
        onClick && "cursor-pointer hover:scale-105"
      )}
      onClick={onClick}
    >
      {name}
      {isSelected && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
          aria-label={`Remove ${name} tag`}
        >
          <X className="w-3 h-3 sm:w-2.5 sm:h-2.5" />
        </button>
      )}
    </span>
  );
}
