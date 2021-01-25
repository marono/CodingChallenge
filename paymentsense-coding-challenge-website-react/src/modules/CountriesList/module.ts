import { createAction } from '@reduxjs/toolkit';
import * as globalConstants from 'globalConstants';
import { Country } from 'types/Country';

const COUNTRIES_LIST_REQUEST = `${globalConstants.APP_PREFIX}/COUNTRIES_LIST_REQUEST`;
const COUNTRIES_LIST_SUCCESS = `${globalConstants.APP_PREFIX}/COUNTRIES_LIST_SUCCESS`;
const COUNTRIES_LIST_FAILURE = `${globalConstants.APP_PREFIX}/COUNTRIES_LIST_FAILURE`;

export const actionTypes = {
  COUNTRIES_LIST_REQUEST,
  COUNTRIES_LIST_SUCCESS,
  COUNTRIES_LIST_FAILURE
};

export const actionBuilder = ({
  countriesListRequest: createAction(COUNTRIES_LIST_REQUEST),
  countiesListSuccess: createAction<Country[]>(COUNTRIES_LIST_SUCCESS),
  countriesListFailure: createAction(COUNTRIES_LIST_FAILURE),
});

export enum countriesRequestStatus {
  COUNTRIES_REQUEST_STATUS_NONE,
  COUNTRIES_REQUEST_STATUS_INPROGRESS,
  COUNTRIES_REQUEST_STATUS_SUCCEEDED,
  COUNTRIES_REQUEST_STATUS_FAILED
};
