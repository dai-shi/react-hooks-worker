import * as React from 'react';

import { useWorker } from 'react-hooks-worker';

const calcFib = `
  async function* (x) {
    let x1 = 0;
    let x2 = 1;
    let i = 0;
    while (i < x) {
      yield '(calculating...) ' + x1;
      await new Promise(r => setTimeout(r, 100));
      [x1, x2] = [x2, x1 + x2];
      i += 1;
    }
    yield x1;
  }
`;

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(calcFib, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

export default CalcFib;
