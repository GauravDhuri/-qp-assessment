const safePromise = (promise: Promise<unknown>) => promise.then(data => [null, data]).catch(err => ([err]));

export {
  safePromise
}