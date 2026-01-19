import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { POST_BY_SLUG_QUERY } from "@/sanity/queries";
import { portableTextComponents } from "@/components/PortableTextComponents";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(
    POST_BY_SLUG_QUERY,
    { slug },
    options
  );

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <div className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <Link
        href="/posts"
        className="hover:underline text-neutral-600 dark:text-neutral-400 sm:hidden"
      >
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
        <p className="text-neutral-600 dark:text-neutral-400">
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={portableTextComponents} />
        )}
      </div>
    </div>
  );
}
