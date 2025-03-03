// Generic Listener Type
export type Listener<T> = (value: T) => void;

// Generic state creator function.
export function createState<T>(initialValue: T) {
  let value = initialValue;
  const listeners = new Set<Listener<T>>();

  return {
    get: () => value,
    set: (newValue: T) => {
      if (value === newValue) return;
      value = newValue;
      listeners.forEach((listener) => listener(value));
    },
    subscribe: (listener: Listener<T>, immediateNotify = true) => {
      listeners.add(listener);
      if (immediateNotify) listener(value);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
