import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../components/common/loading-spinner';
import '@testing-library/jest-dom';

test('renders LoadingSpinner with CircularProgress', () => {
  render(<LoadingSpinner />);
  // MUI's CircularProgress uses role="progressbar"
  const spinner = screen.getByRole('progressbar');
  expect(spinner).toBeInTheDocument();
});
