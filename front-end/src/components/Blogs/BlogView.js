import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { changeNotification } from '../../reducers/notificationReducer';
import Comments from './Comments';
import {
  likePost,
  removePost,
  selectPostById,
} from '../../reducers/postsSlice';

const BlogView = ({ user, match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = match.params.id;
  const blog = useSelector((state) => selectPostById(state, postId));

  const like = () => {
    const likedBlog = {
      _id: blog.id,
      likes: blog.likes,
    };
    dispatch(likePost(likedBlog));
  };

  const remove = async () => {
    if (blog.user.id !== user.id) {
      console.log(user.id);
      console.log(blog);
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
        id: blog.id,
      };
      dispatch(removePost(blogObject));
      history.push('/');
    }
  };

  return (
    <div>
      <span>
        <h1>{blog.title}</h1>
        <p>
          posted by <Link to={`/users/${blog.user.id}`}>{blog.author}</Link> at{' '}
        </p>
      </span>
      <p>{blog.post}</p>
      <br />
      <p>
        Likes: {blog.likes}
        <button onClick={like} type="button">
          like
        </button>
      </p>
      <p />
      <button onClick={remove} type="button">
        delete
      </button>
      <Comments blogId={blog.id} blogComments={blog.comments} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(BlogView);
