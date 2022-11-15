import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../login/lib/instance";

// 서버주소 : https://coding-kym.shop

export const __getBoard = createAsyncThunk(
  "GET_BOARD",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/tb/posts`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return console.log("상세에러", error);
    }
  }
);

export const __getBoardDetail = createAsyncThunk(
  "GET_BOARDDETAIL",
  async (payload, thunkAPI) => {
    console.log("상세 페이로드", payload);
    try {
      const { data } = await instance.get(`/tb/posts/${payload.id}`);
      console.log("상세 데이터", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return console.log("상세에러", error);
    }
  }
);

export const __postBoard = createAsyncThunk(
  "POST_BOARD",
  async (payload, thunkAPI) => {
    console.log("나글쓰기페이로드", payload);
    try {
      const { data } = await instance.post("/tb/posts", payload);
      console.log("나글쓰기데이터", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("글쓰기에러", error);
    }
  }
);

export const __deleteBoard = createAsyncThunk(
  "DELETE_BOARD",
  async (payload, thunkAPI) => {
    console.log("나글삭제페이로드", payload);
    try {
      const { data } = await instance.delete(`/tb/posts/${payload.id}`);
      console.log("나글삭데이터", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("글삭에러", error);
    }
  }
);

export const __postComment = createAsyncThunk(
  "POST_COMMENT",
  async (payload, thunkAPI) => {
    console.log(payload);
    console.log(payload.id.id);
    console.log(payload.content);
    try {
      const { data } = await instance.post(`tb/comments`, {
        postId: payload.id.id,
        content: payload.content,
      });
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("댓글에러", error);
    }
  }
);

const initialState = {
  posts: [],
  isLoading: true,
  post: null,
};

const BoardSlice = createSlice({
  name: "board,comment",
  initialState,
  reducers: {},
  extraReducers: {
    [__getBoard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
      console.log("어흥난풀필드", state, action);
    },
    [__getBoard.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("나리젝티드", action);
    },
    [__getBoardDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getBoardDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(state.isLoading);
      state.post = action.payload.data;
    },
    [__getBoardDetail.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [__postBoard.fulfilled]: (state, action) => {},
    [__postBoard.rejected]: (state, action) => {},
    [__postComment.fulfilled]: (state, action) => {},
    [__postComment.rejected]: (state, action) => {},
  },
});

export default BoardSlice.reducer;
