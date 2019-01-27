/* eslint-env jest */

// import React from 'react';
// import { configure, mount } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import Adapter from 'enzyme-adapter-react-16';

import { useWorker } from '../src/index';

// configure({ adapter: new Adapter() });

describe('basic spec', () => {
  it('should have a function', () => {
    expect(useWorker).toBeDefined();
  });

  it.skip('should create a component', () => {
    // TODO
  });
});
