import { exposeWorker } from 'react-hooks-worker';

const fib = (i) => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

exposeWorker(fib);
