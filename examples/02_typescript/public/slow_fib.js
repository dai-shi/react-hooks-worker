/* eslint-disable no-restricted-globals */

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

self.onmessage = (e) => {
  const count = e.data;
  self.postMessage(fib(count));
};
