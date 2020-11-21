import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { addNewPost } from '../../reducers/postsSlice';
import { changeNotification } from '../../reducers/notificationReducer';
import formStyles from '../common/formStyles';

const NewBlogForm = ({ user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', post: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = formStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlogObject = {
      title: newBlog.title,
      post: newBlog.post,
      author: user,
    };
    dispatch(addNewPost(newBlogObject));
    dispatch(
      changeNotification(
        `Your new blog titled: "${newBlogObject.title}" has been added to the server!`,
        3000
      )
    );
    setNewBlog({ title: '', post: '' });
    history.push(`/`);
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            placeholder="Title"
            type="text"
            value={newBlog.title}
            name="Title"
            autoComplete="on"
            autoFocus
            onChange={({ target }) =>
              setNewBlog((newBlog) => ({ ...newBlog, title: target.value }))
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="post"
            placeholder="Say something wonderful!"
            type="text"
            value={newBlog.post}
            name="Post"
            multiline
            rows={10}
            size="medium"
            onChange={({ target }) =>
              setNewBlog((newBlog) => ({ ...newBlog, post: target.value }))
            }
            autoComplete="on"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            id="login-button"
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewBlogForm;
