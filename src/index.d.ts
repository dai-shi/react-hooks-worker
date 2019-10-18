export type UseWorker = <Result>(
  creaetWorker: () => Worker,
  input: unknown
) => {
  result?: Result;
  error?: 'error' | 'messageerror';
};

export type ExposeWorker = (func: Function) => void;

export const useWorker: UseWorker;
export const exposeWorker: ExposeWorker;
