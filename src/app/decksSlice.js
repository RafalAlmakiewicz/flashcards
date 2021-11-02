import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";

const decksSlice = createSlice({
  name: "decks",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload.decks;
    });
  },
});

export default decksSlice.reducer;
