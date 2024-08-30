import { useRef, useCallback } from "react";

/**
 * A custom hook that debounces a function.
 *
 * @param func The original, non-debounced function to debounce.
 * @param delay The delay in milliseconds after which the function will be called.
 * @returns A debounced version of the input function.
 */
export function useDebounce<Func extends (...args: unknown[]) => void>(
  func: Func,
  delay = 1000
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedFunction = useCallback(
    (...args: Parameters<Func>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );

  return debouncedFunction;
}
