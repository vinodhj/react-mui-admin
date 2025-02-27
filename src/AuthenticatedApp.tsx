import { lazy, Suspense } from 'react';
import ErrorBoundary from './error-boundary';
import LoadingFallback from './components/common/loading-fallback';

const AppRoutes = lazy(() => import('./routes/app-routes'));

function AuthenticatedApp() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}

export default AuthenticatedApp;
