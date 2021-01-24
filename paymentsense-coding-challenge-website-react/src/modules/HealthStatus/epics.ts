import { Observable, of } from "rxjs";
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import * as constants from 'globalConstants';
import { httpGet } from 'utils/http';
import { Action } from '@reduxjs/toolkit';
import { actionBuilder } from './module';

export const healthCheckEpic = (action$: Observable<Action<string>>): Observable<Action<string>> =>
  action$.pipe(
    filter(a => a.type === constants.INIT_ACTION_TYPE),
    mergeMap(() => httpGet('/api/health').pipe(
      map(() => actionBuilder.healthCheckSuccess()),
      catchError(() => of(actionBuilder.healthCheckFailure())),
    ))
  );
