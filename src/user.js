import React from 'react';
import UserProfile from './user-profile';
import { Placeholder } from './🚀';

const UserScreen = (props) => (
  <Placeholder
    delayMs={1500}
    fallback={<p className="loading loading-user">Loading user...</p>}
  >
    <UserProfile user={props.match.params.user} />
  </Placeholder>
);

export default UserScreen;
