import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type State<Result> = {
  result?: Result;
  error?: 'error' | 'messageerror';
};

const initialState = {};

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
 * const createWorker = () => new Worker(new URL('./slow_fib.worker', import.meta.url));
 *
 * const CalcFib = ({ count }) => {
 *   const { result, error } = useWorker(createWorker, count);
 *   if (error) return <div>Error: {error}</div>;
 *   return <div>Result: {result}</div>;
 * };
 */
export function useWorker<Input, Result>(createWorker: () => Worker, input: Input) {
  const [state, setState] = useState<State<Result>>(initialState);
  const worker = useMemo(createWorker, [createWorker]);
  const lastWorker = useRef<Worker>(worker);
  useEffect(() => {
    lastWorker.current = worker;
    let setStateSafe = (nextState: State<Result>) => setState(nextState);
    worker.onmessage = (e) => setStateSafe({ result: e.data });
    worker.onerror = () => setStateSafe({ error: 'error' });
    worker.onmessageerror = () => setStateSafe({ error: 'messageerror' });
    const cleanup = () => {
      // eslint-disable-next-line react/function-component-definition
      setStateSafe = () => null; // we should not setState after cleanup.
      worker.terminate();
      setState(initialState);
    };
    return cleanup;
  }, [worker]);
  useEffect(() => {
    lastWorker.current.postMessage(input);
  }, [input]);
  return state;
}
