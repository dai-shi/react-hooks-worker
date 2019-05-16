# react-hooks-worker

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-worker.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-worker)
[![npm version](https://badge.fury.io/js/react-hooks-worker.svg)](https://badge.fury.io/js/react-hooks-worker)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-worker)](https://bundlephobia.com/result?p=react-hooks-worker)

React custom hooks for web workers.

## Motivation

React Hooks API is promising.
Web Workers API is promising.

This is an experimental library to provide an easy
way to call web workers.
It's more or less for fun,
but feedbacks are welcome to make this for production.

## Install

```bash
npm install react-hooks-worker
```

## Usage

```javascript
import React from 'react';

import { useWorker } from 'react-hooks-worker';

const calcFib = (x) => {
  const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
  return fib(x);
};

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const { result, error } = useWorker(calcFib, count);
  if (error) return <div>Error:{error}</div>;
  return <div>Result:{result}</div>;
};

const App = () => (
  <div>
    <CalcFib count={5} />
  </div>
);
```

## Usage with Parcel

Parcel allow your Web Worker script to be automatically bundled. To do this, just pass an instance of the Web Worker instead of the url:

```javascript
const myWorker = new Worker("./slow_fib.js")

const { result, error } = useWorker(myWorker, count);
```

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

- [Playing with React Hooks and Web Workers](https://medium.com/@dai_shi/playing-with-react-hooks-and-web-workers-2ebdf1c93dea)
