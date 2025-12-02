/**
 * URL parameter serialization utilities
 * Provides common serializers/deserializers for URL state management
 */

/**
 * Serializes a string array to a comma-separated string for URLs
 * Returns empty string if array is empty
 * @example ["tag1", "tag2"] -> "tag1,tag2"
 */
export function serializeArray(arr: string[]): string {
  return arr.length > 0 ? arr.join(",") : "";
}

/**
 * Deserializes a comma-separated string from URL to a string array
 * Filters out empty strings
 * @example "tag1,tag2" -> ["tag1", "tag2"]
 * @example "" -> []
 */
export function deserializeArray(str: string): string[] {
  return str.split(",").filter(Boolean);
}

/**
 * Safely deserializes a URL parameter that might already be an array or string
 * Useful when you're not sure if Next.js has already parsed the param
 */
export function safeDeserializeArray(value: string | string[] | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return deserializeArray(value);
}

/**
 * Serializes a string, returning empty string if falsy
 */
export function serializeString(str: string): string {
  return str || "";
}

/**
 * Deserializes a string from URL, ensuring it's never null
 */
export function deserializeString(str: string): string {
  return str || "";
}

