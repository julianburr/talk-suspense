import React from 'react';
import UserProfile from './user-profile';

const UserScreen = (props) => <UserProfile user={props.match.params.user} />;

export default UserScreen;
