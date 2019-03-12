export type UseWorker = <Result>(
  workerInfo: string | Worker,
  message: unknown
) => {
  result: Result | null;
  error: 'error' | 'messageerror' | null;
};

export const useWorker: UseWorker;
