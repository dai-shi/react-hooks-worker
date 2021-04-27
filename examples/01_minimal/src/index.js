import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { useWorker } from 'react-hooks-worker';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved, import/extensions
import SlowFibWorker from 'worker-loader!./slow_fib.worker';

const createWorker = () => new SlowFibWorker();

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
