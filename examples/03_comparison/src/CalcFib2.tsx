import React from 'react';

const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

const CalcFib2: React.FC<{ count: number }> = ({ count }) => (
  <div>Result: {fib(count)}</div>
);

export default CalcFib2;
