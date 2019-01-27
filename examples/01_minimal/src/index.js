import React from 'react';
import ReactDOM from 'react-dom';

import { useWorker } from 'react-hooks-worker';

const CalcFib = ({ count }) => {
  const { result, error } = useWorker('./slow_fib.js', count);
  if (error) return <div>Error:{error}</div>;
  return <div>Result:{result}</div>;
};

const App = () => (
  <div>
    <CalcFib count={5} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
