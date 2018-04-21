import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';

import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.unstable_AsyncMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.unstable_AsyncMode>
);
