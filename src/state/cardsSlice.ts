import { createSlice } from "@reduxjs/toolkit";
import { getAll, update, create, remove } from "./thunks";
import { selectNextCardId } from "./decksSlice";
import { RootState } from "./store";
import { Cards } from "../types/cardTypes";

const initialState: Cards = null;

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        return action.payload.cards;
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        let cards = { ...state };
        for (let id of payload.prevCardsIds) delete cards[id];
        return { ...cards, ...payload.cards };
      })
      .addCase(create.fulfilled, (state, { payload }) => {
        return { ...state, ...payload.cards };
      })
      .addCase(remove.fulfilled, (state, { payload }) => {
        for (let cardId of payload.cards) delete state[cardId];
      });
  },
});

export const selectNextCard = (state: RootState) =>
  state.cards?.[selectNextCardId(state)];

export const selectCardsByIds =
  (cardIds: string[]) =>
  ({ cards }: RootState) => {
    if (!cards) return {};
    let filtered: Cards = {};
    for (let id in cards) {
      if (cardIds.includes(id)) filtered[id] = { ...cards[id] };
    }
    return filtered;
  };

export const selectCardById = (id: string) => (state: RootState) =>
  state.cards?.[id];

export default cardsSlice.reducer;
