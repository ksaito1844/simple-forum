import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import { changeNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import formStyles from './common/formStyles'

const NewBlogForm = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const [newBlog, setNewBlog] = useState({ title: '', url: '' })
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {

  }, [blogs])

  const handleSubmit = async (event) => {
    const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    event.preventDefault()
    const newBlogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: user,
      createdAt: date
    }
    await dispatch(createBlog(newBlogObject))
    dispatch(changeNotification(`Your new blog titled: "${newBlogObject.title}" has been added to the server!`, 3000))
    history.push(`/blogs`)
    setNewBlog({ title: '', url: '' })
  }

  const classes = formStyles()

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1"
                    variant="h5"
        >
          New Post
        </Typography>
        <form className={classes.form}
              onSubmit={handleSubmit}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='title'
            placeholder='Title'
            type="text"
            value={newBlog.title}
            name="Title"
            autoComplete="on"
            autoFocus
            onChange={({ target }) => setNewBlog((newBlog) => ({ ...newBlog, title: target.value }))}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='url'
            placeholder='Url'
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog((newBlog) => ({ ...newBlog, url: target.value }))}
            autoComplete="on"
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.button}
            type='submit'
            id='login-button'
          >Submit
          </Button>
        </form>
      </div>
    </Container>
  )
}

Notification.propTypes = {
  user: PropTypes.string.isRequired,
}

export default NewBlogForm