# react-hooks-worker

[![CI](https://img.shields.io/github/workflow/status/dai-shi/react-hooks-worker/CI)](https://github.com/dai-shi/react-hooks-worker/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/react-hooks-worker)](https://www.npmjs.com/package/react-hooks-worker)
[![size](https://img.shields.io/bundlephobia/minzip/react-hooks-worker)](https://bundlephobia.com/result?p=react-hooks-worker)
[![discord](https://img.shields.io/discord/627656437971288081)](https://discord.gg/MrQdmzd)

React custom hooks for web workers.

## Introduction

Web Workers are another thread from the main thread in browsers.
We can run heavy computation in a separate thread so that
users don't feel slowing down.

React provides a reactive system.
This library hides the async nature of Web Workers with React custom hooks.
Results returned by Web Workers are stored in a React local state.

Developers can implement a worker as:

*   sync function
*   async function
*   sync generator function
*   async generator function

## Install

```bash
npm install react-hooks-worker
```

## Usage

slow_fib.worker.js:

```javascript
import { exposeWorker } from 'react-hooks-worker';

const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

exposeWorker(fib);
```

app.js:

```javascript
import React from 'react';

import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker(
  new URL('./slow_fib.worker', import.meta.url),
  { type: 'module' }
);

const CalcFib = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};

const App = () => (
  <div>
    <CalcFib count={5} />
  </div>
);
```

## Recipes

### Pending status

The communication between main thread and worker thread is not RPC model.
It can be one input to return multiple outputs, or
multiple inputs to get one output.

Handling pending or stale status is left for library users.
Refer [#44](https://github.com/dai-shi/react-hooks-worker/issues/44)
for a recipe for `isStale`.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### exposeWorker

expose worker

You can expose any function that returns:

*   A value
*   A promise
*   An iterable
*   An async iterable

#### Parameters

*   `func` **function (data: any): any** 
*   `getOptions` **function (): WindowPostMessageOptions?** 

#### Examples

```javascript
import { exposeWorker } from 'react-hooks-worker';

const fib = (i) => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

exposeWorker(fib);
```

### useWorker

use worker

The createWorker function should be stable to keep the worker running.
If it's referentially changed, it will create a new worker and terminate the old one.

#### Parameters

*   `createWorker` **function (): [Worker](https://developer.mozilla.org/docs/Web/JavaScript)** 
*   `input` **Input** 
*   `getOptions` **function (): WindowPostMessageOptions?** 

#### Examples

```javascript
import { useWorker } from 'react-hooks-worker';

const createWorker = () => new Worker(
  new URL('./slow_fib.worker', import.meta.url),
  { type: 'module' }
);

const CalcFib = ({ count }) => {
  const { result, error } = useWorker(createWorker, count);
  if (error) return <div>Error: {error}</div>;
  return <div>Result: {result}</div>;
};
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
```

and open <http://localhost:8080> in your web browser.

<!--
You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/03_comparison)
[04](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/04_inline)
[05](https://codesandbox.io/s/github/dai-shi/react-hooks-worker/tree/master/examples/05_generator)
-->

## Blogs

*   [Playing with React Hooks and Web Workers](https://blog.axlight.com/posts/playing-with-react-hooks-and-web-workers/)
*   [How I Developed React Hooks for Web Workers](https://blog.axlight.com/posts/how-i-developed-react-hooks-for-web-workers/)
