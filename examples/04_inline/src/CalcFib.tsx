import * as React from 'react';

import { useWorker } from 'react-hooks-worker';

const calcFib = (x: number) => {
  const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
  if (x > 40) throw new Error('input too learge (> 40)');
  return fib(x);
};

// we might drop support of this pattern in the future
const blob = new Blob([
  `self.func = ${calcFib.toString()};`,
  'self.onmessage = (e) => {',
  '  const result = self.func(e.data);',
  '  self.postMessage(result);',
  '};',
], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);
const createWorker = () => new Worker(url);

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

export default CalcFib;
