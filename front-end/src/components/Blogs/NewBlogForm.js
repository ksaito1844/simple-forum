import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { createBlog } from '../../reducers/blogReducer';
import { changeNotification } from '../../reducers/notificationReducer';
import formStyles from '../common/formStyles';

const NewBlogForm = ({ user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', url: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = formStyles();

  const handleSubmit = async (event) => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    event.preventDefault();
    const newBlogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: user,
      createdAt: date,
    };
    await dispatch(createBlog(newBlogObject));
    dispatch(
      changeNotification(
        `Your new blog titled: "${newBlogObject.title}" has been added to the server!`,
        3000
      )
    );
    history.push(`/blogs`);
    setNewBlog({ title: '', url: '' });
  };

  return (
    <Container maxWidth="xs">
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
            id="url"
            placeholder="Url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog((newBlog) => ({ ...newBlog, url: target.value }))
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
