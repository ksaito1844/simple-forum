import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  sortBy: 'date',
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = blogService.getAll();
  return response;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (newPost) => {
    const response = blogService.create(newPost);
    return response;
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postLikes) => {
    const response = await blogService.put(postLikes);
    return {
      id: response.id,
      changes: {
        likes: response.likes,
      },
    };
  }
);

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (postId) => {
    await blogService.remove(postId);
    return postId.id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addCommentToPost: {
      reducer(state, action) {
        const { postId, commentId } = action.payload;
        const post = state.entities[postId];
        if (post) {
          post.comments.push({ id: commentId });
        }
      },
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      postsAdapter.upsertMany(state, action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: postsAdapter.addOne,
    [likePost.fulfilled]: postsAdapter.updateOne,
    [removePost.fulfilled]: postsAdapter.removeOne,
  },
});

export default postsSlice.reducer;

export const { addCommentToPost, sortPostsByLikes } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const sortPosts = createSelector(
  selectAllPosts,
  (_, sortMethod) => sortMethod,
  (posts, sortMethod) => {
    if (sortMethod === 'likes') {
      return posts.sort((a, b) => b.likes - a.likes).map((post) => post.id);
    }
    if (sortMethod === 'comments') {
      return posts
        .sort((a, b) => b.comments.length - a.comments.length)
        .map((post) => post.id);
    }
    if (sortMethod === 'recent') {
      return posts
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((post) => post.id);
    }
  }
);

// export const selectPostsByLikes = createSelector([selectAllPosts], (posts) =>
//   posts.sort((a, b) => b.likes - a.likes).map((post) => post.id)
// );
//
// export const selectPostsByComments = createSelector([selectAllPosts], (posts) =>
//   posts
//     .sort((a, b) => b.comments.length - a.comments.length)
//     .map((post) => post.id)
// );
//
// export const selectPostsByDate = createSelector([selectAllPosts], (posts) =>
//   posts.sort((a, b) => b.date.localeCompare(a.date)).map((post) => post.id)
// );
