export type UseWorker = <Result>(
  url: string,
  message: unknown,
) => {
  result: Result | void;
  error: 'error' | 'messageerror' | void;
};

export const useWorker: UseWorker;
