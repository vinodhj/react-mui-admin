// src/authEvents.ts
type Listener = (isRevoked: boolean) => void;

let isRevoked = false;
const listeners: Listener[] = [];

export const getIsRevoked = () => isRevoked;

export const setIsRevoked = (value: boolean) => {
  isRevoked = value;
  listeners.forEach((listener) => listener(isRevoked));
};

export const subscribeIsRevoked = (listener: Listener): (() => void) => {
  listeners.push(listener);
  // Optionally, call the listener immediately with the current value:
  listener(isRevoked);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};
