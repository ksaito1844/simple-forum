import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { blogListStyles } from './BlogListStyles';
import { SortBar } from '../common/SortBar/SortBar';
import { selectPostIds, sortPosts } from '../../reducers/postsSlice';
import SingleBlog from './SingleBlog';

const Bloglist = () => {
  const [sortMethod, setSortMethod] = useState('recent');
  const classes = blogListStyles();
  const history = useHistory();
  const posts = useSelector(selectPostIds);

  const sortedPosts = useSelector((state) => sortPosts(state, sortMethod));

  console.log(sortedPosts);

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
      {sortedPosts.map((blogId) => (
        <SingleBlog key={blogId} blogId={blogId} />
      ))}
    </div>
  );
};

export default Bloglist;
