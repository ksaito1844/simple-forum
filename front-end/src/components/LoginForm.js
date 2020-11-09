import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { loginUser } from '../reducers/userReducer';
import { changeNotification } from '../reducers/notificationReducer';
import formStyles from './common/formStyles';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    let mounted = true;
    if (mounted === true) {
      try {
        dispatch(changeNotification('You have successfully logged in!', 3000));
        setUsername('');
        setPassword('');
        await dispatch(loginUser(username, password));
        history.push('/');
      } catch (exception) {
        dispatch(changeNotification('Incorrect credentials', 3000, true));
        setUsername('');
        setPassword('');
      }
    }
    return () => (mounted = false);
  };

  const classes = formStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            type="text"
            value={username}
            label="Username"
            name="Username"
            autoComplete="on"
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            value={password}
            label="Password"
            name="Password"
            autoComplete="on"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            id="login-button"
          >
            Sign In
          </Button>
          Don't have an account?
          <Link to="/register" style={{ marginLeft: '1rem' }}>
            Register now
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
