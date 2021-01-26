import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import * as request from './request';

export const httpGet = <T>(url: string, headers?: any) => new Observable<T>(s => {
  request.get<T>(url, headers).then(
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

export const httpGetRaw = (url: string, headers?: any) => new Observable<AxiosResponse<any>>(s => {
  request.sendRaw(url, 'get', undefined, headers).then(
    res => {
      s.next(res);
      s.complete();
    },
    e => {
      s.error(e);
      s.complete();
    }
  );
});
