import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { type ContentListItem, type Tag } from "@/components/ContentList";
import { POSTS_QUERY, ALL_TAGS_QUERY } from "@/sanity/queries";
import { ContentLayoutWrapper } from "@/components/ContentLayoutWrapper";

const options = { next: { revalidate: 30 } };

interface PostListItem extends SanityDocument, ContentListItem {}

export default async function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, tags] = await Promise.all([
    client.fetch<PostListItem[]>(POSTS_QUERY, {}, options),
    client.fetch<Tag[]>(ALL_TAGS_QUERY, {}, options),
  ]);

  return (
    <ContentLayoutWrapper items={posts} basePath="/writing" allTags={tags}>
      {children}
    </ContentLayoutWrapper>
  );
}
