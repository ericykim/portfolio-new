import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { type ContentListItem } from "@/components/ContentList";
import { type Tag } from "@/components/Tag";
import { PROJECTS_QUERY, ALL_PROJECT_TAGS_QUERY } from "@/sanity/queries";
import { ContentLayoutWrapper } from "@/components/ContentLayoutWrapper";

const options = { next: { revalidate: 30 } };

interface ProjectListItem extends SanityDocument, ContentListItem {}

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, tags] = await Promise.all([
    client.fetch<ProjectListItem[]>(PROJECTS_QUERY, {}, options),
    client.fetch<Tag[]>(ALL_PROJECT_TAGS_QUERY, {}, options),
  ]);

  return (
    <ContentLayoutWrapper items={projects} basePath="/projects" allTags={tags}>
      {children}
    </ContentLayoutWrapper>
  );
}

