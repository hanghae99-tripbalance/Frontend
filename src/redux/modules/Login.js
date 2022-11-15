import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../login/lib/instance";
export const Add_LoginThunk = createAsyncThunk(
  "ADD_LOGIN",
  async (payload, thunkAPI) => {
    console.log("로그인할라고?? 넹! >ㅅ<", payload);
    try {
      const { data } = await instance.post("/tb/login", payload);
      console.log(data);
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

const LoginSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: {
    [Add_LoginThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.member.push(action.payload);
    },
    [Add_LoginThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [Add_LoginThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default LoginSlice.reducer;
