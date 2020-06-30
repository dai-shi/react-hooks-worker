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
