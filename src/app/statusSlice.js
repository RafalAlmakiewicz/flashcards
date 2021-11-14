import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
const { getAll, update, create } = api;

const statusSlice = createSlice({
  name: "status",
  initialState: { getAll: "", update: "", create: "" },
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
      })
      .addCase(create.pending, (state) => {
        state.create = "loading";
      })
      .addCase(create.fulfilled, (state) => {
        state.create = "idle";
      })
      .addCase(create.rejected, (state) => {
        state.create = "server error";
      });
  },
});

export default statusSlice.reducer;
