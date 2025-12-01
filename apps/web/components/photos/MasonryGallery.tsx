"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import {
  getSanityImageUrl,
  getSanityImageDimensions,
  type SanityImage,
} from "@/utils/sanityImage";
import { useState, useEffect } from "react";
import useMasonry from "@/hooks/useMasonry";

interface Photo {
  _id: string;
  image: SanityImage;
  title: string;
  caption?: string;
  dateTaken?: string;
  uploadedAt: string;
}

interface MasonryGalleryProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export function MasonryGallery({ photos, onPhotoClick }: MasonryGalleryProps) {
  const masonryContainer = useMasonry();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleImageLoad = (photoId: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev).add(photoId);
      // Check if all images are loaded
      if (newSet.size === photos.length) {
        setAllImagesLoaded(true);
      }
      return newSet;
    });
  };

  // Trigger masonry recalculation when all images are loaded
  useEffect(() => {
    if (allImagesLoaded) {
      // Small delay to ensure DOM has updated
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [allImagesLoaded]);

  if (!photos.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-500 dark:text-neutral-400">
          No photos to display
        </p>
      </div>
    );
  }

  return (
    <div
      ref={masonryContainer}
      className="grid items-start grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
    >
      {photos.map((photo, index) => {
        const dimensions = getSanityImageDimensions(photo.image);
        const aspectRatio = dimensions.aspectRatio || 1;
        const isLoaded = loadedImages.has(photo._id);

        return (
          <Button
            key={photo._id}
            onPress={() => onPhotoClick(index)}
            className="group relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 transition-transform hover:scale-[1.02] p-0 h-auto min-w-0 w-full data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-blue-500"
            style={{ aspectRatio }}
          >
            <Image
              src={getSanityImageUrl(photo.image, {
                width: 800,
                quality: 85,
              })}
              alt={photo.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              loading={index < 8 ? "eager" : "lazy"}
              priority={index < 4}
              onLoad={() => handleImageLoad(photo._id)}
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100">
              <div className="text-white text-left">
                <p className="text-sm font-medium line-clamp-1">
                  {photo.title}
                </p>
                {photo.caption && (
                  <p className="text-xs text-neutral-200 line-clamp-1 mt-1">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
