import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { blogListStyles } from './BlogListStyles';
import { sortItemsDefault } from '../../utils/sortItems';

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

const Bloglist = ({ blogs }) => {
  const [sortMethod, setSorthMethod] = useState(sortItemsDefault(blogs));
  console.log(blogs);
  const classes = blogListStyles();
  const history = useHistory();

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
      {sortMethod.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

export default connect(mapStateToProps)(Bloglist);
