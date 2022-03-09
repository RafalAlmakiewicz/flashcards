import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { composeData } from "./dataInitialization";
import api from "../api";
import { ApiDeck, Deck } from "../types/deckTypes";

export const getAll = createAsyncThunk("apiGetAll", async () => {
  const data = await api.getAll();
  return composeData(data);
});

export const update = createAsyncThunk(
  "apiUpdate",
  async (deck: ApiDeck, { getState }) => {
    const id = (getState() as RootState).decks.current;
    const data = await api.update(id, deck);
    return {
      ...composeData([data]),
      prevCardsIds: (getState() as RootState).decks.decks?.[id].cards,
    };
  }
);

export const create = createAsyncThunk("apiCreate", async (deck: ApiDeck) => {
  const data = await api.create(deck);
  return composeData([data]);
});

export const remove = createAsyncThunk("apiRemove", async (deck: Deck) => {
  return await api.remove(deck);
});
