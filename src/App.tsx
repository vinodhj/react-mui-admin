import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from './contexts/color-mode-context';
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

function App() {
  const [accessToken, setAccessToken] = useLocalStorage('access_token');
  const [theme, colorMode] = useMode();
  const [revoke, setRevoked] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeIsRevoked((newState) => {
      setRevoked(newState);
    });
    return unsubscribe;
  }, []);

  const authContextValue = useMemo(() => ({ accessToken, setAccessToken, revoke, setRevoked }), [accessToken, setAccessToken, revoke]);

  return (
    <ApolloProvider client={client}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={authContextValue}>
            <CssBaseline />
            <SessionProvider>
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  {(() => {
                    if (revoke) return <RevokeError />;
                    if (accessToken) return <AuthenticatedApp />;
                    return <UnAuthenticatedApp />;
                  })()}
                </Suspense>
              </ErrorBoundary>
            </SessionProvider>
          </AuthContext.Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
}

export default App;
