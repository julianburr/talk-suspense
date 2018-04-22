import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeScreen from './home';
import UserScreen from './user';

import githubLogo from './🏞/github.svg';
import reduxLogo from './🏞/redux.svg';

@connect((state) => ({ cache: state.cache }))
class App extends PureComponent {
  state = {
    showRedux: false
  };

  render () {
    const { cache, dispatch } = this.props;
    const cacheItems = Object.keys(cache).filter((key) => !!cache[key]);
    return (
      <BrowserRouter>
        <div className="app">
          <div className="logo">
            <Link
              to={`/${process.env.REACT_APP_GITHUB_MY_PROFILE || 'julianburr'}`}
            >
              Github Suspense
            </Link>
            <div className="links">
              <a
                onClick={() =>
                  this.setState({ showRedux: !this.state.showRedux })}
              >
                <img src={reduxLogo} alt="Toggle show Redux cache" />
                {this.state.showRedux && (
                  <div className="redux-panel">
                    {cacheItems.length ? (
                      <ul>
                        {cacheItems.map((key) => (
                          <li>
                            <span>{key}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                dispatch({
                                  type: 'cache/CLEAR',
                                  payload: { key }
                                });
                              }}
                            >
                              Clear
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Nothing in the cache yet!</p>
                    )}
                  </div>
                )}
              </a>
              <a
                href="https://github.com/julianburr/talk-suspense"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={githubLogo} alt="See on github" />
              </a>
            </div>
          </div>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/:user" component={UserScreen} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
