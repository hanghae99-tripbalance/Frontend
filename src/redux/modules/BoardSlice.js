import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const __postBoard = createAsyncThunk(
  "POST_BOARD",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await axios.post("http://52.78.174.102:8080/", payload);
      return thunkAPI.fulfillWithValue(data);
      console.log(data);
    } catch (error) {}
  }
);

const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

export default BoardSlice.reducer;