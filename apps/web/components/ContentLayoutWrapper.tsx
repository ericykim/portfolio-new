"use client";

import { usePathname } from "next/navigation";
import { ContentLayout } from "@/components/ContentLayout";
import { type ContentListItem } from "@/components/ContentList";

interface ContentLayoutWrapperProps {
  items: ContentListItem[];
  basePath: string;
  children: React.ReactNode;
}

export function ContentLayoutWrapper({
  items,
  basePath,
  children,
}: ContentLayoutWrapperProps) {
  const pathname = usePathname();

  // Extract the slug from pathname (e.g., /writing/my-post-slug -> my-post-slug)
  const slugMatch = pathname.match(new RegExp(`^${basePath}/([^/]+)$`));
  const activeSlug = slugMatch?.[1];

  return (
    <ContentLayout items={items} basePath={basePath} activeSlug={activeSlug}>
      {children}
    </ContentLayout>
  );
}
