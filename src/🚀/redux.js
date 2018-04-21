import store from '../store';

export const createFetcher = (method, hash = (i) => i) => {
  return (...args) => {
    if (!store.getState().cache[hash(...args)]) {
      throw method(...args).then((response) => {
        return new Promise((resolve) => {
          store.dispatch({
            type: 'cache/ADD',
            payload: {
              key: hash(...args),
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
    return store.getState().cache[hash(...args)];
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
      break;

    default:
      return {};
  }
};
