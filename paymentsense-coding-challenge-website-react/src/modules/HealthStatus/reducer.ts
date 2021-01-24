import { createReducer } from '@reduxjs/toolkit';
import { healthCheckState, actionBuilder } from './module';

const initialState = {
  status: healthCheckState.HEALTH_CHECK_STATUS_UNHEALTHY
};

export default createReducer(initialState, builder =>
  builder
    .addCase(actionBuilder.healthCheckSuccess, state => ({
      ...state,
      status: healthCheckState.HEALTH_CHECK_STATUS_HEALTHY
    }))
    .addCase(actionBuilder.healthCheckFailure, state => ({
      ...state,
      status: healthCheckState.HEALTH_CHECK_STATUS_UNHEALTHY
    }))
);
