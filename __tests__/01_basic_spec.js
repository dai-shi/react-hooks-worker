import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { useWorker } from '../src/index';

global.Worker = jest.fn();

describe('basic spec', () => {
  it('should have a function', () => {
    expect(useWorker).toBeDefined();
  });

  it('should create a component', () => {
    const createWorker = () => new Worker('./slow_fib');
    const CalcFib = ({ count }) => {
      const { result, error } = useWorker(createWorker, count);
      if (error) return <div>Error: {error}</div>;
      return <div>Result: {result}</div>;
    };
    const renderer = new ShallowRenderer();
    renderer.render(<CalcFib count={5} />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
