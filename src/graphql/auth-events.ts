import { createState } from '../utils/state-utils';

// --- Revoked State Management ---
const revokedState = createState<boolean>(false);
export const getIsRevoked = revokedState.get;
export const setIsRevoked = revokedState.set;
export const subscribeIsRevoked = revokedState.subscribe;

// --- Logging Out State Management ---
const loggingOutState = createState<boolean>(false);
export const getIsLoggingOut = loggingOutState.get;
export const setIsLoggingOut = loggingOutState.set;
export const subscribeIsLoggingOut = loggingOutState.subscribe;
