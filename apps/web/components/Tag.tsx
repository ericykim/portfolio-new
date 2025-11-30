import { cn } from "@heroui/react";

// Tag data interface
export interface Tag {
  _id: string;
  name: string;
  slug: { current: string };
}

// Tag color mapping with Tailwind colors
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  design: {
    bg: "bg-purple-100 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
  },
  dev: {
    bg: "bg-blue-100 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
  },
  list: {
    bg: "bg-amber-100 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-300",
  },
  sports: {
    bg: "bg-green-100 dark:bg-green-950",
    text: "text-green-700 dark:text-green-300",
  },
  project: {
    bg: "bg-red-100 dark:bg-red-950",
    text: "text-red-700 dark:text-red-300",
  },
  "local-first": {
    bg: "bg-cyan-100 dark:bg-cyan-950",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  react: {
    bg: "bg-sky-100 dark:bg-sky-950",
    text: "text-sky-700 dark:text-sky-300",
  },
  "react-native": {
    bg: "bg-indigo-100 dark:bg-indigo-950",
    text: "text-indigo-700 dark:text-indigo-300",
  },
  travel: {
    bg: "bg-pink-100 dark:bg-pink-950",
    text: "text-pink-700 dark:text-pink-300",
  },
  "ui/ux": {
    bg: "bg-purple-100 dark:bg-purple-950",
    text: "text-purple-700 dark:text-purple-300",
  },
};

interface TagProps {
  slug: string;
  name: string;
}

export function Tag({ slug, name }: TagProps) {
  const colors = TAG_COLORS[slug] || {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-700 dark:text-neutral-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs md:text-[10px] font-medium shrink-0 transition-colors whitespace-nowrap",
        colors.bg,
        colors.text
      )}
    >
      {name}
    </span>
  );
}
