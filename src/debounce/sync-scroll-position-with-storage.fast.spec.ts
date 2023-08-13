import { syncScrollPositionWithStorage } from './sync-scroll-position-with-storage';

const SYNC_DELAY_MS: number = 500;
const STORAGE_KEY: string = 'SCROLL';

describe('sync-scroll-position', () => {
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();

    setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  it('should call setItem with last position with debounce time', () => {
    syncScrollPositionWithStorage();
    setTimeout(() => scrollTo(11, 111), 50);
    setTimeout(() => scrollTo(22, 222), 100);
    setTimeout(() => scrollTo(33, 333), 250);

    // we could use jest.runAllTimers() but we need to test the debounce delay
    jest.advanceTimersByTime(SYNC_DELAY_MS + 250);

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    const [KEY, VALUE]: [string, string] = setItemSpy.mock.calls[0];
    expect(KEY).toBe(STORAGE_KEY);
    expect(JSON.parse(VALUE)).toEqual({
      x: 33,
      y: 333,
    });
  });
});

function scrollTo(x: number, y: number): void {
  window.dispatchEvent(new Event('scroll'));
  window.scrollX = x;
  window.scrollY = y;
}
