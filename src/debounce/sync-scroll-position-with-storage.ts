import { debounce } from './debounce';

const STORAGE_KEY: string = 'SCROLL';

export function syncScrollPositionWithStorage(): VoidFunction {
  const listener: VoidFunction = debounce(saveScrollPosition, 500);
  window.addEventListener('scroll', listener);

  return () => window.removeEventListener('scroll', listener);
}

function saveScrollPosition(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ x: window.scrollX, y: window.scrollY })
  );
}
