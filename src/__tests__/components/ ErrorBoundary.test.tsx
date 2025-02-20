// ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../error-boundary';

// A component that deliberately throws an error when rendered.
const ProblemChild = () => {
  throw new Error('Test error');
  // This return won't be reached
  return <div>Error Occurred</div>;
};

describe('ErrorBoundary', () => {
  it('renders fallback UI when an error is thrown', () => {
    // Suppress error logging to avoid polluting test output.
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    // Assert that the fallback UI is rendered.
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please try refreshing the page/i)).toBeInTheDocument();

    // Restore console error after test.
    consoleError.mockRestore();
  });
});
