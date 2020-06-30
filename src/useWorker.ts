import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type State = {
  result?: unknown;
  error?: 'error' | 'messageerror';
};

const initialState: State = {};

/**
 * use worker
 *
 * The createWorker function should be stable to keep the worker running.
 * If it's referentially changed, it will create a new worker and terminate the old one.
 *
 * @example
 *
 * import { useWorker } from 'react-hooks-worker';
 *
 * const createWorker = () => new Worker('./slow_fib.worker', { type: 'module' });
 *
 * const CalcFib = ({ count }) => {
 *   const { result, error } = useWorker(createWorker, count);
 *   if (error) return <div>Error: {error}</div>;
 *   return <div>Result: {result}</div>;
 * };
 */
export function useWorker(createWorker: () => Worker, input: unknown) {
  const [state, setState] = useState<State>(initialState);
  const worker = useMemo(createWorker, [createWorker]);
  const lastWorker = useRef<Worker>();
  useEffect(() => {
    lastWorker.current = worker;
    let setStateSafe = (nextState: State) => setState(nextState);
    worker.onmessage = (e) => setStateSafe({ result: e.data });
    worker.onerror = () => setStateSafe({ error: 'error' });
    worker.onmessageerror = () => setStateSafe({ error: 'messageerror' });
    const cleanup = () => {
      setStateSafe = () => null; // we should not setState after cleanup.
      worker.terminate();
      setState(initialState);
    };
    return cleanup;
  }, [worker]);
  useEffect(() => {
    if (lastWorker.current) {
      lastWorker.current.postMessage(input);
    }
  }, [input]);
  return state;
}
