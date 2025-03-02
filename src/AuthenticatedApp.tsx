import { lazy, Suspense } from 'react';
import ErrorBoundary from './error-boundary';
import LoadingFallback from './components/common/loading-fallback';
import { ColorModeContext, useMode } from './contexts/color-mode-context';
import { CssBaseline, ThemeProvider } from '@mui/material';

const AppRoutes = lazy(() => import('./routes/app-routes'));

function AuthenticatedApp() {
  const [appTheme, colorMode] = useMode();
  return (
    <ThemeProvider theme={appTheme}>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}

export default AuthenticatedApp;
