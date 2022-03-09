import { createSlice } from "@reduxjs/toolkit";
import { StatusState } from "../types/statusTypes";
import { getAll, update, create, remove } from "./thunks";

const initialState: StatusState = {
  getAll: "",
  update: "",
  create: "",
  remove: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
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
