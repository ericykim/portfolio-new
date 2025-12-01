import { Suspense } from "react";
import { client } from "@/sanity/client";
import { ALBUMS_QUERY, PHOTOS_QUERY } from "@/sanity/queries";
import { PhotosContent } from "@/components/photos/PhotosContent";
import type { SanityImage } from "@/utils/sanityImage";

interface Album {
  _id: string;
  name: string;
  slug: { current: string };
  coverImage?: SanityImage;
  photoCount: number;
  description?: string;
  previewImages?: SanityImage[];
}

interface Photo {
  _id: string;
  image: SanityImage;
  title: string;
  caption?: string;
  dateTaken?: string;
  uploadedAt: string;
  hideFromGallery?: boolean;
  albums?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
  }>;
}

export default async function PhotosPage() {
  // Fetch data on the server
  const [albums, photos] = await Promise.all([
    client.fetch<Album[]>(ALBUMS_QUERY),
    client.fetch<Photo[]>(PHOTOS_QUERY),
  ]);

  return (
    <Suspense fallback={<div className="p-6 md:p-12">Loading...</div>}>
      <PhotosContent initialAlbums={albums} initialPhotos={photos} />
    </Suspense>
  );
}
