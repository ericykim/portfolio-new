import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

interface ImageUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getSanityImageUrl(
  source: SanityImageSource,
  options: ImageUrlOptions = {}
): string {
  let imageBuilder = builder.image(source).auto("format").fit("max");

  if (options.width) {
    imageBuilder = imageBuilder.width(options.width);
  }
  if (options.height) {
    imageBuilder = imageBuilder.height(options.height);
  }
  if (options.quality) {
    imageBuilder = imageBuilder.quality(options.quality);
  }
  if (options.format) {
    imageBuilder = imageBuilder.format(options.format);
  }
  if (options.fit) {
    imageBuilder = imageBuilder.fit(options.fit);
  }

  return imageBuilder.url();
}

export function getSanityImageDimensions(image: SanityImage) {
  if (!image?.asset?._ref) return { width: 0, height: 0, aspectRatio: 1 };

  const dimensions = image.asset._ref.split("-")[2];
  const [width, height] = dimensions.split("x").map(Number);
  const aspectRatio = width / height;

  return { width, height, aspectRatio };
}
