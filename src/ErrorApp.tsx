import { Suspense } from 'react';
import ErrorBoundary from './error-boundary';
import LoadingFallback from './components/common/loading-fallback';
import { CssBaseline, ThemeProvider } from '@mui/material';
import signInTheme from './theme/signIn-theme';
import RevokeError from './pages/revoke';

function ErrorApp({ status }: Readonly<{ status: boolean }>) {
  return (
    <ThemeProvider theme={signInTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <RevokeError isRevoked={status} />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default ErrorApp;
