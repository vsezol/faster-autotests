import { runHealthCheck } from './run-health-check';

const wait = (time: number): Promise<void> =>
  new Promise((resolve: (value: void | PromiseLike<void>) => void) =>
    setTimeout(resolve, time)
  );

describe('run-health-check', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  // it's not good practice
  it(
    'should send health check request every 5 seconds',
    async () => {
      const stopChecking: () => void = runHealthCheck();

      await wait(5000);

      expect(fetch).toBeCalledTimes(1);

      await wait(5000);

      expect(fetch).toBeCalledTimes(2);

      stopChecking();

      await wait(5000);

      expect(fetch).toBeCalledTimes(2);
    },
    15000 + 100
  );
});
