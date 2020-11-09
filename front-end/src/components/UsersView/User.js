import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => (
  <div>
    <p>
      <Link to={`users/${user.id}`}>{user.name}</Link>:{' '}
      <strong>blogs created:</strong> {user.blogs.length}
    </p>
  </div>
);

export default User;
