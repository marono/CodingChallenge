import { createReducer } from '@reduxjs/toolkit';
import { CountryDetails } from 'types/CountryDetails';
import { countryDetailsRequestStatus, actionBuilder } from './module';

const initialState: { country: CountryDetails | undefined; loadStatus: countryDetailsRequestStatus } = {
  country: undefined,
  loadStatus: countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_NONE
};

export default createReducer(initialState, builder => builder
  .addCase(actionBuilder.countryDetailsRequest, state => ({
    ...state,
    loadStatus: countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_INPROGRESS,
    country: undefined,
  }))
  .addCase(actionBuilder.countryDetailsSuccess, (state, {payload: country}) => ({
    ...state,
    country,
    loadStatus: countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_SUCCEEDED
  }))
  .addCase(actionBuilder.countryDetailsFailure, state => ({
    ...state,
    loadStatus: countryDetailsRequestStatus.COUNTRY_DETAILS_REQUEST_STATUS_FAILED
  }))
);

