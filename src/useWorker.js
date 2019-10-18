import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const initialState = {};

export const useWorker = (createWorker, input) => {
  const [state, setState] = useState(initialState);
  const worker = useMemo(createWorker, [createWorker]);
  const lastWorker = useRef(null);
  useEffect(() => {
    lastWorker.current = worker;
    let setStateSafe = nextState => setState(nextState);
    worker.onmessage = e => setStateSafe({ result: e.data });
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
    lastWorker.current.postMessage(input);
  }, [input]);
  return state;
};
