import { showPromotionBanner } from './show-promotion-banner';

const DELAY_MS: number = 15000;
const TEST_TEXT: string = 'Hello!';

describe('show-delayed-banner', () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    alertSpy = jest.spyOn(window, 'alert').mockImplementation();
  });

  it(
    'should call alert after 15 seconds',
    (done: jest.DoneCallback) => {
      showPromotionBanner('Hello!');

      expect(alertSpy).not.toHaveBeenCalled();
      setTimeout(() => {
        expect(alertSpy).toHaveBeenCalledWith(TEST_TEXT);
        done();
      }, DELAY_MS);
    },
    DELAY_MS + 20
  );
});
