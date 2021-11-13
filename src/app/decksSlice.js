import { createSlice } from "@reduxjs/toolkit";
import { initialProgress } from "./utils";
import api from "./api";

const decksSlice = createSlice({
  name: "decks",
  initialState: { decks: null, current: "" },
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    nextCard: ({ decks, current }, action) => {
      const { round } = decks[current].progress;
      const lastCard = round.notTried.shift();
      if (action.payload) round.learned.push(lastCard);
      else round.failed.push(lastCard);
    },
    nextRound: ({ decks, current }) => {
      const { round, learned } = decks[current].progress;
      learned.push(round.learned);
      round.learned = [];
      round.notTried = round.failed;
      round.failed = [];
      round.number += 1;
    },
    resetProgress: ({ decks, current }) => {
      const cardIds = [...decks[current].cards];
      decks[current].progress = initialProgress(cardIds);
    },
    setNotTried: ({ decks, current }, action) => {
      decks[current].progress.round.notTried = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.getAll.fulfilled, (state, action) => {
        state.decks = action.payload.decks;
      })
      .addCase(api.update.fulfilled, (state, action) => {
        state.decks = { ...state.decks, ...action.payload.decks };
      });
  },
});

export const shuffle = (dispatch, getState) => {
  const { decks, current } = getState().decks;
  const arr = [...decks[current].progress.round.notTried];
  let temp,
    i,
    n = arr.length;
  while (n) {
    i = Math.floor(Math.random() * n--);
    temp = arr[n];
    arr[n] = arr[i];
    arr[i] = temp;
  }
  dispatch(setNotTried(arr));
};

export const selectDecks = (state) => state.decks.decks;

export const selectDeckIds = (state) =>
  selectDecks(state) ? Object.keys(selectDecks(state)) : undefined;

export const selectDeckById = (id) => (state) => selectDecks(state)?.[id];

export const selectCurrentDeck = (state) =>
  selectDecks(state)?.[state.decks.current];

export const selectRound = (state) => selectCurrentDeck(state)?.progress.round;

export const selectNextCardId = (state) => selectRound(state)?.notTried[0];

export const { setCurrent, nextCard, nextRound, resetProgress, setNotTried } =
  decksSlice.actions;
export default decksSlice.reducer;
