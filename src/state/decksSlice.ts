import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProgress } from "./dataInitialization";
import { getAll, update, create, remove } from "./thunks";
import { RootState, AppDispatch } from "./store";
import { DecksState } from "../types/deckTypes";

const initialState: DecksState = { decks: null, current: "" };

const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    nextCard: ({ decks, current }, action: PayloadAction<boolean>) => {
      const { round } = decks[current].progress;
      const lastCard = round.notTried.shift() as string;
      if (action.payload) round.learned.push(lastCard);
      else round.failed.push(lastCard);
    },
    nextRound: ({ decks, current }) => {
      const { round, learned } = decks[current].progress;
      learned.push(...round.learned); //!!!
      round.learned = [];
      round.notTried = round.failed;
      round.failed = [];
      round.number += 1;
    },
    resetProgress: ({ decks, current }) => {
      const cardIds = [...decks[current].cards];
      decks[current].progress = initialProgress(cardIds);
    },
    setNotTried: ({ decks, current }, action: PayloadAction<string[]>) => {
      decks[current].progress.round.notTried = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.decks = action.payload.decks;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.decks = { ...state.decks, ...action.payload.decks };
      })
      .addCase(create.fulfilled, (state, action) => {
        state.decks = { ...state.decks, ...action.payload.decks };
      })
      .addCase(remove.fulfilled, (state, action) => {
        delete state.decks[action.payload._id];
      });
  },
});

export const shuffle = (dispatch: AppDispatch, getState: () => RootState) => {
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

export const selectDecks = (state: RootState) => state.decks.decks;

export const selectDeckIds = (state: RootState) =>
  selectDecks(state) ? Object.keys(selectDecks(state)) : undefined;

export const selectDeckById = (id: string) => (state: RootState) =>
  selectDecks(state)?.[id];

export const selectCurrentDeck = (state: RootState) =>
  selectDecks(state)?.[state.decks.current];

export const selectRound = (state: RootState) =>
  selectCurrentDeck(state)?.progress.round;

export const selectNextCardId = (state: RootState) =>
  selectRound(state)?.notTried[0];

export const { setCurrent, nextCard, nextRound, resetProgress, setNotTried } =
  decksSlice.actions;
export default decksSlice.reducer;
