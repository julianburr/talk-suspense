import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.unstable_AsyncMode>
    <App />
  </React.unstable_AsyncMode>
);
