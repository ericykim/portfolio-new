import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { type ContentListItem } from "@/components/ContentList";
import { POSTS_QUERY } from "@/sanity/queries";
import { ContentLayoutWrapper } from "@/components/ContentLayoutWrapper";

const options = { next: { revalidate: 30 } };

interface PostListItem extends SanityDocument, ContentListItem {}

export default async function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await client.fetch<PostListItem[]>(POSTS_QUERY, {}, options);

  return (
    <ContentLayoutWrapper items={posts} basePath="/writing">
      {children}
    </ContentLayoutWrapper>
  );
}
