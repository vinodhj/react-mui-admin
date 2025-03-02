import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { AuthContext } from './contexts/auth';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo/apollo-client';
import SessionProvider from './contexts/session-context';
import { subscribeIsRevoked } from './graphql/auth-events';
import LoadingFallback from './components/common/loading-fallback';

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnAuthenticatedApp = lazy(() => import('./UnAuthenticatedApp'));
const ErrorApp = lazy(() => import('./ErrorApp'));

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
  }, [UNDER_MAINTENANCE, setRevoked, setAccessToken]);

  const authContextValue = useMemo(() => ({ accessToken, setAccessToken, revoke, setRevoked }), [accessToken, setAccessToken, revoke]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContextValue}>
        <SessionProvider>
          <Suspense fallback={<LoadingFallback />}>
            {(() => {
              if (UNDER_MAINTENANCE) return <ErrorApp message="UNDER_MAINTENANCE" />;
              if (revoke) return <ErrorApp message="REVOKE_ERROR" />;
              if (accessToken) {
                return <AuthenticatedApp />;
              }
              return <UnAuthenticatedApp />;
            })()}
          </Suspense>
        </SessionProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
