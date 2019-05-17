export type UseWorker = <Result>(
  func: Function | string | Worker,
  input: unknown
) => {
  result: Result | null;
  error: 'error' | 'messageerror' | null;
};

export const useWorker: UseWorker;
