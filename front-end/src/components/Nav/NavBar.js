import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { logoutUser } from '../../reducers/userReducer';
import { changeNotification } from '../../reducers/notificationReducer';
import { navStyles } from './NavStyles';

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = navStyles();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.localStorage.clear();
    dispatch(changeNotification('Successfully logged out!', 3000));
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link color="secondary" to="/" className={classes.navItem}>
            Posts
          </Link>
          <Link color="secondary" to="/users" className={classes.navItem}>
            Users
          </Link>
        </Typography>
        <Avatar className={classes.avatar}>
          <Typography variant="h5">{user.name[0]}</Typography>
        </Avatar>
        <Button
          className={classes.logoutButton}
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
