import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
const { getAll, update, create, remove } = api;

const statusSlice = createSlice({
  name: "status",
  initialState: { getAll: "", update: "", create: "", remove: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.getAll = "loading";
      })
      .addCase(getAll.fulfilled, (state) => {
        state.getAll = "idle";
      })
      .addCase(getAll.rejected, (state, action) => {
        state.getAll = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.update = "loading";
      })
      .addCase(update.fulfilled, (state) => {
        state.update = "idle";
      })
      .addCase(update.rejected, (state, action) => {
        state.update = action.error.message;
      })
      .addCase(create.pending, (state) => {
        state.create = "loading";
      })
      .addCase(create.fulfilled, (state) => {
        state.create = "idle";
      })
      .addCase(create.rejected, (state, action) => {
        state.create = action.error.message;
      })
      .addCase(remove.pending, (state) => {
        state.remove = "loading";
      })
      .addCase(remove.fulfilled, (state) => {
        state.remove = "idle";
      })
      .addCase(remove.rejected, (state, action) => {
        state.remove = action.error.message;
      });
  },
});

export default statusSlice.reducer;
