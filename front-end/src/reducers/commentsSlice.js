import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { addCommentToPost } from './postsSlice';

export const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => blogService.getComments(postId)
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (commentData, thunkAPI) => {
    const response = await blogService.comment(
      commentData.newComment,
      commentData.postId
    );
    await thunkAPI.dispatch(
      addCommentToPost({ postId: commentData.postId, commentId: response.id })
    );
    return response;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      commentsAdapter.upsertMany(state, action.payload);
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addComment.fulfilled]: commentsAdapter.addOne,
  },
});

export default commentsSlice.reducer;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state) => state.comments);

export const selectCommentsByPost = createSelector(
  [
    selectCommentIds,
    (state, commentsIds) => commentsIds.map((comment) => comment.id),
  ],
  (comments, commentsIds) =>
    comments.filter((comment) => commentsIds.includes(comment))
);
