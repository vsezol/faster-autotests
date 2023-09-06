import { User } from './get-user-by-id';
import { loadUserById } from './load-user-by-id';

const TEST_ID: number = 777;

const TEST_USER: User = {
  id: TEST_ID,
  name: 'Иван',
};

const flushPromises = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve));

describe('load-user-by-id', () => {
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(TEST_USER),
    });

    setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  it('[very bad] should save user to localStorage', async () => {
    loadUserById(TEST_ID);

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(setItemSpy).toHaveBeenCalledWith(
      'USER_KEY',
      JSON.stringify(TEST_USER)
    );
  });

  it('[bad] should save user to localStorage', async () => {
    loadUserById(TEST_ID);

    await Promise.resolve().then(() => Promise.resolve());

    expect(setItemSpy).toHaveBeenCalledWith(
      'USER_KEY',
      JSON.stringify(TEST_USER)
    );
  });

  it('[also bad] should save user to localStorage', (done: jest.DoneCallback) => {
    loadUserById(TEST_ID);

    setTimeout(() => {
      expect(setItemSpy).toBeCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith(
        'USER_KEY',
        JSON.stringify(TEST_USER)
      );

      done();
    }, 0);
  });

  it('[ok] should save user to localStorage', async () => {
    loadUserById(TEST_ID);

    await flushPromises();

    expect(setItemSpy).toBeCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(
      'USER_KEY',
      JSON.stringify(TEST_USER)
    );
  });
});
