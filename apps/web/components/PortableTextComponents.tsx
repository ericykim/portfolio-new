import React from "react";

export const portableTextComponents = {
  // Handle soft breaks (Shift+Enter) as <br> tags
  hardBreak: () => <br />,

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
