export const exposeWorker = (func) => {
  self.onmessage = async (e) => {
    const r = func(e.data);
    if (r[Symbol.asyncIterator]) {
      for await (const i of r) self.postMessage(i);
    } else if (r[Symbol.iterator]) {
      for (const i of r) self.postMessage(i);
    } else {
      self.postMessage(await r);
    }
  };
};
