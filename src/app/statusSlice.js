import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
const { getAll, update } = api;

const statusSlice = createSlice({
  name: "status",
  initialState: { getAll: "", update: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.getAll = "loading";
      })
      .addCase(getAll.fulfilled, (state) => {
        state.getAll = "idle";
      })
      .addCase(getAll.rejected, (state) => {
        state.getAll = "server error";
      })
      .addCase(update.pending, (state) => {
        state.update = "loading";
      })
      .addCase(update.fulfilled, (state) => {
        state.update = "idle";
      })
      .addCase(update.rejected, (state) => {
        state.update = "server error";
      });
  },
});

export default statusSlice.reducer;
