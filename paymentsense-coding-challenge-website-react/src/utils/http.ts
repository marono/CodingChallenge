import { Observable } from "rxjs";
import * as request from './request';

export const httpGet = (url: string) => new Observable(s => {
  request.get(url).then(
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
