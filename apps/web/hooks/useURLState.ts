import {
  deserializeArray,
  deserializeString,
  serializeArray,
  serializeString,
} from "@/utils/urlSerializers";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

interface UseURLStateOptions<T> {
  basePath: string;
  paramName: string;
  defaultValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

/**
 * Custom hook to manage state synchronized with URL parameters
 * Updates URL without scrolling and maintains other params
 */
export function useURLState<T = string>({
  basePath,
  paramName,
  defaultValue,
  serialize = (value: T) => String(value),
  deserialize = (value: string) => value as T,
}: UseURLStateOptions<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Store serialize/deserialize in refs to avoid recreating callbacks
  const serializeRef = useRef(serialize);
  const deserializeRef = useRef(deserialize);
  serializeRef.current = serialize;
  deserializeRef.current = deserialize;

  // Get current URL value
  const urlValue = searchParams.get(paramName);

  // Initialize state from URL only once
  const [value, setValue] = useState<T>(() => {
    if (urlValue) {
      return deserializeRef.current(urlValue);
    }
    return defaultValue as T;
  });

  // Update URL when value changes
  const updateURL = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(searchParams.toString());

      const serialized = serializeRef.current(newValue);

      // Remove param if value is empty
      if (!serialized) {
        params.delete(paramName);
      } else {
        params.set(paramName, serialized);
      }

      const newUrl = params.toString()
        ? `${basePath}?${params.toString()}`
        : basePath;

      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams, basePath, paramName]
  );

  // Combined setter that updates both state and URL
  const setValueAndURL = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolved =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(value)
          : newValue;
      setValue(resolved);
      updateURL(resolved);
    },
    [value, updateURL]
  );

  return [value, setValueAndURL] as const;
}

/**
 * Convenience hook for managing string array state in URL (e.g., tags)
 */
export function useURLArrayState(basePath: string, paramName: string) {
  return useURLState<string[]>({
    basePath,
    paramName,
    defaultValue: [],
    serialize: serializeArray,
    deserialize: deserializeArray,
  });
}

/**
 * Convenience hook for managing string state in URL (e.g., search query)
 */
export function useURLStringState(basePath: string, paramName: string) {
  return useURLState<string>({
    basePath,
    paramName,
    defaultValue: "",
    serialize: serializeString,
    deserialize: deserializeString,
  });
}
