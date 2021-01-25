import { combineEpics } from 'redux-observable';
import { healthCheckEpic } from 'modules/HealthStatus/epics';
import { loadCountriesEpic } from 'modules/CountriesList/epics';

const epicsFactory = () => combineEpics(
  healthCheckEpic,
  loadCountriesEpic
);

export default epicsFactory;
