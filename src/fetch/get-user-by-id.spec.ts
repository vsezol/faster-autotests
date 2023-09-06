import { User, getUserById } from './get-user-by-id';

const TEST_ID: number = 777;

const TEST_USER: User = {
  id: TEST_ID,
  name: 'Иван',
};

describe('get-user-by-id', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(TEST_USER),
    });
  });

  it('должен отправлять один запрос с указанным id', async () => {
    await getUserById(TEST_ID);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`my-test-api/user/${TEST_ID}`);
  });
});
