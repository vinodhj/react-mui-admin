/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import SessionProvider from './contexts/SessionContext';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ColorModeContext, useMode } from './theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { MyProSidebarProvider } from './contexts/sidebarContext';
import Topbar from './components/Topbar';

const AppRoutes = lazy(() => import('./Routes/AppRoutes'));

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ApolloProvider client={client}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyProSidebarProvider>
            <SessionProvider>
              <Suspense
                fallback={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
              >
                <div style={{ height: '100%', width: '100%' }}>
                  <main>
                    <Topbar />
                    <AppRoutes />
                  </main>
                </div>
              </Suspense>
            </SessionProvider>
          </MyProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
}

export default App;
