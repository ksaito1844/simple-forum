import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { selectPostById } from '../../reducers/postsSlice';
import { blogListStyles } from './BlogListStyles';
import { TimeAgo } from '../common/TimeAgo';

const SingleBlog = ({ blogId }) => {
  const classes = blogListStyles();
  const blog = useSelector((state) => selectPostById(state, blogId));

  return (
    <Link to={`/blogs/${blog.id}`} className={classes.listItem}>
      <Box className={classes.listItemContainer}>
        <Typography variant="body2">
          posted by {blog.author} <TimeAgo timestamp={blog.date} />
        </Typography>

        <Typography variant="h5">{blog.title}</Typography>
      </Box>
    </Link>
  );
};

export default SingleBlog;
