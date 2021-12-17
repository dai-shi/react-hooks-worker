import { exposeWorker } from 'react-hooks-worker';

async function* fib(x) {
  let x1 = 0;
  let x2 = 1;
  let i = 0;
  while (i < x) {
    yield `(calculating...) ${x1}`;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => {
      setTimeout(r, 100);
    });
    [x1, x2] = [x2, x1 + x2];
    i += 1;
  }
  yield x1;
}

exposeWorker(fib);
