import { useEffect, useState } from 'react';

export const useTypedSessionStorage = <T>(key: string, initialValue?: T, raw?: boolean): [T, (value: T) => void] => {
  // Check if we're running in the browser
  const isBrowser = typeof window !== 'undefined';

  const [state, setState] = useState<T>(() => {
    if (!isBrowser) return initialValue as T;
    try {
      const sessionStorageValue = sessionStorage.getItem(key);
      // Check if the key is absent (null)
      if (sessionStorageValue === null) {
        // Save the initial value to sessionStorage
        const valueToStore = raw ? String(initialValue) : JSON.stringify(initialValue);
        sessionStorage.setItem(key, valueToStore);
        return initialValue as T;
      } else {
        // If raw flag is set, return the string directly cast to T;
        // otherwise, parse the JSON
        return raw ? (sessionStorageValue as unknown as T) : JSON.parse(sessionStorageValue);
      }
    } catch (error) {
      console.error('Error accessing sessionStorage', error);
      return initialValue as T;
    }
  });

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);
      sessionStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Error saving to sessionStorage', error);
    }
  }, [state, key, raw, isBrowser]);

  return [state, setState];
};
