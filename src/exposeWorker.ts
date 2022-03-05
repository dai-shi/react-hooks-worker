/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * expose worker
 *
 * You can expose any function that returns:
 * - A value
 * - A promise
 * - An iterable
 * - An async iterable
 *
 * @example
 *
 * import { exposeWorker } from 'react-hooks-worker';
 *
 * const fib = (i) => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
 *
 * exposeWorker(fib);
 */
export function exposeWorker(
  func: (data: any) => any,
  getOptions?: () => WindowPostMessageOptions,
) {
  self.onmessage = async (e: MessageEvent) => {
    const r = func(e.data);
    if (r && r[Symbol.asyncIterator]) {
      for await (const i of r) (self.postMessage)(i, getOptions?.());
    } else if (r && r[Symbol.iterator]) {
      for (const i of r) (self.postMessage)(i, getOptions?.());
    } else {
      (self.postMessage)(await r, getOptions?.());
    }
  };
}
