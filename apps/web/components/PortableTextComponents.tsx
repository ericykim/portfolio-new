import type { PortableTextComponents } from "next-sanity";

export const portableTextComponents: PortableTextComponents = {
  // Handle soft breaks (Shift+Enter) as <br> tags
  hardBreak: () => <br />,
  
  // Render blocks (paragraphs) with proper line break handling
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
};
