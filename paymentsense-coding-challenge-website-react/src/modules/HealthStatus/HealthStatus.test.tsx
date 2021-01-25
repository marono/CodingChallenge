import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'utils/ui-test';
import HealthStatus from './HealthStatus';
import { healthCheckState, actionBuilder } from './module';

describe('<HealthStatus />', () => {
  const wrapState = (state: any) => ({
    health: state
  });

  test('renders healthy status', () => {
    render(<HealthStatus />, {
      initialState: wrapState({ status: healthCheckState.HEALTH_CHECK_STATUS_HEALTHY })
    });
    const statusElement = screen.getByTestId('health-status');

    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('data-icon', 'thumbs-up');
    expect(statusElement).toHaveStyle({ stroke: 'green', color: 'green' });
  });

  test('renders unhealthy status', () => {
    render(<HealthStatus />, {
      initialState: wrapState({ status: healthCheckState.HEALTH_CHECK_STATUS_UNHEALTHY })
    });
    const statusElement = screen.getByTestId('health-status');

    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('data-icon', 'thumbs-down');
    expect(statusElement).toHaveStyle({ stroke: 'red', color: 'red' });
  });

  test('triggers Health check', () => {
    const dispatchHandler = jest.fn();
    render(<HealthStatus />, { dispatch: dispatchHandler });

    expect(dispatchHandler).toHaveBeenCalledTimes(1);
    expect(dispatchHandler).toHaveBeenCalledWith(actionBuilder.requestHealthStatus());
  });
});
