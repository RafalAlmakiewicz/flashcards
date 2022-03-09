import { Card, Cards } from "../types/cardTypes";
import { ApiDeck, Deck, Decks, Progress } from "../types/deckTypes";

export const composeData = (data: ApiDeck[]) => {
  let entities: {
    decks: Decks;
    cards: Cards;
  } = {
    decks: {},
    cards: {},
  };

  for (let deck of data) {
    for (let card of deck.cards as Card[]) {
      entities.cards[card._id] = card as Card;
    }

    let cardIds = deck.cards.map((card) => card._id);

    entities.decks[deck._id] = {
      ...deck,
      progress: initialProgress(cardIds),
      cards: cardIds,
    } as Deck;
  }
  return entities;
};

export const initialProgress = (cardIds: string[]): Progress => {
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
