import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";

const progressSlice = createSlice({
  name: "progress",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload.progress;
    });
  },
});

export default progressSlice.reducer;
