import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { type ContentListItem } from "@/components/ContentList";
import { type Tag } from "@/components/Tag";
import { POSTS_QUERY, ALL_POST_TAGS_QUERY } from "@/sanity/queries";
import { ContentLayoutWrapper } from "@/components/ContentLayoutWrapper";

const options = { next: { revalidate: 30 } };

interface PostListItem extends SanityDocument, ContentListItem {}

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let posts: PostListItem[] = [];
  let tags: Tag[] = [];

  try {
    [posts, tags] = await Promise.all([
      client.fetch<PostListItem[]>(POSTS_QUERY, {}, options),
      client.fetch<Tag[]>(ALL_POST_TAGS_QUERY, {}, options),
    ]);
  } catch (error) {
    console.error("Error fetching posts or tags:", error);
  }

  return (
    <ContentLayoutWrapper items={posts} basePath="/posts" allTags={tags}>
      {children}
    </ContentLayoutWrapper>
  );
}
