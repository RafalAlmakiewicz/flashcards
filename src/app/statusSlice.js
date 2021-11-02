import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";

const statusSlice = createSlice({
  name: "status",
  initialState: { fetchData: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.fetchData = "loading";
      })
      .addCase(fetchData.fulfilled, (state) => {
        state.fetchData = "idle";
      })
      .addCase(fetchData.rejected, (state) => {
        state.fetchData = "server error";
      });
  },
});

export default statusSlice.reducer;
