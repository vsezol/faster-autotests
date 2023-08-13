import { debounce } from './debounce';

const STORAGE_KEY: string = 'SCROLL';
const DELAY_MS: number = 500;

export function syncScrollPositionWithStorage(): VoidFunction {
  const listener: VoidFunction = debounce(saveScrollPosition, DELAY_MS);
  window.addEventListener('scroll', listener);

  return () => window.removeEventListener('scroll', listener);
}

function saveScrollPosition(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ x: window.scrollX, y: window.scrollY })
  );
}
