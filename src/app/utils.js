export const composeData = (data) => {
  let entities = {
    decks: {},
    cards: {},
  };

  for (let deck of data) {
    for (let card of deck.cards) {
      entities.cards[card._id] = card;
    }

    let cardIds = deck.cards.map((card) => card._id);

    entities.decks[deck._id] = {
      ...deck,
      progress: initialProgress(cardIds),
      cards: cardIds,
    };
  }
  return entities;
};

export const initialProgress = (cardIds) => {
  return {
    round: {
      number: 1,
      notTried: cardIds,
      failed: [],
      learned: [],
    },
    learned: [],
  };
};