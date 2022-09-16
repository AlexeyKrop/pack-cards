import { useEffect, useState } from 'react';

const DELAY_FOR_DEBOUNCE = 1000;

export const useDebounce: <T>(value: T, delay?: number) => T = (
  value,
  delay = DELAY_FOR_DEBOUNCE,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
