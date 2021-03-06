import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Placeholder, createFetcher } from './🚀';

const getUser = createFetcher((user) => api.get(`/users/${user}`));
const UserProfile = ({ user }) => {
  const userData = getUser(user).data;
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
          <Placeholder
            delayMs={500}
            fallback={<p className="loading">Loading users...</p>}
          >
            <FollowingList user={user} />
          </Placeholder>
        </section>

        <section>
          <h2>Repos</h2>
          <Placeholder
            delayMs={500}
            fallback={<p className="loading">Loading repos...</p>}
          >
            <RepoList user={user} />
          </Placeholder>
        </section>
      </main>
    </Fragment>
  );
};

const getRepos = createFetcher((user) => api.get(`/users/${user}/repos`));
const RepoList = ({ user }) => {
  const repos = getRepos(user).data;
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

const getFollowing = createFetcher((user) =>
  api.get(`/users/${user}/following`)
);
const FollowingList = ({ user }) => {
  const following = getFollowing(user).data;
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
