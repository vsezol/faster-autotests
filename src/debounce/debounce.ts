type BaseFunction = (...args: unknown[] | []) => unknown;

export function debounce<T extends BaseFunction>(
  callback: T,
  timeout: number
): (...args: Parameters<T>) => void {
  let timerId: number;

  return (...args: Parameters<T>): void => {
    clearTimeout(timerId);

    timerId = window.setTimeout(() => callback(...args), timeout);
  };
}
