import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __myPageWriteGet = createAsyncThunk(
  "GET_MY_INFO",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.get(
        "https://coding-kym.shop/tb/mypage/posts",
        payload
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {}
  }
);

export const __myPageLikeGet = createAsyncThunk(
  "GET_MY_INFO",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.get(
        "https://coding-kym.shop/tb/mypage/hearts",
        payload
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {}
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [__myPageWriteGet.pending]: (state) => {
      state.isLoading = true;
    },
    [__myPageWriteGet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__myPageWriteGet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__myPageLikeGet.pending]: (state) => {
      state.isLoading = true;
    },
    [__myPageLikeGet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__myPageLikeGet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myInfoSlice.reducer;
