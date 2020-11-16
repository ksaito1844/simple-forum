import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { blogListStyles } from './BlogListStyles';
import {
  sortItemsByComments,
  sortItemsByLikes,
  sortItemsDefault,
} from '../../utils/sortItems';
import { SortBar } from '../common/SortBar/SortBar';

export const Blog = ({ blog }) => {
  const classes = blogListStyles();

  return (
    <Link to={`/blogs/${blog.id}`} className={classes.listItem}>
      <Box className={classes.listItemContainer}>
        <Typography variant="body2">
          posted by {blog.author} {moment(blog.createdAt).fromNow()}
        </Typography>

        <Typography variant="h5">{blog.title}</Typography>
      </Box>
    </Link>
  );
};

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  const [sortMethod, setSortMethod] = useState('recent');
  const classes = blogListStyles();
  const history = useHistory();

  const sortedBlogs = useMemo(() => {
    if (sortMethod === 'likes') {
      return sortItemsByLikes(blogs);
    }
    if (sortMethod === 'comments') {
      return sortItemsByComments(blogs);
    }
    return sortItemsDefault(blogs);
  }, [blogs, sortMethod]);

  console.log(sortedBlogs);

  return (
    <div>
      <Box className={classes.inputContainer}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="newPost"
          type="text"
          label="Create Post"
          name="New Post"
          autoComplete="on"
          className={classes.textField}
          onFocus={() => history.push('/create')}
        />
      </Box>
      <SortBar setState={setSortMethod} />
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
