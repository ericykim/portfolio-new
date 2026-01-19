"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@heroui/react";
import { use } from "react";

export default function PlaygroundItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  
  // Convert slug back to readable title
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-black" data-scroll-container>
      <div className="p-6 sm:p-12 max-w-[1920px] mx-auto">
        <Link
          href="/playground"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Playground
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-black dark:text-white">
          {title}
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400">
            This is the page for <strong>{title}</strong>. Add your content here!
          </p>
        </div>
      </div>
    </div>
  );
}











