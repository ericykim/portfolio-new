"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { getSanityImageUrl, type SanityImage } from "@/utils/sanityImage";

interface Album {
  _id: string;
  name: string;
  slug: { current: string };
  coverImage?: SanityImage;
  photoCount: number;
  previewImages?: SanityImage[];
}

interface AlbumFolderProps {
  album: Album;
  onClick: () => void;
}

export function AlbumFolder({ album, onClick }: AlbumFolderProps) {
  // Get first 3 images for the stack
  const previewImages = album.previewImages?.slice(0, 3) || [];
  const hasPreviewImages = previewImages.length > 0;

  return (
    <Button
      onPress={onClick}
      variant="light"
      className="group flex flex-col items-center gap-6 p-6 md:p-8 rounded-lg h-auto data-[hover=true]:bg-neutral-100 dark:data-[hover=true]:bg-neutral-800 overflow-visible"
    >
      {/* Image Stack */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-visible">
        {hasPreviewImages ? (
          <div className="relative w-full h-full overflow-visible">
            {previewImages.map((image, index) => {
              // Calculate rotation for stacked effect
              const rotations = [8, 0, -8];
              const rotation = rotations[index] || 0;

              return (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-300 ease-out "
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    zIndex: index + 1,
                  }}
                >
                  <div
                    className={`
                      relative w-full h-full rounded-lg overflow-hidden 
                      shadow-lg
                      bg-white dark:bg-neutral-800 transition-all duration-300 ease-out origin-bottom
                      ${index === 0 ? "group-hover:transform-[rotate(18deg)_translate(-16px,0px)] group-hover:md:transform-[rotate(20deg)_translate(-24px,0px)]" : ""}
                      ${index === 1 ? "group-hover:transform-[rotate(2deg)_translate(0px,0px)] group-hover:md:transform-[rotate(2deg)_translate(0px,0px)]" : ""}
                      ${index === 2 ? "group-hover:transform-[rotate(-18deg)_translate(16px,0px)] group-hover:md:transform-[rotate(-20deg)_translate(24px,0px)]" : ""}
                      group-hover:shadow-2xl
                    `}
                  >
                    <Image
                      src={getSanityImageUrl(image, {
                        width: 150,
                        height: 150,
                        quality: 80,
                      })}
                      alt={`${album.name} preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Fallback placeholder if no images
          <div className="relative w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-12 h-12 md:w-16 md:h-16 text-neutral-400"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                strokeWidth="2"
              />
              <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" />
              <polyline points="21 15 16 10 5 21" strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>

      {/* Album Name */}
      <div className="text-center">
        <p className="text-sm md:text-base font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {album.name}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {album.photoCount} {album.photoCount === 1 ? "photo" : "photos"}
        </p>
      </div>
    </Button>
  );
}
