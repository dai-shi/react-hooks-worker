export type UseWorker = <Result>(
  creaetWorker: () => Worker,
  input: unknown
) => {
  result: Result | null;
  error: 'error' | 'messageerror' | null;
};

export type ExposeWorker = (func: Function) => void;

export const useWorker: UseWorker;
