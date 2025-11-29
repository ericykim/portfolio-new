export interface EmptyStateProps {
  title: string;
  description: string;
}

/**
 * EmptyState component for displaying placeholder content
 * Used when no specific content is selected
 */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center p-8 h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
