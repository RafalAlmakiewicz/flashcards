import { distinct } from "../helpers";
import { CardForm, Cards } from "../types/cardTypes";

const max = 250;

export const validateDeck = ({
  name,
  cards,
}: {
  name: string;
  cards: Cards;
}) => {
  const errors = [];
  if (Object.keys(cards).length < 2)
    errors.push("deck must contain at least 2 cards.");
  if (!name.trim()) errors.push("name is required!");
  else if (name.trim().length > max)
    errors.push("name must contain less than 250 characters!");
  for (let id in cards) {
    errors.push(...validateCard(cards[id]));
  }
  return errors.filter(distinct);
};

export const validateCard = ({ front, back }: CardForm) => {
  const errors = [];
  if (!front.trim() || !back.trim())
    errors.push("front and back are required!");
  else if (front.trim().length > max || back.trim().length > max)
    errors.push("front and back must contain less than 250 characters!");
  return errors;
};
