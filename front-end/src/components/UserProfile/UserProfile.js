import React from 'react';
import SingleBlog from '../Blogs/SingleBlog';

const UserProfile = ({ user }) => {
  const usersBlogs = user ? user.blogs : [];

  return (
    <div>
      <h2>{user.username}</h2>
      <br />
      <hr />
      <div>
        <h4>Information:</h4>
        <br />
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <br />
        <h4>Blog Posts:</h4>
        <br />
        <ul>
          {usersBlogs.length !== 0 
            ? usersBlogs.map((blog) => (
              <li key={blog.id}>
                <SingleBlog blogId={blog.id} />
              </li>
            ))
            : (
              <li>{user.name} doesn't have any blog posts yet.</li>
            )
        }
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
