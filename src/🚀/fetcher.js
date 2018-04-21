/**
 * Custom fetcher for suspense feature
 * @param  {any} method - Method that returns a promise or promise like object
 * @param  {Function} hash - Method that creates a hash for the cache from the args
 * @return {Function}
 */
export default (method, hash = (i) => i) => {
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
