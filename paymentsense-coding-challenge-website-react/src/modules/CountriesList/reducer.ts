import { createReducer } from '@reduxjs/toolkit';
import { Country } from 'types/Country';
import { actionBuilder, countriesRequestStatus } from './module';

const initialState = {
  countries: [] as Country[],
  start: 0,
  end: 0,
  size: 0,
  loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
};

export default createReducer(initialState, builder => builder
  .addCase(actionBuilder.countriesListRequest, state => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_INPROGRESS,
    countries: []
  }))
  .addCase(actionBuilder.countiesListSuccess, (state, { payload: { countries, start, end, size } }) => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_SUCCEEDED,
    countries,
    start,
    end,
    size
  }))
  .addCase(actionBuilder.countriesListFailure, (state) => ({
    ...state,
    loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_FAILED
  }))
);
