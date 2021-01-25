import scheduler from 'utils/rxjs-test';
import * as http from 'utils/http';
import { actionBuilder } from './module';
import { healthCheckEpic } from './epics';

describe('epics', () => {
  it('outputs healthy when API request is succesful', () => {
    scheduler().run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', { a: actionBuilder.requestHealthStatus() });
      jest.spyOn(http, 'httpGet').mockImplementation(() => cold('--a', { a: { } }));

      const output$ = healthCheckEpic(action$);

      expectObservable(output$).toBe('---a', { a: actionBuilder.healthCheckSuccess() });
    });
  });

  it('outputs unhealthy when API request is succesful', () => {
    scheduler().run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', { a: actionBuilder.requestHealthStatus() });
      jest.spyOn(http, 'httpGet').mockImplementation(() => cold('--#'));

      const output$ = healthCheckEpic(action$);

      expectObservable(output$).toBe('---a', { a: actionBuilder.healthCheckFailure() });
    });
  });
})
