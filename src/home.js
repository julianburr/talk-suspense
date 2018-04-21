import React from 'react';
import { Redirect } from 'react-router-dom';

const HomeScreen = () => (
  <Redirect
    to={`/${process.env.REACT_APP_MY_GITHUB_PROFILE || 'julianburr'}`}
  />
);

export default HomeScreen;
