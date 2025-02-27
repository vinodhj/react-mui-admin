import { Suspense } from 'react';
import ErrorBoundary from './error-boundary';
import SignIn from './pages/signin';
import LoadingFallback from './components/common/loading-fallback';

function UnAuthenticatedApp() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <SignIn />
      </Suspense>
    </ErrorBoundary>
  );
}

export default UnAuthenticatedApp;
