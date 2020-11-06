import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'


const reUsableStyle = {
  border: '1px solid #BDC3C7',
  '&:hover': {
    border: '1px solid black'
  },
  marginBottom: 16,
  borderRadius: 6,
}

const useClasses = makeStyles(theme => ({
  listItemContainer: {
    padding: 24,
    border: reUsableStyle.border,
    marginBottom: reUsableStyle.marginBottom,
    '&:hover': reUsableStyle['&:hover'],
    borderRadius: reUsableStyle.borderRadius
  },
  listItem: {
    textDecoration: 'none',
    color: '#000',
  },
  listItemSubtitle: {
    color: '#BDC3C7'
  },
  inputContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    border: reUsableStyle.border,
    marginBottom: reUsableStyle.marginBottom,
    borderRadius: reUsableStyle.borderRadius,
    textAlign: 'center'
  },
  textField: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(246,247,248)',
  },
  input: {
    border: 'none'
  }
}))

export const Blog = ({ blog }) => {

  const classes = useClasses()

  return (
    <Link to={`/blogs/${blog.id}`}
          className={classes.listItem}
    >
      <Box className={classes.listItemContainer}>
        <Typography variant='body2'
        >
          posted by {blog.author}
        </Typography>

        <Typography variant='h5'>
          {blog.title}
        </Typography>
      </Box>
    </Link>
  )
}

const Bloglist = ({ blogs }) => {
  const classes = useClasses()
  const history = useHistory()

  return (
    <div>
      <Box className={classes.inputContainer}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          id='newPost'
          type='text'
          label="Create Post"
          name='New Post'
          autoComplete="on"
          className={classes.textField}
          onFocus={() => history.push('/create')}
        />
      </Box>
      {blogs
        // sorts blogs by most likes
        // .sort((a, b) => {return b.likes - a.likes})
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => {
      return moment(b.createdAt, "dddd, MMMM Do YYYY, h:mm:ss a") - moment(a.createdAt, "dddd, MMMM Do YYYY, h:mm:ss a")
    })
  }
}

export default connect(mapStateToProps)(Bloglist)