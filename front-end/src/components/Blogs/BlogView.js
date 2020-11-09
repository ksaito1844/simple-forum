import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { deleteBlog, likeBlog } from '../../reducers/blogReducer';
import { changeNotification } from '../../reducers/notificationReducer';
import Comments from './Comments';

const BlogView = ({ blog, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const howLongAgo = moment(blog.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow();

  const like = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      _id: blog.id,
    };
    dispatch(likeBlog(likedBlog));
  };

  const remove = () => {
    if (blog.user.id !== user.id) {
      dispatch(
        changeNotification(
          `You are not authorized to delete this post`,
          3000,
          true
        )
      );
      return;
    }

    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      const blogObject = {
        user: blog.user.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        _id: blog.id,
      };
      history.push('/');
      dispatch(deleteBlog(blogObject));
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <br />
      <p>
        Likes: {blog.likes}
        <button onClick={like} type="button">
          like
        </button>
      </p>
      <p>
        added by <Link to={`/users/${blog.user.id}`}>{blog.author}</Link> at{' '}
        {howLongAgo}
      </p>
      <button onClick={remove} type="button">
        delete
      </button>
      <hr />
      <div>
        <h3>{blog.title}</h3>
        <br />
        <p>This is the blog's content.</p>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(BlogView);
