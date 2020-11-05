import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { loginUser, registerUser } from '../reducers/userReducer'
import { Link, useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { initializeUsers } from '../reducers/usersReducer'
import formStyles from './common/formStyles'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  let history = useHistory()

  const handleRegisteration = async (event) => {
    event.preventDefault()
    let mounted = true
    if (mounted === true) {
      try {
        history.push('/')

        await dispatch(registerUser(name, username, password))
        await dispatch(initializeUsers())
        await dispatch(loginUser(username, password))

        dispatch(changeNotification('You have successfully logged in!', 3000))
        setUsername('')
        setPassword('')

      } catch (exception) {
        dispatch(changeNotification('Incorrect credentials', 3000, true))
        setUsername('')
        setPassword('')
      }
    }
    return () => mounted = false
  }

  const classes = formStyles()

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1"
                    variant="h5"
        >
          Register New Account
        </Typography>
        <form className={classes.form}
              onSubmit={handleRegisteration}
              noValidate
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            type='text'
            value={name}
            label="Name"
            name='Name'
            autoComplete="on"
            autoFocus
            onChange={({ target }) => setName(target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            type='text'
            value={username}
            label="Username"
            name='Username'
            autoComplete="on"
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='password'
            type='password'
            value={password}
            label="Password"
            name='Password'
            autoComplete="on"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
            type='submit'
            id='login-button'
          >Sign In
          </Button>
          <Link to='/'
          >
            Back to login
          </Link>
        </form>
      </div>
    </Container>
  )
}
export default RegisterForm