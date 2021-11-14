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

export const toArray = (object) => {
  let array = [];
  for (let key in object) {
    array.push(object[key]);
  }
  return array;
};

const max = 250;

export const validateDeck = ({ name, cards }) => {
  const errors = [];
  console.log("cards", cards, cards.length);
  if (Object.keys(cards).length < 2)
    errors.push("deck must contain at least 2 cards.");
  if (!name.trim()) errors.push("name is required!");
  else if (name.trim().length > max)
    errors.push("name must contain less than 250 characters!");
  for (let id in cards) {
    errors.push(...validateCard(cards[id]));
  }
  console.log(errors.filter(distinct));
  return errors.filter(distinct);
};

export const validateCard = ({ front, back }) => {
  const errors = [];
  if (!front.trim() || !back.trim())
    errors.push("front and back are required!");
  else if (front.trim().length > max || back.trim().length > max)
    errors.push("front and back must contain less than 250 characters!");
  return errors;
};

export const distinct = (value, index, array) => {
  return array.indexOf(value) === index;
};
