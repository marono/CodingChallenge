import axios, { AxiosResponse } from 'axios';

const wrapError = (res: AxiosResponse): Error => Error(`Error performing request to ${res.config.url}: ${res.status}`);

export const get = async <T>(url: string): Promise<T> => await send(url, 'get') as T;

export const send = async (url: string, method: 'get' | 'post', data?: any): Promise<unknown> => {
  let res;
  try {
    res = await axios.request({
      url,
      method,
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
