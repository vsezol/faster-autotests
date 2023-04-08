import { showPromotionBanner } from "./show-promotion-banner";

const DELAY_MS: number = 15000;
const TEST_TEXT: string = "Hello!";

describe("show-delayed-banner", () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();

    alertSpy = jest.spyOn(window, "alert").mockImplementation();
  });

  it("should call alert after 15 seconds", () => {
    showPromotionBanner("Hello!");

    expect(alertSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(DELAY_MS);

    expect(alertSpy).toHaveBeenCalledWith(TEST_TEXT);
  });
});
