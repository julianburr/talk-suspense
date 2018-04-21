import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import fakeData from './💽/fake-data.json';

const UserProfile = ({ user }) => {
  const userData = fakeData.users[user];
  return (
    <Fragment>
      <header>
        <img src={userData.avatar_url} alt={userData.name} />
        <div className="title">
          <h1>{userData.name}</h1>
          <p className="meta">
            @{userData.login} - 🗺{userData.location}
          </p>
        </div>
      </header>

      <main>
        <section>
          <h2>Following</h2>
          <FollowingList user={user} />
        </section>

        <section>
          <h2>Repos</h2>
          <RepoList user={user} />
        </section>
      </main>
    </Fragment>
  );
};

const RepoList = ({ user }) => {
  const repos = fakeData.users[user].repos;
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.name}>
          <span>
            {repo.name}
            <span className="meta">{repo.stargazers_count}🌟</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

const FollowingList = ({ user }) => {
  const following = fakeData.users[user].following;
  return (
    <ul>
      {following.map((user) => (
        <li key={user.login}>
          <Link to={`/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <span>{user.login}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserProfile;
