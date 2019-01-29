import * as React from 'react';

import { useWorker } from 'react-hooks-worker';

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker('./slow_fib.js', count);
  if (error) return <div>Error:{error}</div>;
  return <div>Result:{result}</div>;
};

export default CalcFib;
