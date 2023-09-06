import fs from 'fs/promises';
import path from 'path';

export function deleteFilesEveryHour(dir: string): () => void {
  const dirPath: string = path.join(__dirname, dir);

  return doEveryHour(() => {
    deleteFiles(dirPath);
  });
}

const MS_IN_HOUR: number = 60 * 60 * 1000;

function doEveryHour(callback: () => void): () => void {
  let startTime: number = Date.now();

  const intervalId: NodeJS.Timer = setInterval(() => {
    const timeDiff: number = Date.now() - startTime;

    if (timeDiff - MS_IN_HOUR >= 0) {
      callback();
      startTime = Date.now();
    }
  }, 10000);

  return () => clearInterval(intervalId);
}

async function deleteFiles(dirPath: string): Promise<void> {
  await fs.rm(dirPath, { recursive: true });
  await fs.mkdir(dirPath);
}
