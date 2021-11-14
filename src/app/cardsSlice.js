import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { selectNextCardId } from "./decksSlice";

const cardsSlice = createSlice({
  name: "cards",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(api.getAll.fulfilled, (state, action) => {
        return action.payload.cards;
      })
      .addCase(api.update.fulfilled, (state, { payload }) => {
        let cards = { ...state };
        for (let id of payload.prevCardsIds) delete cards[id];
        return { ...cards, ...payload.cards };
      })
      .addCase(api.create.fulfilled, (state, { payload }) => {
        return { ...state, ...payload.cards };
      });
  },
});

export const selectNextCard = (state) => state.cards?.[selectNextCardId(state)];

export const selectCardsByIds =
  (cardIds) =>
  ({ cards }) => {
    if (!cards) return;
    let filtered = {};
    for (let id in cards) {
      if (cardIds.includes(id)) filtered[id] = { ...cards[id] };
    }
    return filtered;
  };

export const selectCardById = (id) => (state) => state.cards?.[id];

export default cardsSlice.reducer;
