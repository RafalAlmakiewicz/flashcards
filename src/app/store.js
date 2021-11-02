import { configureStore, combineReducers } from "@reduxjs/toolkit";
import decksReducer from "./decksSlice";
import cardsReducer from "./cardsSlice";
import progressReducer from "./progressSlice";
import statusReducer from "./statusSlice";

const entitiesReducer = combineReducers({
  decks: decksReducer,
  cards: cardsReducer,
  progress: progressReducer,
  status: statusReducer,
});

export const store = configureStore({
  reducer: {
    entities: entitiesReducer,
  },
});
