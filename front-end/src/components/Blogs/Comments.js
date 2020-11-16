import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { addComment } from '../../reducers/blogReducer';
import { changeNotification } from '../../reducers/notificationReducer';

const commentStyles = makeStyles((theme) => ({
  comment: {
    marginLeft: 16,
  },
  author: {
    fontSize: 14,
    '& span': {
      color: theme.palette.grey.main,
    },
  },
}));

const Comments = ({ blog, user }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const classes = commentStyles();

  const createComment = (event, blogId) => {
    event.preventDefault();
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const newComment = { content: comment, user: user.id, createdAt: date };
    dispatch(addComment(newComment, blogId));
    dispatch(changeNotification(`Your comment has been added`, 3000));
  };

  return (
    <div>
      <h3>Comments:</h3>
      <form
        onSubmit={(event) => {
          createComment(event, blog.id);
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
      {blog.comments.map((c, i) => (
        <div
          style={{ borderBottom: '1px solid black', marginBottom: '1em' }}
          key={i}
          className={classes.comment}
        >
          <p className={classes.author}>
            {c.author} <span>{moment(c.createdAt).fromNow()}</span>
          </p>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Comments);
