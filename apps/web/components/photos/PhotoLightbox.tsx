"use client";

import Image from "next/image";
import { useEffect, useCallback, useRef } from "react";
import { Button } from "@heroui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getSanityImageUrl, type SanityImage } from "@/utils/sanityImage";

interface Photo {
  _id: string;
  image: SanityImage;
  title: string;
  caption?: string;
  dateTaken?: string;
  uploadedAt: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: PhotoLightboxProps) {
  const currentPhoto = photos[currentIndex];
  const hasNext = currentIndex < photos.length - 1;
  const hasPrevious = currentIndex > 0;

  // Touch handling for mobile swipe
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // minimum distance for swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && hasNext) {
        // Swiped left - next photo
        onNext();
      } else if (diff < 0 && hasPrevious) {
        // Swiped right - previous photo
        onPrevious();
      }
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && hasNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      }
    },
    [onClose, onNext, onPrevious, hasNext, hasPrevious]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        isIconOnly
        onPress={onClose}
        variant="light"
        radius="full"
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Image Container */}
      <div
        className="flex flex-col justify-end h-full p-4 pt-16 sm:p-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full mx-auto flex flex-col grow">
          {/* Image - grows to fill available space */}
          <div
            className="flex-1 flex items-center justify-center mb-4"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={getSanityImageUrl(currentPhoto.image, {
                  width: 1000,
                  quality: 90,
                })}
                alt={currentPhoto.title}
                width={1000}
                height={500}
                className="w-full h-full object-contain select-none"
                style={{ maxHeight: "80%" }}
                priority
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Fixed Metadata Section at Bottom */}
          <div className="shrink-0 flex flex-col justify-end">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              <Button
                isIconOnly
                onPress={onPrevious}
                isDisabled={!hasPrevious}
                variant="light"
                radius="full"
                className="bg-white/10 hover:bg-white/20 text-white data-[disabled=true]:bg-white/5"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                onPress={onNext}
                isDisabled={!hasNext}
                variant="light"
                radius="full"
                className="bg-white/10 hover:bg-white/20 text-white data-[disabled=true]:bg-white/5"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Photo Metadata */}
            <div className="text-white text-left">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                {currentPhoto.title}
              </h2>
              <div className="min-h-[24px] mb-2">
                {currentPhoto.caption && (
                  <p className="text-neutral-300 line-clamp-2">
                    {currentPhoto.caption}
                  </p>
                )}
              </div>
              <div className="flex gap-4 text-sm text-neutral-400">
                {currentPhoto.dateTaken && (
                  <p>
                    Taken:{" "}
                    {new Date(currentPhoto.dateTaken).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
                <p>
                  {currentIndex + 1} of {photos.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
