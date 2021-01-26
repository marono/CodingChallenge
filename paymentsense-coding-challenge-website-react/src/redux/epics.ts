import { combineEpics } from 'redux-observable';
import { healthCheckEpic } from 'modules/HealthStatus/epics';
import { loadCountriesEpic } from 'modules/CountriesList/epics';
import { loadCountryDetails } from 'modules/CountryDetails/epics';

const epicsFactory = () => combineEpics(
  healthCheckEpic,
  loadCountriesEpic,
  loadCountryDetails
);

export default epicsFactory;
