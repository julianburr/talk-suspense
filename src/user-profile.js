import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withCache, Placeholder, createResource } from './🚀';
import api from './api';

const getUser = createResource((user) => api.get(`/users/${user}`));

@withCache
class UserProfile extends PureComponent {
  render () {
    const { cache, user } = this.props;
    const userData = getUser.read(cache, user).data;
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
  }
}

const getRepos = createResource((user) => api.get(`/users/${user}/repos`));

@withCache
class RepoList extends PureComponent {
  render () {
    const { cache, user } = this.props;
    const repos = getRepos.read(cache, user).data;
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
  }
}

const getFollowing = createResource((user) =>
  api.get(`/users/${user}/following`)
);

@withCache
class FollowingList extends PureComponent {
  render () {
    const { cache, user } = this.props;
    const following = getFollowing.read(cache, user).data;
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
  }
}

export default UserProfile;
