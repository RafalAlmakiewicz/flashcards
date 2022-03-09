import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./decksSlice";
import cardsReducer from "./cardsSlice";
import statusReducer from "./statusSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    cards: cardsReducer,
    status: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
