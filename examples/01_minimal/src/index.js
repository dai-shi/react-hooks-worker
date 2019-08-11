import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { useWorker } from 'react-hooks-worker';

const worker = new Worker('./slow_fib', { type: 'module' });

const CalcFib = ({ count }) => {
  const { result, error } = useWorker(worker, count);
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
