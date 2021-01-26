import { RootState } from 'redux/store';
import { createSelector } from 'reselect';
import { countryDetailsRequestStatus } from './module';

const countryDetailsState = (state: RootState) => state.countryDetails;

export const hasLoadedSuccessfully = createSelector(countryDetailsState, state =>
  state.loadStatus === countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_SUCCEEDED);

export const hasLoadFailed = createSelector(countryDetailsState, state =>
  state.loadStatus === countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_FAILED);

  export const selectCountry = createSelector(countryDetailsState,
    state => state.country);
