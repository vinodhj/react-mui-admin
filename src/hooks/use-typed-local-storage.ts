import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import useLocalStorage from 'react-use-localstorage';

export const useTypedLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useLocalStorage(key, JSON.stringify(defaultValue));
  const value = useMemo(() => {
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return defaultValue;
    }
  }, [storedValue, defaultValue]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (newValue) => {
      if (typeof newValue === 'function') {
        // If newValue is a function, call it with the current value to get the updated value.
        const updater = newValue as (prevState: T) => T;
        const updatedValue = updater(value);
        setStoredValue(JSON.stringify(updatedValue));
      } else {
        setStoredValue(JSON.stringify(newValue));
      }
    },
    [value, setStoredValue]
  );

  return [value, setValue];
};
