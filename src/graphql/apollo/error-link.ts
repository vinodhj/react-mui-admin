import { onError } from '@apollo/client/link/error';
import { getIsLoggingOut, setIsRevoked } from '../auth-events';
import { ENV } from './apollo-client';
import { ApolloLink } from '@apollo/client';

/**
 * Creates an Apollo error handling link
 * @returns {ApolloLink} Error handling link
 */
export default function apolloErrorLink(): ApolloLink {
  return onError(({ graphQLErrors, networkError }) => {
    // Handle GraphQL errors
    if (graphQLErrors) {
      handleGraphQLErrors(graphQLErrors);
    }

    // Handle network errors
    if (networkError) {
      handleNetworkError(networkError);
    }
  });
}

/**
 * Handle GraphQL errors
 */
function handleGraphQLErrors(graphQLErrors: readonly any[]): void {
  graphQLErrors.forEach(({ message, locations, path, extensions }) => {
    const errorInfo = {
      message,
      location: locations ? JSON.stringify(locations) : undefined,
      path: path ? path.join('.') : undefined,
      code: extensions?.code,
    };

    // Handle revoke token or unauthorized error
    if (extensions?.code === 'REVOKE_TOKEN_ERROR' || extensions?.code === 'UNAUTHORIZED') {
      handleAuthError(extensions.code, errorInfo);
    } else {
      console.error(`[GraphQL error]: ${JSON.stringify(errorInfo)}`);
    }
  });
}

/**
 * Handle authentication errors
 */
function handleAuthError(code: string, errorInfo: any): void {
  if (code === 'UNAUTHORIZED' && getIsLoggingOut()) {
    console.info('Ignoring unauthorized error during logout process');
    return;
  }

  console.error(`[Authentication Error]: ${JSON.stringify(errorInfo)}`);
  const errorMessage =
    code === 'REVOKE_TOKEN_ERROR'
      ? 'Revoke token error encountered. Clearing storage and redirecting.'
      : 'Unauthorized access error encountered. Clearing storage and redirecting.';

  console.warn(`⚠️ Warning: ${errorMessage}`);
  cleanupSession();
}

/**
 * Handle network errors
 */
function handleNetworkError(networkError: any): void {
  console.error(`[Network error]: `, networkError);

  // Handle 429 rate limit errors
  if ('statusCode' in networkError && networkError.statusCode === 429) {
    console.error(`[Rate Limit Error]: Too many requests. Please try again later.`);
  }

  // Try to parse the error response if it exists
  handleNetworkErrorBody(networkError);

  // Log detailed info in dev environment
  logDevNetworkErrorDetails(networkError);
}

/**
 * Handle network error body parsing
 */
function handleNetworkErrorBody(networkError: any): void {
  if (!('bodyText' in networkError) || !networkError.bodyText) {
    return;
  }

  try {
    const parsedBody = JSON.parse(networkError.bodyText);

    // Handle parsed errors array
    if (parsedBody.errors && Array.isArray(parsedBody.errors)) {
      parsedBody.errors.forEach((error: any) => {
        console.error(`[GraphQL error from network response]: ${error.message}`);

        // Handle rate limit errors specifically
        if (error.extensions?.code === 'RATE_LIMIT_EXCEEDED' || error.extensions?.code === 'DOWNSTREAM_SERVICE_ERROR') {
          console.error(`[Rate Limit Error]: ${error.message}`);
        }
      });
    }

    // Handle rate limit extension code
    if (parsedBody.extensions?.code === 'RATE_LIMIT_EXCEEDED') {
      console.error(`[Rate Limit Error]: Rate limit exceeded`);
    }
  } catch (e) {
    console.error(`Failed to parse error response: ${e}`);
  }
}

/**
 * Log detailed network error info in dev environment
 */
function logDevNetworkErrorDetails(networkError: any): void {
  if (ENV.isDev) {
    const details = {
      statusCode: 'statusCode' in networkError ? networkError.statusCode : undefined,
      message: networkError.message,
      stack: networkError.stack,
      bodyText: 'bodyText' in networkError ? networkError.bodyText : undefined,
    };
    console.error(`[Network error details]: ${JSON.stringify(details)}`);
  }
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
