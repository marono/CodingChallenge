import React from 'react';
import { screen } from '@testing-library/react';
import { render} from 'utils/ui-test';
import App from './App';

jest.mock('modules/HealthStatus', () => ({
  __esModule: true,
  default: () => <div data-testid="health-status" />
}));
jest.mock('modules/CountriesList', () => ({
  __esModule: true,
  default: () => <div data-testid="countries-list" />
}));

describe('<App />', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Paymentsense Coding Challenge!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders HealthStatus', () => {
    render(<App />);
    const linkElement = screen.getByTestId("health-status");
    expect(linkElement).toBeInTheDocument();
  });

  test('renders CountriesList', () => {
    render(<App />);
    const linkElement = screen.getByTestId("countries-list");
    expect(linkElement).toBeInTheDocument();
  });
});
