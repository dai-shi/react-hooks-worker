import React from 'react';

import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker(
  new URL('./slow_fib.worker', import.meta.url),
  { type: 'module' },
);

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

export default CalcFib;
