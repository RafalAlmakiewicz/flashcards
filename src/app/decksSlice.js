import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";

const decksSlice = createSlice({
  name: "decks",
  initialState: { decks: null, current: "" },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.decks = action.payload.decks;
    });
  },
});

export default decksSlice.reducer;
