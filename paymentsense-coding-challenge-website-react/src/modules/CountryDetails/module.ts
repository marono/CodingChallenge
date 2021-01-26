import { createAction } from '@reduxjs/toolkit';
import * as globalConstants from 'globalConstants';
import { CountryDetails } from 'types/CountryDetails';

const COUNTRY_DETAILS_REQUEST = `${globalConstants.APP_PREFIX}/COUNTRY_DETAILS_REQUEST`;
const COUNTRY_DETAILS_SUCCESS = `${globalConstants.APP_PREFIX}/COUNTRY_DETAILS_SUCCESS`;
const COUNTRY_DETAILS_FAILURE = `${globalConstants.APP_PREFIX}/COUNTRY_DETAILS_FAILURE`

export const actionTypes = {
  COUNTRY_DETAILS_REQUEST,
  COUNTRY_DETAILS_SUCCESS,
  COUNTRY_DETAILS_FAILURE
};

export const actionBuilder = {
  countryDetailsRequest: createAction<string>(COUNTRY_DETAILS_REQUEST),
  countryDetailsSuccess: createAction<CountryDetails>(COUNTRY_DETAILS_SUCCESS),
  countryDetailsFailure: createAction(COUNTRY_DETAILS_FAILURE)
}

export enum countryDetailsRequestStatus {
  COUNTRY_DETAILS_REQUEST_STATUS_NONE = 'COUNTRY_DETAILS_REQUEST_STATUS_NONE',
  COUNTRY_DETAILS_REQUEST_STATUS_INPROGRESS = 'COUNTRY_DETAILS_REQUEST_STATUS_INPROGRESS',
  COUNTRY_DETAILS_REQUEST_STATUS_SUCCEEDED = 'COUNTRY_DETAILS_REQUEST_STATUS_SUCCEEDED',
  COUNTRY_DETAILS_REQUEST_STATUS_FAILED = 'COUNTRY_DETAILS_REQUEST_STATUS_FAILED'
};
