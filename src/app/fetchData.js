import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await fetch("http://localhost:3000/flashcards/api/decks");
  const data = await response.json();
  console.log(data);
  return composeData(data);
});

const composeData = (data) => {
  let entities = {
    decks: {},
    progress: {},
    cards: {},
  };

  for (let deck of data) {
    let cardIds = [];
    for (let card of deck.cards) {
      entities.cards[card._id] = card;
      cardIds.push(card._id);
    }

    entities.progress[deck._id] = initialProgress(cardIds);

    entities.decks[deck._id] = {
      ...deck,
      cards: deck.cards.map((card) => card._id),
    };
  }

  return entities;
};

const initialProgress = (allCardsIds) => {
  return {
    round: {
      number: 0,
      notTried: allCardsIds,
      failed: [],
      learned: [],
    },
    learned: [],
  };
};

export default fetchData;
