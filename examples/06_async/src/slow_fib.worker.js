import { exposeWorker } from 'react-hooks-worker';

const fib = async (i) => {
  await new Promise((r) => {
    setTimeout(r, 10);
  });
  return (i <= 1 ? i : await fib(i - 1) + await fib(i - 2));
};

exposeWorker(fib);
