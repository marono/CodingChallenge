import { createSelector } from 'reselect';
import { RootState } from "redux/store";
import { countriesRequestStatus } from './module';

const countriesState = (state: RootState) => state.countries;

export const selectCountries = createSelector(countriesState, state => state.countries || []);

export const haveCountriesLoadedSucceesfully = createSelector(countriesState, state => state.loadStatus === countriesRequestStatus.COUNTRIES_REQUEST_STATUS_SUCCEEDED);

export const hasCountriesLoadFailed = createSelector(countriesState, state => state.loadStatus === countriesRequestStatus.COUNTRIES_REQUEST_STATUS_FAILED);

export const selectPager = createSelector(countriesState, state => ({
  start: state.start,
  end: state.end,
  size: state.size
}));
