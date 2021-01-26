import { Observable, of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { CountryDetails } from "types/CountryDetails";
import { isOfType } from 'typesafe-actions';
import { httpGet } from "utils/http";
import { actionBuilder, actionTypes } from "./module";

export const loadCountryDetails = (action$: Observable<ReturnType<typeof actionBuilder.countryDetailsRequest>>) =>
  action$.pipe(
    filter(isOfType(actionTypes.COUNTRY_DETAILS_REQUEST)),
    mergeMap(({ payload }) => httpGet<CountryDetails>(`/api/countries/${payload}`).pipe(
      map(data =>actionBuilder.countryDetailsSuccess(data)),
      catchError(() => of(actionBuilder.countryDetailsFailure()),
    ))
  ));
