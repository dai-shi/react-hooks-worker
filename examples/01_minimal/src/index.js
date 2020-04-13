import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker('./slow_fib.worker.js', { type: 'module' });

const CalcFib = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

const App = () => (
  <StrictMode>
    <div>
      <CalcFib count={5} />
    </div>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById('app'));
