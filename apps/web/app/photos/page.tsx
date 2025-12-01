"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner, Button, Tabs, Tab } from "@heroui/react";
import { Image as ImageIcon, FolderOpen, ChevronLeft } from "lucide-react";
import { client } from "@/sanity/client";
import { ALBUMS_QUERY, PHOTOS_QUERY } from "@/sanity/queries";
import { AlbumFolder } from "@/components/photos/AlbumFolder";
import { MasonryGallery } from "@/components/photos/MasonryGallery";
import { PhotoLightbox } from "@/components/photos/PhotoLightbox";
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
  albums?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
  }>;
}

export default function PhotosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Get view and album from URL
  const view = searchParams.get("view") || "all";
  const albumSlug = searchParams.get("album");
  const photoId = searchParams.get("photo");

  // Find current album if viewing one
  const currentAlbum = useMemo(() => {
    if (!albumSlug) return null;
    return albums.find((a) => a.slug.current === albumSlug);
  }, [albumSlug, albums]);

  // Filter photos based on current view
  const displayedPhotos = useMemo(() => {
    if (currentAlbum) {
      return photos.filter((photo) =>
        photo.albums?.some((a) => a._id === currentAlbum._id)
      );
    }
    return photos;
  }, [currentAlbum, photos]);

  // Calculate lightbox index from URL
  const lightboxIndex = useMemo(() => {
    if (!photoId || displayedPhotos.length === 0) return null;
    const index = displayedPhotos.findIndex((p) => p._id === photoId);
    return index !== -1 ? index : null;
  }, [photoId, displayedPhotos]);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [albumsData, photosData] = await Promise.all([
          client.fetch(ALBUMS_QUERY),
          client.fetch(PHOTOS_QUERY),
        ]);
        setAlbums(albumsData);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleViewChange = (newView: "all" | "albums") => {
    const params = new URLSearchParams();
    params.set("view", newView);
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handleAlbumClick = (album: Album) => {
    const params = new URLSearchParams();
    params.set("view", "all");
    params.set("album", album.slug.current);
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handleBackToAlbums = () => {
    const params = new URLSearchParams();
    params.set("view", "albums");
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handlePhotoClick = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("photo", displayedPhotos[index]._id);
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handleCloseLightbox = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("photo");
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    const newIndex = Math.min(lightboxIndex + 1, displayedPhotos.length - 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("photo", displayedPhotos[newIndex]._id);
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  const handlePreviousPhoto = () => {
    if (lightboxIndex === null) return;
    const newIndex = Math.max(lightboxIndex - 1, 0);
    const params = new URLSearchParams(searchParams.toString());
    params.set("photo", displayedPhotos[newIndex]._id);
    router.push(`/photos?${params.toString()}`, { scroll: false });
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const isAlbumsView = view === "albums" && !currentAlbum;

  return (
    <div className="w-full overflow-y-auto bg-white dark:bg-neutral-950">
      <div className="p-6 md:p-12 max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-row items-center justify-between gap-4 mb-6">
            <div>
              {currentAlbum && (
                <Button
                  onPress={handleBackToAlbums}
                  variant="light"
                  size="sm"
                  startContent={<ChevronLeft className="w-4 h-4" />}
                  className="mb-2 text-neutral-600 dark:text-neutral-400"
                >
                  Back to Albums
                </Button>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {currentAlbum
                  ? currentAlbum.name
                  : view === "albums"
                    ? "Albums"
                    : "Photos"}
              </h1>
              {currentAlbum && currentAlbum.description && (
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  {currentAlbum.description}
                </p>
              )}
            </div>

            {!currentAlbum && (
              <Tabs
                selectedKey={view}
                onSelectionChange={(key) =>
                  handleViewChange(key as "all" | "albums")
                }
                aria-label="Photo view options"
                variant="bordered"
                color="default"
              >
                <Tab
                  key="all"
                  title={
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span className="hidden md:inline">All Photos</span>
                    </div>
                  }
                />
                <Tab
                  key="albums"
                  title={
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      <span className="hidden md:inline">Albums</span>
                    </div>
                  }
                />
              </Tabs>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            {isAlbumsView && (
              <p>
                {albums.length} {albums.length === 1 ? "album" : "albums"}
              </p>
            )}
            {!isAlbumsView && (
              <p>
                {displayedPhotos.length}{" "}
                {displayedPhotos.length === 1 ? "photo" : "photos"}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {isAlbumsView ? (
          // Albums View - Desktop-style folders
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {albums.length > 0 ? (
              albums.map((album) => (
                <AlbumFolder
                  key={album._id}
                  album={album}
                  onClick={() => handleAlbumClick(album)}
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-64">
                <p className="text-neutral-500 dark:text-neutral-400">
                  No albums yet. Create your first album in Sanity Studio.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Photos View - Masonry Gallery
          <MasonryGallery
            photos={displayedPhotos}
            onPhotoClick={handlePhotoClick}
          />
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={displayedPhotos}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
        />
      )}
    </div>
  );
}
