import fs from 'fs/promises';
import path from 'path';
import { deleteFilesEveryHour } from './delete-files-every-hour';

const flushPromises = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve);
    jest.runOnlyPendingTimers();
  });

describe('delete-files-every-hour', () => {
  const TEST_DIR: string = 'temp';
  const expectedDirPath: string = path.join(__dirname, TEST_DIR);

  let rmSpy: jest.SpyInstance;
  let mkdirSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();

    rmSpy = jest.spyOn(fs, 'rm').mockReturnValue(Promise.resolve());
    mkdirSpy = jest
      .spyOn(fs, 'mkdir')
      .mockReturnValue(Promise.resolve(TEST_DIR));
  });

  it('should delete files in folder every hour', async () => {
    const stopDeleting = deleteFilesEveryHour(TEST_DIR);

    jest.advanceTimersByTime(5 * 60 * 1000);

    expect(rmSpy).not.toHaveBeenCalled();
    expect(mkdirSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(55 * 60 * 1000);

    await flushPromises();

    expect(rmSpy).toHaveBeenCalledWith(
      expectedDirPath,
      expect.objectContaining({ recursive: true })
    );
    expect(mkdirSpy).toHaveBeenCalledWith(expectedDirPath);

    stopDeleting();
  });

  it('should not delete files after stop', async () => {
    const stopDeleting = deleteFilesEveryHour(TEST_DIR);

    jest.setSystemTime(jest.now() + 60 * 60 * 1000);
    await flushPromises();

    stopDeleting();

    rmSpy.mockReset();
    mkdirSpy.mockReset();

    jest.setSystemTime(jest.now() + 60 * 60 * 1000);
    await flushPromises();

    expect(rmSpy).not.toHaveBeenCalled();
    expect(mkdirSpy).not.toHaveBeenCalled();
  });
});
