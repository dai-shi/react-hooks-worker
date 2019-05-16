import {
  useEffect,
  useMemo,
  useRef,
  useState,
  unstable_batchedUpdates,
} from 'react';

const batchedUpdates = (callback) => {
  if (unstable_batchedUpdates) {
    unstable_batchedUpdates(callback);
  } else {
    callback();
  }
};

const createWorker = (func) => {
  if (func instanceof Worker) return func;
  if (typeof func === 'string' && func.endsWith('.js')) return new Worker(func);
  const code = [
    `self.func = ${func.toString()};`,
    'self.onmessage = async (e) => {',
    '  const r = self.func(...e.data);',
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

export const useWorker = (func, args) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const worker = useMemo(() => createWorker(func), [func]);
  const lastWorker = useRef(null);
  useEffect(() => {
    lastWorker.current = worker;
    worker.onmessage = (e) => {
      if (lastWorker.current !== worker) return;
      batchedUpdates(() => {
        setResult(e.data);
        setError(null);
      });
    };
    worker.onerror = () => {
      if (lastWorker.current !== worker) return;
      batchedUpdates(() => {
        setResult(null);
        setError('error');
      });
    };
    worker.onmessageerror = () => {
      if (lastWorker.current !== worker) return;
      batchedUpdates(() => {
        setResult(null);
        setError('messageerror');
      });
    };
    const cleanup = () => {
      worker.terminate();
    };
    return cleanup;
  }, [worker]);
  useEffect(() => {
    const message = Array.isArray(args) ? args : [args];
    lastWorker.current.postMessage(message);
  }, [args]);
  return { result, error };
};
