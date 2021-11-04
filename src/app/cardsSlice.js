import { createSlice } from "@reduxjs/toolkit";
import fetchData from "./fetchData";
import { selectNextCardId } from "./decksSlice";

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

export const selectNextCard = (state) => state.cards?.[selectNextCardId(state)];

export default cardsSlice.reducer;
