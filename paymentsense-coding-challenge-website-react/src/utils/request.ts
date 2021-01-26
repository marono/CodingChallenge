import axios, { AxiosResponse } from 'axios';

const wrapError = (res: AxiosResponse): Error => Error(`Error performing request to ${res.config.url}: ${res.status}`);

export const get = async <T>(url: string, headers?: any): Promise<T> => await send(url, 'get', undefined, headers) as T;

export const send = async (url: string, method: 'get' | 'post', data?: any, headers?: any): Promise<unknown> => {
  let res;
  try {
    res = await axios.request({
      url,
      method,
      headers,
      data
    });

    if(res.status >= 400) {
      throw wrapError(res);
    }

    return res.data;
  }
  catch(e) {
    throw Error(`Error performing request to ${url}: ${e}`);
  }
}

export const sendRaw = async (url: string, method: 'get' | 'post', data?: any, headers?: any): Promise<AxiosResponse<any>> => {
  let res;
  try {
    res = await axios.request({
      url,
      method,
      headers,
      data
    });

    if(res.status >= 400) {
      throw wrapError(res);
    }

    return res;
  }
  catch(e) {
    throw Error(`Error performing request to ${url}: ${e}`);
  }
}
