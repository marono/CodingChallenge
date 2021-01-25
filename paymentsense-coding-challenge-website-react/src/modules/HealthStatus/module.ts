import { createAction } from '@reduxjs/toolkit';
import * as constants from 'globalConstants';

const HEALTH_CHECK_REQUEST = `${constants.APP_PREFIX}/HEALTH_CHECK_REQUEST`;
const HEALTH_CHECK_SUCCESS = `${constants.APP_PREFIX}/HEALTH_CHECK_SUCCESS`;
const HEALTH_CHECK_FAILURE = `${constants.APP_PREFIX}/HEALTH_CHECK_FAILED`;

const HEALTH_CHECK_STATUS_HEALTHY = `${constants.APP_PREFIX}/HEALTH_CHECK_STATUS_HEALTHY`;
const HEALTH_CHECK_STATUS_UNHEALTHY = `${constants.APP_PREFIX}/HEALTH_CHECK_STATUS_UNHEALTHY`;

export const healthCheckState = {
  HEALTH_CHECK_STATUS_HEALTHY,
  HEALTH_CHECK_STATUS_UNHEALTHY
};

export const actionTypes = {
  HEALTH_CHECK_REQUEST,
  HEALTH_CHECK_SUCCESS,
  HEALTH_CHECK_FAILURE
};

export const actionBuilder = ({
  requestHealthStatus: createAction(HEALTH_CHECK_REQUEST),
  healthCheckFailure: createAction(HEALTH_CHECK_FAILURE),
  healthCheckSuccess: createAction(HEALTH_CHECK_SUCCESS)
});
