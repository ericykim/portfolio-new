import { EmptyState } from "@/components/EmptyState";

export default function PostsPage() {
  return (
    <EmptyState
      title="Select a post to read"
      description="Choose a post from the list to view its content"
    />
  );
}
