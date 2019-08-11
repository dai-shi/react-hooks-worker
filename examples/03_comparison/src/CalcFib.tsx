import * as React from 'react';

import { useWorker } from 'react-hooks-worker';

const worker = new Worker('./slow_fib', { type: 'module' });

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(worker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

export default CalcFib;
