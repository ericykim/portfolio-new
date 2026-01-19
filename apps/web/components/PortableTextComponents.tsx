import React from "react";
import Image from "next/image";
import { urlFor } from "@/utils/sanityImage";

interface PortableTextImageValue {
  asset?: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

export const portableTextComponents = {
  // Handle soft breaks (Shift+Enter) as <br> tags
  hardBreak: () => <br />,

  // Handle images in portable text
  types: {
    image: ({ value }: { value: PortableTextImageValue }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).auto("format").url()}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  // Render blocks (paragraphs) with proper line break handling
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4">{children}</p>
    ),
  },

  // Style links and other marks
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || "";
      
      // Check if link is internal (relative path or our own domain)
      const isInternal =
        href.startsWith("/") ||
        href.includes("erickim.io") ||
        href.includes("localhost");
      
      const isExternal = !isInternal;

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};
