import React, { useState } from 'react';

import CalcFib from './CalcFib';

const App = () => {
  const [count, setCount] = useState(1);
  return (
    <React.StrictMode>
      <div>
        <span>Count: {count}</span>
        <button type="button" onClick={() => setCount(count + 1)}>+1</button>
        <button type="button" onClick={() => setCount(count - 1)}>-1</button>
        <CalcFib count={count} />
      </div>
    </React.StrictMode>
  );
};

export default App;
