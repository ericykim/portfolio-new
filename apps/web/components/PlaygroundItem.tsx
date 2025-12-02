"use client";

import { Button } from "@heroui/react";

interface PlaygroundItemProps {
  title: string;
  onClick: () => void;
}

export function PlaygroundItem({ title, onClick }: PlaygroundItemProps) {
  return (
    <Button
      onPress={onClick}
      variant="light"
      className="group flex flex-col items-center gap-3 sm:gap-6 p-4 sm:p-8 rounded-lg h-auto data-[hover=true]:bg-neutral-100 dark:data-[hover=true]:bg-neutral-800"
    >
      {/* Icon Placeholder */}
      <div className="relative w-20 h-20 sm:w-40 sm:h-40 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-lg transition-all duration-300 ease-out group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8 sm:w-16 sm:h-16 text-neutral-400"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            strokeWidth="2"
          />
          <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
          <polyline points="21 15 16 10 5 21" strokeWidth="2" />
        </svg>
      </div>

      {/* Item Title */}
      <div className="text-center">
        <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {title}
        </p>
      </div>
    </Button>
  );
}
