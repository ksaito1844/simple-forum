import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { logoutUser } from '../reducers/userReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    window.localStorage.clear()
    dispatch(changeNotification('Successfully logged out!', 3000))
  }

  const useClasses = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    navItem: {
      marginRight: theme.spacing(2),
      textDecoration: 'none',
      color: theme.palette.secondary.main
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main
    },
    backgroundColor: 'transparent',
    logoutButton: {
      '&:hover': {
        backgroundColor: 'transparent',
      }
    }
  }))
  const classes = useClasses()

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5"
                    className={classes.title}
        >
          <Link color='secondary'
                to="/"
                className={classes.navItem}
          >Blogs</Link>
          <Link color='secondary'
                to="/users"
                className={classes.navItem}
          >Users</Link>
        </Typography>
        <Avatar
          className={classes.avatar}
        >
          <Typography variant='h5'>
            {user.name[0]}
          </Typography>
        </Avatar>
        <Button
            className={classes.logoutButton}
          color="inherit"
                onClick={handleLogout}
        >Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar