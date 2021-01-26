import * as selectors from './selectors';
import { healthCheckState } from './module';

describe('selectors', () => {
  test.each`
    status                                            | expected
    ${healthCheckState.HEALTH_CHECK_STATUS_HEALTHY}   | ${true}
    ${healthCheckState.HEALTH_CHECK_STATUS_UNHEALTHY} | ${false}
  `('return $expected when status is $status', ({ status, expected }) => {
    expect(selectors.isHealthy({
      health: { status },
      countries: {
        loadStatus: 0,
        countries: [],
        start: 0,
        end: 0,
        size: 0,
      }
    })).toEqual(expected);
  });
});
