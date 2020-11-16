import blogService from '../services/blogs';
import { changeNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_BLOG': {
      return [...state, action.data];
    }
    case 'LIKE': {
      const idToLike = action.data.id;
      const blogToLike = state.find((b) => b.id === idToLike);
      const likedBlog = {
        ...blogToLike,
        likes: action.data.likes,
      };
      console.log(blogToLike === likedBlog);
      return state.map((blog) => (blog.id !== idToLike ? blog : likedBlog));
    }
    case 'COMMENT': {
      return state.map((blog) => {
        if (blog.id === action.data.id) {
          console.log(action.id);
          return action.data;
        }
        return blog;
      });
    }
    case 'GET_COMMENTS': {
      console.log(action.data);
      return state;
    }
    case 'DELETE_BLOG': {
      const filteredBlogs = state.filter((blog) => blog.id !== action.data._id);
      return filteredBlogs;
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const createBlog = (returnedBlog) => async (dispatch) => {
  const newBlog = await blogService.create(returnedBlog);
  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  });
};

export const likeBlog = (blogObject) => async (dispatch) => {
  const updatedBlog = await blogService.put(blogObject);
  console.log(updatedBlog);
  await dispatch({
    type: 'LIKE',
    data: updatedBlog,
  });
  dispatch(changeNotification(`You liked ${blogObject.author}'s post`, 3000));
};

export const addComment = (incomingComment, blogId) => async (dispatch) => {
  const retrievedBlogArray = await blogService.comment(incomingComment, blogId);
  const updatedBlog = retrievedBlogArray.pop();
  console.log(updatedBlog);
  await dispatch({
    type: 'COMMENT',
    data: updatedBlog,
  });
};

export const getComments = (blogId) => async (dispatch) => {
  const retrievedBlog = await blogService.getComments(blogId);
  console.log(retrievedBlog);
  await dispatch({
    type: 'GET_COMMENTS',
    data: retrievedBlog,
  });
};

export const deleteBlog = (blogObject) => async (dispatch) => {
  await blogService.remove(blogObject);
  await dispatch({
    type: 'DELETE_BLOG',
    data: blogObject,
  });
  dispatch(
    changeNotification(`You deleted the post title: ${blogObject.title}`, 3000)
  );
};

export default blogReducer;
