import React from 'react';

import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker('./slow_fib.worker', { type: 'module' });

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

export default CalcFib;
