import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('modules/HealthStatus', () => "div");

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paymentsense Coding Challenge!/i);
  expect(linkElement).toBeInTheDocument();
});
