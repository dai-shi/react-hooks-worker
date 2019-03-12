import { useEffect, useRef, useState } from 'react';

export const useWorker = (workerInfo, message) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const worker = useRef(null);
  useEffect(() => {
    const w = workerInfo instanceof Worker ? workerInfo : new Worker(workerInfo);
    w.onmessage = (e) => {
      setResult(e.data);
      setError(null);
    };
    w.onerror = () => {
      setResult(null);
      setError('error');
    };
    w.onmessageerror = () => {
      setResult(null);
      setError('messageerror');
    };
    worker.current = w;
    const cleanup = () => {
      w.terminate();
    };
    return cleanup;
  }, [workerInfo]);
  useEffect(() => {
    worker.current.postMessage(message);
  }, [message]);
  return { result, error };
};
