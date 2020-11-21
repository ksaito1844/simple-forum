import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeNotification } from '../../reducers/notificationReducer';
import {
  addComment,
  fetchComments,
  selectCommentsByPost,
} from '../../reducers/commentsSlice';
import SingleComment from './SingleComment';

const Comments = ({ blogId, blogComments, user }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(blogId));
  }, [blogId, dispatch]);

  const comments = useSelector((state) =>
    selectCommentsByPost(state, blogComments)
  );

  const createComment = (event, postId) => {
    event.preventDefault();
    const newComment = { content: comment, user: user.id };
    dispatch(addComment({ postId, newComment }));
    dispatch(changeNotification(`Your comment has been added`, 3000));
    setComment('');
  };

  return (
    <div>
      <h3>Comments:</h3>
      <form
        onSubmit={(event) => {
          createComment(event, blogId);
        }}
      >
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <hr />
      {comments && comments.map((c) => <SingleComment key={c} commentId={c} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Comments);
