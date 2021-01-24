import React from 'react';
import { render, screen } from '@testing-library/react';
import HealthStatus from './HealthStatus';

describe('<HealthStatus />', () => {
  test('renders health status', () => {
    render(<HealthStatus />);
    const linkElement = screen.getByTestId('health-status');

    expect(linkElement).toBeInTheDocument();
  });
});
