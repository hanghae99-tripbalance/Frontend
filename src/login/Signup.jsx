import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../lib/instance";

export const addMemberThunk = createAsyncThunk(
  "ADD_MEMBER",
  async (payload, thunkAPI) => {
    console.log("페이로드는어딧는가?", payload);
    try {
      const { data } = await instance.post("/tb/signup", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  member: [],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: {
    [addMemberThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.member.push(action.payload);
    },
    [addMemberThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [addMemberThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
