import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import ErrorBoundary from './error-boundary';
import useLocalStorage from 'react-use-localstorage';
import { AuthContext } from './contexts/auth';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo-client';
import SessionProvider from './contexts/session-context';
import { subscribeIsRevoked } from './graphql/authEvents';
import LoadingFallback from './components/common/loading-fallback';

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnAuthenticatedApp = lazy(() => import('./UnAuthenticatedApp'));
const RevokeError = lazy(() => import('./pages/revoke'));

const UNDER_MAINTENANCE = false;

function App() {
  const [accessToken, setAccessToken] = useLocalStorage('access_token');
  const [revoke, setRevoked] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = subscribeIsRevoked((newState) => {
      setRevoked(newState);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (UNDER_MAINTENANCE) {
      setRevoked(false);
      setAccessToken('');
      localStorage.clear();
    }
  }, []);

  const authContextValue = useMemo(() => ({ accessToken, setAccessToken, revoke, setRevoked }), [accessToken, setAccessToken, revoke]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContextValue}>
        <SessionProvider>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              {(() => {
                if (UNDER_MAINTENANCE) return <RevokeError isRevoked={false} />;
                if (revoke) return <RevokeError isRevoked={revoke} />;
                if (accessToken) {
                  return <AuthenticatedApp />;
                }
                return <UnAuthenticatedApp />;
              })()}
            </Suspense>
          </ErrorBoundary>
        </SessionProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
