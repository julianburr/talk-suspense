import React, { PureComponent, Fragment } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import api from '../api';

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'user/LOAD':
      setTimeout(() => {
        api.get(`/users/${action.payload.key}`).then((response) => {
          store.dispatch({
            type: 'user/LOADED',
            payload: {
              key: action.payload.key,
              data: response
            }
          });
        });
      }, 0);
      return {
        ...state,
        [action.payload.key]: {
          data: null,
          loading: true
        }
      };

    case 'user/LOADED':
      return {
        ...state,
        [action.payload.key]: {
          data: action.payload.data,
          loading: false
        }
      };

    default:
      return state || {};
  }
};

const store = createStore(combineReducers({ users: usersReducer }));

const App = () => (
  <Provider store={store}>
    <Example />
  </Provider>
);

@connect((state, props) => state.users[props.user])
class Example extends PureComponent {
  componentDidMount () {
    const { user, dispatch } = this.props;
    dispatch({
      type: 'users/LOAD',
      payload: {
        key: user
      }
    });
  }

  render () {
    const { data, loading } = this.props;
    return (
      <Fragment>
        <h1>Example</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>{data.map((item) => <li>{item.name}</li>)}</ul>
        )}
      </Fragment>
    );
  }
}
