# react-hooks-worker

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-worker.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-worker)
[![npm version](https://badge.fury.io/js/react-hooks-worker.svg)](https://badge.fury.io/js/react-hooks-worker)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-worker)](https://bundlephobia.com/result?p=react-hooks-worker)

React custom hooks for web workers.

## Motivation

React Hooks API is promising.
Web Workers API is promising.

This library is still experimental.
Feedbacks are welcome.

## Install

```bash
npm install react-hooks-worker
```

## Usage

slow_fib.js:
```javascript
import { exposeWorker } from 'react-hooks-worker';

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

exposeWorker(fib);
```

app.js:
```javascript
import React from 'react';

import { useWorker } from 'react-hooks-worker';

const worker = new Worker('./slow_fib', { type: 'module' });

const CalcFib = ({ count }) => {
  const { result, error } = useWorker(worker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

const App = () => (
  <div>
    <CalcFib count={5} />
  </div>
);
```

## Bundler support requirements

This library requires a bundler to recognize Web Worker properly.
Not everything is tested, and we appreciate for your help.

### Webpack

Use either libraries:

- [worker-plugin](https://github.com/GoogleChromeLabs/worker-plugin)
- [worker-loader](https://github.com/webpack-contrib/worker-loader)

### Parcel

Parcel allow your Web Worker script to be automatically bundled.

### Rollup

- [rollup-plugin-web-worker-loader](https://github.com/darionco/rollup-plugin-web-worker-loader)

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/03_comparison)
[04](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/04_inline)
[05](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/05_generator)

## Blogs

- [Playing with React Hooks and Web Workers](https://blog.axlight.com/posts/playing-with-react-hooks-and-web-workers/)
