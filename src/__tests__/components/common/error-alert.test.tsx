import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorAlert from '../../../components/common/error-alert';

describe('ErrorAlert Component', () => {
  test('renders the error alert with the provided message', () => {
    const errorMessage = 'Something went wrong';

    render(<ErrorAlert message={errorMessage} />);

    const alertElement = screen.getByText(`Error: ${errorMessage}`);

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(`Error: ${errorMessage}`);
  });
});
