import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './home';
import UserScreen from './user';

import logo from './🏞/github.svg';

const App = (props) => (
  <BrowserRouter>
    <div className="app">
      <div className="logo">
        <Link
          to={`/${process.env.REACT_APP_GITHUB_MY_PROFILE || 'julianburr'}`}
        >
          Github Suspense
        </Link>
        <a
          href="https://github.com/julianburr/talk-suspense"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="See on github" />
        </a>
      </div>
      <Route exact path="/" component={HomeScreen} />
      <Route path="/:user" component={UserScreen} />
    </div>
  </BrowserRouter>
);

export default App;
