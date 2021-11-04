import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";

const cardsSlice = createSlice({
  name: "cards",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload.cards;
    });
  },
});

export default cardsSlice.reducer;
