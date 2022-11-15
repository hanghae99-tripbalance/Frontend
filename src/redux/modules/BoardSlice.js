import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

// 서버주소 : https://coding-kym.shop

export const __postBoard = createAsyncThunk(
  "POST_BOARD",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.post(
        "https://coding-kym.shop/tb/posts",
        payload
      );
      return thunkAPI.fulfillWithValue(data);
      console.log(data);
    } catch (error) {}
  }
);

export const __postComment = createAsyncThunk(
  "POST_COMMENT",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.post(
        "https://coding-kym.shop/tb/posts",
        payload
      );
      return thunkAPI.fulfillWithValue(data);
      console.log(data);
    } catch (error) {}
  }
);

const BoardSlice = createSlice({
  name: "board,comment",
  initialState,
  reducers: {},
});

export default BoardSlice.reducer;
