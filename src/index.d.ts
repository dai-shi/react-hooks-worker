export type UseWorker = <Result>(
  url: string,
  message: unknown,
) => {
  result: Result | null;
  error: 'error' | 'messageerror' | null;
};

export const useWorker: UseWorker;
