import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { httpGet } from 'utils/http';
import { Action } from '@reduxjs/toolkit';
import { actionBuilder, actionTypes } from './module';
import { Country } from "types/Country";

export const loadCountriesEpic = (action$: Observable<Action<string>>): Observable<Action<string>> =>
  action$.pipe(
    ofType(actionTypes.COUNTRIES_LIST_REQUEST),
    mergeMap(() => httpGet<Country[]>('/api/countries').pipe(
      map(data => actionBuilder.countiesListSuccess(data)),
      catchError(() => of(actionBuilder.countriesListFailure()),
    ))
  ));
