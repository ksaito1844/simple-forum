import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { selectCommentById } from '../../reducers/commentsSlice';
import { TimeAgo } from '../common/TimeAgo';

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

const SingleComment = ({ commentId }) => {
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const classes = commentStyles();
  return (
    <div
      style={{ borderBottom: '1px solid black', marginBottom: '1em' }}
      className={classes.comment}
    >
      <p className={classes.author}>
        {comment.author} <TimeAgo timestamp={comment.date} />
      </p>
      <p>{comment.content}</p>
    </div>
  );
};

export default SingleComment;
