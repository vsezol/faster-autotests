import { runHealthCheck } from './run-health-check';

describe('run-health-check', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    jest.useFakeTimers();
  });

  it(
    'should send health check request every 5 seconds',
    () => {
      const stopChecking: () => void = runHealthCheck();

      jest.advanceTimersByTime(5000);

      expect(fetch).toBeCalledTimes(1);

      jest.advanceTimersByTime(5000);

      expect(fetch).toBeCalledTimes(2);

      stopChecking();

      jest.advanceTimersByTime(5000);

      expect(fetch).toBeCalledTimes(2);
    },
    15000 + 100
  );
});
