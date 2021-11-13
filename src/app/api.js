import { createAsyncThunk } from "@reduxjs/toolkit";
import { composeData } from "./utils";

const endpoint = "http://localhost:3000/flashcards/api/decks";

export const getAll = createAsyncThunk("apiGetAll", async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return composeData(data);
});

export const update = createAsyncThunk(
  "apiUpdate",
  async (deck, { getState }) => {
    const id = getState().decks.current;

    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(deck),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return {
      ...composeData([data]),
      prevCardsIds: getState().decks.decks[id].cards,
    };
  }
);

export default { getAll, update };
