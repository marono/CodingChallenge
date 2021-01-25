import { Observable } from "rxjs";
import * as request from './request';

export const httpGet = <T>(url: string) => new Observable<T>(s => {
  request.get<T>(url).then(
    data => {
      s.next(data);
      s.complete();
    },
    e => {
      s.error(e);
      s.complete();
    }
  )
});
