import { createSelector } from 'reselect';
import { RootState } from 'redux/store';
import { healthCheckState } from './module';

const healthState = (state: RootState) => state.health;

export const isHealthy = createSelector(healthState, state => {
  return state.status === healthCheckState.HEALTH_CHECK_STATUS_HEALTHY;
});
