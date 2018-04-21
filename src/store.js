import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { cacheReducer as cache } from './🚀';

const initialState = {};

// Setup for redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ cache }),
  initialState,
  composeEnhancers()
);

export default store;
