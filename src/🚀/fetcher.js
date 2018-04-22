/**
 * Very basic custom implementation of suspense cache
 * @param  {any} method - Needs to return a promise or promise like object
 * @param  {Function} hash - Optional function to create a hash from the args
 * @return {Function}
 */
export const createFetcher = (method, hash = (i) => i) => {
  let cache = {};
  return (...args) => {
    if (!cache[hash(...args)]) {
      throw method(...args).then((response) => {
        cache[hash(...args)] = response;
      });
    }
    return cache[hash(...args)];
  };
};
