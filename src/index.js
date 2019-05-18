import {
  useEffect,
  useMemo,
  useRef,
  useReducer,
} from 'react';

const initialState = { result: null, error: null };
const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'result':
      return { result: action.result, error: null };
    case 'error':
      return { result: null, error: 'error' };
    case 'messageerror':
      return { result: null, error: 'messageerror' };
    default:
      throw new Error('no such action type');
  }
};

const createWorker = (func) => {
  if (func instanceof Worker) return func;
  if (typeof func === 'string' && func.endsWith('.js')) return new Worker(func);
  const code = [
    `self.func = ${func.toString()};`,
    'self.onmessage = async (e) => {',
    '  const r = self.func(e.data);',
    '  if (r[Symbol.asyncIterator]) {',
    '    for await (const i of r) self.postMessage(i)',
    '  } else if (r[Symbol.iterator]){',
    '    for (const i of r) self.postMessage(i)',
    '  } else {',
    '    self.postMessage(await r)',
    '  }',
    '};',
  ];
  const blob = new Blob(code, { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
};

export const useWorker = (func, input) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const worker = useMemo(() => createWorker(func), [func]);
  const lastWorker = useRef(null);
  useEffect(() => {
    lastWorker.current = worker;
    let dispatchSafe = action => dispatch(action);
    worker.onmessage = e => dispatchSafe({ type: 'result', result: e.data });
    worker.onerror = () => dispatchSafe({ type: 'error' });
    worker.onmessageerror = () => dispatchSafe({ type: 'messageerror' });
    const cleanup = () => {
      dispatchSafe = () => null; // we should not dispatch after cleanup.
      worker.terminate();
      dispatch({ type: 'init' });
    };
    return cleanup;
  }, [worker]);
  useEffect(() => {
    lastWorker.current.postMessage(input);
  }, [input]);
  return state;
};
