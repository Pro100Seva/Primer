import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AddComment,
  Comment,
  IdComment,
  IdPost,
  PostAdd,
  State,
} from './types/type';
import * as api from './api';
// начальный state
const initialState: State = { myPosts: [], error: '' };

//для получения постов
export const myPostsInit = createAsyncThunk('myPost/init', () =>
  api.getMyPostsFetch()
);
export const myPostsAdd = createAsyncThunk('myPosts/add', (obj: PostAdd) =>
  api.postAdd(obj)
);
export const myPostDel = createAsyncThunk('myPost/del', (id: IdPost) =>
  api.postDel(id)
);
export const addComments = createAsyncThunk('comments/add', (obj: AddComment) =>
  api.addComment(obj)
);
export const delComments = createAsyncThunk('comments/del', (id: IdComment) =>
  api.delComment(id)
);
export const likeChange = createAsyncThunk('like/change', (postId: number) =>
  api.likeFetch(postId)
);
const myPostsSlice = createSlice({
  name: 'myPost',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //инициализация
      .addCase(myPostsInit.fulfilled, (state, action) => {
        state.myPosts = action.payload;
        state.error = '';
      })
      //   .addCase(myPostsInit.rejected, (state, action) => {
      //     state.error = action.error.message;
      //   })
      //добавление моих постов
      .addCase(myPostsAdd.fulfilled, (state, action) => {
        state.myPosts = [action.payload, ...state.myPosts];
        state.error = '';
      })
      .addCase(myPostsAdd.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        // найти по postId и измени его
        const updatedPost = state.myPosts.find(
          (post) => post.id === action.payload.post_id_comment
        );
        state.myPosts = state.myPosts.map((el) => {
          if (el.id === action.payload.post_id_comment) {
            el.Comments?.push(action.payload);
          }
          return el;
        });
      })
      .addCase(addComments.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(delComments.fulfilled, (state, action) => {
        state.myPosts = state.myPosts.map((el) => ({
          ...el,
          Comments: el?.Comments.filter((com) => com.id !== action.payload),
        }));
      })
      .addCase(myPostDel.fulfilled, (state, action) => {
        state.myPosts = state.myPosts.filter((el) => el.id !== action.payload);
        state.error = '';
      })
      .addCase(myPostDel.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //лайки
      .addCase(likeChange.fulfilled, (state, action) => {
        state.myPosts = state.myPosts.map((el) => {
          if (el.id === action.payload.postId && action.payload.likeStatus) {
            el.Likes?.push({
              user_id_like: action.payload.userId,
              post_id_like: action.payload.postId,
            });
          } else if (
            el.id === action.payload.postId &&
            !action.payload.likeStatus
          ) {
            el.Likes = el.Likes?.filter(
              (like) => like.user_id_like !== action.payload.userId
            );
          }
          return el;
        });
        state.error = '';
      });
  },
});
export default myPostsSlice.reducer;
