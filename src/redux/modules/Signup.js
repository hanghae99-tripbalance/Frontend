import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../login/lib/instance";

export const addMemberThunk = createAsyncThunk(
  "ADD_MEMBER",
  async (payload, thunkAPI) => {
    console.log("페이로드는어딧는가? ", payload);
    try {
      const { data } = await instance.post("/tb/signup", payload);
      console.log("나 데이터", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log("나 에러", error);
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
