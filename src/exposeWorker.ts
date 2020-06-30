/* eslint-disable @typescript-eslint/no-explicit-any */

export function exposeWorker(func: (data: any) => any) {
  self.onmessage = async (e: MessageEvent) => {
    const r = func(e.data);
    if (r[Symbol.asyncIterator]) {
      for await (const i of r) (self.postMessage as any /* FIXME */)(i);
    } else if (r[Symbol.iterator]) {
      for (const i of r) (self.postMessage as any /* FIXME */)(i);
    } else {
      (self.postMessage as any /* FIXME */)(await r);
    }
  };
}
