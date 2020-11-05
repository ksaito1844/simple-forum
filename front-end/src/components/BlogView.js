import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link, useHistory } from 'react-router-dom'
import { changeNotification } from '../reducers/notificationReducer'

const BlogView = ({ blog, user }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  let history = useHistory()

  const like = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      _id: blog.id
    }
    dispatch(likeBlog(likedBlog))
  }

  const remove = () => {
    if (blog.user.id !== user.id) {
      dispatch(changeNotification(`You are not authorized to delete this post`, 3000, true))
      return
    }

    if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
      const blogObject = {
        user: blog.user.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        _id: blog.id
      }
      history.push('/')
      dispatch(deleteBlog(blogObject))
    }
  }

  const createComment = (event, blogId) => {
    event.preventDefault()
    const newComment = { comment: comment }
    dispatch(addComment(newComment, blogId))
    dispatch(changeNotification(`Your comment has been added`, 3000))

  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p><a href={blog.url}>{blog.url}</a></p>
      <br/>
      <p>Likes: {blog.likes}
        <button onClick={like}>like</button>
      </p>
      <p>added by <Link to={`/users/${blog.user.id}`}>{blog.author}</Link></p>
      <button onClick={remove}>delete</button>

      <hr/>
      <br/>
      <div>
        <h3>{blog.title}</h3>
        <br/>
        <p>This is the blog's content.</p>
      </div>
      <div>
        <h3>Comments:</h3>
        <form onSubmit={(e) => {createComment(e, blog.id)}}>
          <input type='text'
                 name='comment'
                 value={comment}
                 onChange={({ target }) => setComment(target.value)}
          />
          <button type='submit'>add comment</button>
        </form>
        <hr/>
        {blog.comments.map((comment, i) =>
          <div style={{ borderBottom: '1px solid black', marginBottom: '1em' }}
               key={i}
          >
            <p style={{ marginLeft: '3em' }}>{comment.comment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BlogView)