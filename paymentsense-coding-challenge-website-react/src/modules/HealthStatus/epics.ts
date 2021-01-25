import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { httpGet } from 'utils/http';
import { Action } from '@reduxjs/toolkit';
import { actionBuilder, actionTypes } from './module';

export const healthCheckEpic = (action$: Observable<Action<string>>): Observable<Action<string>> =>
  action$.pipe(
    ofType(actionTypes.HEALTH_CHECK_REQUEST),
    mergeMap(() => httpGet('/api/health').pipe(
      map(() => actionBuilder.healthCheckSuccess()),
      catchError(() => of(actionBuilder.healthCheckFailure())),
    ))
  );
