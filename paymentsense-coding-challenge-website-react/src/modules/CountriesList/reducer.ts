import { createReducer } from '@reduxjs/toolkit';
import { Country } from 'types/Country';
import { actionBuilder, countriesRequestStatus } from './module';

const initialState = {
  countries: [] as Country[],
  loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
};

export default createReducer(initialState, builder => builder
  .addCase(actionBuilder.countriesListRequest, state => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_INPROGRESS,
    countries: []
  }))
  .addCase(actionBuilder.countiesListSuccess, (state, { payload }) => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_SUCCEEDED,
    countries: payload
  }))
  .addCase(actionBuilder.countriesListFailure, (state) => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_FAILED
  }))
);
