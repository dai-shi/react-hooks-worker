export type UseWorker = <Result>(
  func: Function | string | Worker,
  args: unknown
) => {
  result: Result | null;
  error: 'error' | 'messageerror' | null;
};

export const useWorker: UseWorker;
