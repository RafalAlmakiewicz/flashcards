import decksReducer from "../state/decksSlice";
import cardsReducer from "../state/cardsSlice";
import statusReducer from "../state/statusSlice";
import { configureStore } from "@reduxjs/toolkit";

export const testingStore = (current = "") =>
  configureStore({
    reducer: {
      decks: decksReducer,
      cards: cardsReducer,
      status: statusReducer,
    },
    preloadedState: {
      decks: {
        current,
        decks: {
          d1: {
            _id: "d1",
            name: "seasons",
            cards: ["c1", "c2", "c3", "c4"],
            progress: {
              round: {
                number: 1,
                failed: [],
                learned: [],
                notTried: ["c1", "c2", "c3", "c4"],
              },
              learned: [],
            },
          },
        },
      },
      cards: {
        c1: {
          _id: "c1",
          front: "spring",
          back: "wiosna",
        },
        c2: {
          _id: "c2",
          front: "summer",
          back: "lato",
        },
        c3: {
          _id: "c3",
          front: "autumn",
          back: "jesień",
        },
        c4: {
          _id: "c4",
          front: "zima",
          back: "winter",
        },
      },
      status: { getAll: "idle", update: "", create: "", remove: "" },
    },
  });
