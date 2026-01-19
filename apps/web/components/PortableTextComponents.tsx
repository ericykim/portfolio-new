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
};
