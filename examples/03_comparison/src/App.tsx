import * as React from 'react';

import CalcFib from './CalcFib';
import CalcFib2 from './CalcFib2';

const { useEffect, useReducer, useState } = React;

const App = () => {
  const [count, setCount] = useState(35);
  const [mode, toggle] = useReducer(m => (m === 'normal' ? 'worker' : 'normal'), 'worker');
  useEffect(() => {
    const timer = setTimeout(() => {
      if (count % 2) {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }
    }, 200);
    return () => clearTimeout(timer);
  });
  return (
    <React.StrictMode>
      <div style={{ marginTop: 60 }}>
        <button type="button" onClick={toggle}>Toggle Mode</button>
        {mode === 'worker' && (
          <div>
            <h3>Web Worker Mode</h3>
            fib({count})
            <CalcFib count={count} />
          </div>
        )}
        {mode === 'normal' && (
          <div>
            <h3>Normal Mode</h3>
            fib({count})
            <CalcFib2 count={count} />
          </div>
        )}
      </div>
    </React.StrictMode>
  );
};

export default App;
