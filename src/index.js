import {
  useEffect,
  useRef,
  useState,
} from 'react';

export const useWorker = (url, message) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const worker = useRef();
  useEffect(() => {
    const w = new Worker(url);
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
  }, [url]);
  useEffect(() => {
    worker.current.postMessage(message);
  }, [message]);
  return { result, error };
};
