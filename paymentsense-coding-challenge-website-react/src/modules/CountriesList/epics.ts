import { Observable, of } from "rxjs";
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { AxiosResponse } from "axios";
import { isOfType } from 'typesafe-actions';
import { httpGetRaw } from 'utils/http';
import { actionBuilder, actionTypes } from './module';
import { Country } from "types/Country";

const rangeRegexp = /^items (\d+)-(\d+)\/(\d+)/

export const loadCountriesEpic = (action$: Observable<ReturnType<typeof actionBuilder.countriesListRequest>>) =>
  action$.pipe(
    filter(isOfType(actionTypes.COUNTRIES_LIST_REQUEST)),
    mergeMap(({ payload: { start, end } }) => httpGetRaw('/api/countries', { "Range": `items=${start}-${end}` }).pipe(
      map((response: AxiosResponse<any>) => {
        const m = rangeRegexp.exec(response.headers["content-range"]);
        if(!m) {
          return actionBuilder.countriesListFailure();
        }

        return actionBuilder.countiesListSuccess({
          countries: response.data as Country[],
          start: parseInt(m[1]),
          end: parseInt(m[2]),
          size: parseInt(m[3])
        });
      }),
      catchError(() => of(actionBuilder.countriesListFailure()),
    ))
  ));
