import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<SanityDocument>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    options
  );

  const projectImageUrl = project.image
    ? urlFor(project.image)?.width(550).height(310).url()
    : null;

  return (
    <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <Link
        href="/projects"
        className="hover:underline text-neutral-600 dark:text-neutral-400 md:hidden"
      >
        ← Back to projects
      </Link>
      {projectImageUrl && (
        <Image
          src={projectImageUrl}
          alt={project.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-neutral-600 dark:text-neutral-400">
          Published: {new Date(project.publishedAt).toLocaleDateString()}
        </p>
        {Array.isArray(project.body) && <PortableText value={project.body} />}
      </div>
    </div>
  );
}

