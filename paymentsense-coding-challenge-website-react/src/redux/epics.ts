import { combineEpics } from 'redux-observable';
import { healthCheckEpic } from 'modules/HealthStatus/epics';

const epicsFactory = () => combineEpics(
  healthCheckEpic
);

export default epicsFactory;
