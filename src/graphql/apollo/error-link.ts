import { onError } from '@apollo/client/link/error';
import { setIsRevoked } from '../auth-events';

/**
 * Creates an Apollo error handling link
 * @returns {ApolloLink} Error handling link
 */
export default function apolloErrorLink() {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        const errorInfo = {
          message,
          location: locations ? JSON.stringify(locations) : undefined,
          path: path ? path.join('.') : undefined,
          code: extensions?.code,
        };

        // Handle revoke token or unauthorized error
        if (extensions?.code === 'REVOKE_TOKEN_ERROR' || extensions?.code === 'UNAUTHORIZED') {
          console.error(`[Authentication Error]: ${JSON.stringify(errorInfo)}`);
          const errorMessage =
            extensions.code === 'REVOKE_TOKEN_ERROR'
              ? 'Revoke token error encountered. Clearing storage and redirecting.'
              : 'Unauthorized access error encountered. Clearing storage and redirecting.';
          console.warn(`⚠️ Warning: ${errorMessage}`);
          cleanupSession();
        } else {
          console.error(`[GraphQL error]: ${JSON.stringify(errorInfo)}`);
        }
      });
    }
    if (networkError) {
      console.error(`[Network error]: `, networkError);
      if (import.meta.env.DEV) {
        const details = {
          statusCode: 'statusCode' in networkError ? networkError.statusCode : undefined,
          message: networkError.message,
          stack: networkError.stack,
          bodyText: 'bodyText' in networkError ? networkError.bodyText : undefined,
        };
        console.error(`[Network error details]: ${JSON.stringify(details)}`);
      }
    }
  });
}

/**
 * Cleans up session data and triggers app-level authentication state changes
 */
const cleanupSession = () => {
  try {
    // Clear both localStorage and sessionStorage for complete cleanup
    sessionStorage.clear();
    localStorage.clear();

    // Update authentication state
    setIsRevoked(true);

    // Log the session cleanup
    console.info('Session cleaned up due to authentication error');
  } catch (error) {
    console.error('Error occurred during session cleanup:', error);
  }
};
