import * as React from 'react';

import { useWorker } from 'react-hooks-worker';

const calcFib = (x: number) => {
  const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
  if (x > 40) throw new Error('input too learge (> 40)');
  return fib(x);
};

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(calcFib, count);
  if (error) return <div>Error:{error}</div>;
  return <div>Result:{result}</div>;
};

export default CalcFib;
