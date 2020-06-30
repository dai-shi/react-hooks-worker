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
export function exposeWorker(func: (data: any) => any) {
  self.onmessage = async (e: MessageEvent) => {
    const r = func(e.data);
    if (r[Symbol.asyncIterator]) {
      for await (const i of r) (self.postMessage as any /* FIXME */)(i);
    } else if (r[Symbol.iterator]) {
      for (const i of r) (self.postMessage as any /* FIXME */)(i);
    } else {
      (self.postMessage as any /* FIXME */)(await r);
    }
  };
}
