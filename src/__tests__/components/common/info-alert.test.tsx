import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoAlert from '../../../components/common/info-alert';

describe('InfoAlert Component', () => {
  test('renders the alert with the provided message', () => {
    const message = 'This is an info alert';

    render(<InfoAlert message={message} />);

    const alertElement = screen.getByText(message);

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);
  });
});
