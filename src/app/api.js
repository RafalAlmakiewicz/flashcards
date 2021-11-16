import { createAsyncThunk } from "@reduxjs/toolkit";
import { composeData } from "./utils";

const endpoint = "http://localhost:3000/flashcards/api/decks";

export const getAll = createAsyncThunk("apiGetAll", async () => {
  const response = await fetch(endpoint);
  if (!response.ok)
    return Promise.reject(`error ${response.status} ${response.statusText}`);
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
    if (!response.ok)
      return Promise.reject(`error ${response.status} ${response.statusText}`);
    const data = await response.json();
    return {
      ...composeData([data]),
      prevCardsIds: getState().decks.decks[id].cards,
    };
  }
);

export const create = createAsyncThunk("apiCreate", async (deck) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(deck),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok)
    return Promise.reject(`error ${response.status} ${response.statusText}`);
  const data = await response.json();
  return composeData([data]);
});

export const remove = createAsyncThunk("apiRemove", async (deck) => {
  const response = await fetch(`${endpoint}/${deck._id}`, {
    method: "DELETE",
  });

  if (!response.ok)
    return Promise.reject(`error ${response.status} ${response.statusText}`);
  return deck;
});

export default { getAll, update, create, remove };
