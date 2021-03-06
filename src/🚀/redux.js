import store from '../store';
let i = 0;

export const createFetcher = (method, hash = (i) => i) => {
  let cacheKey = ++i;
  return (...args) => {
    const key = `${cacheKey}--${hash(...args)}`;
    const fromCache = store.getState().cache[key];
    if (!fromCache) {
      throw method(...args).then((response) => {
        return new Promise((resolve) => {
          store.dispatch({
            type: 'cache/ADD',
            payload: {
              key,
              data: response
            }
          });
          // The good ol' Redux workaround to make things async 😅
          // This will ensure that the promise resolves on the next tick,
          // where Redux will have updated the store correctly
          setTimeout(resolve, 0);
        });
      });
    }
    return fromCache;
  };
};

// Reducer for the Redux store
export const cacheReducer = (state, action) => {
  switch (action.type) {
    case 'cache/ADD':
      return {
        ...state,
        [action.payload.key]: action.payload.data
      };

    case 'cache/CLEAR':
      return {
        ...state,
        [action.payload.key]: undefined
      };

    default:
      return {};
  }
};
