import blogService from '../services/blogs'
import { changeNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'LIKE':
      const idToLike = action.data.id
      const blogToLike = state.find(b => b.id === idToLike)
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map(
        blog => blog.id !== idToLike ? blog : likedBlog
      )
    case 'COMMENT':
      const idToComment = action.data.id
      const blogToCommentOn = state.find(b => b.id === idToComment)
      const changedBlog = {
        ...blogToCommentOn,
        comments: action.data.comments
      }
      return state.map(
        blog => blog.id !== idToComment ? blog : changedBlog
      )
    case 'DELETE_BLOG':
      const filteredBlogs = state.filter(blog => blog.id !== action.data._id)
      return filteredBlogs
    default :
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (returnedBlog) => {
  return async dispatch => {
    const newBlog = await blogService.create(returnedBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blogObject,) => {
  return async dispatch => {
    const updatedBlog = await blogService.put(blogObject)
    await dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
    dispatch(changeNotification(`You liked ${blogObject.author}'s post`, 3000))
  }
}

export const addComment = (incomingComment, blogId) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(incomingComment, blogId)
    console.log(updatedBlog)
    await dispatch({
      type: 'COMMENT',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    await blogService.remove(blogObject)
    await dispatch({
      type: 'DELETE_BLOG',
      data: blogObject
    })
    dispatch(changeNotification(`You deleted the post title: ${blogObject.title}`, 3000))
  }
}

export default blogReducer