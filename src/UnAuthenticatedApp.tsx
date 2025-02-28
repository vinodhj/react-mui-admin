import { Suspense } from 'react';
import ErrorBoundary from './error-boundary';
import SignIn from './pages/signin';
import LoadingFallback from './components/common/loading-fallback';
import { CssBaseline, ThemeProvider } from '@mui/material';
import signInTheme from './theme/signIn-theme';

function UnAuthenticatedApp() {
  return (
    <ThemeProvider theme={signInTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <SignIn />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default UnAuthenticatedApp;
