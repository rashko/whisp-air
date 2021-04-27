import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/List of stolen bikes in Berlin/i);
  expect(linkElement).toBeInTheDocument();
});
