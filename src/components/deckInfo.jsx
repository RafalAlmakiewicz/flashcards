import React from "react";
import { useSelector } from "react-redux";
import { selectDeckById } from "../app/decksSlice";

export function DeckInfo({ id }) {
  const deck = useSelector(selectDeckById(id));

  return (
    <React.Fragment>
      <p>{deck.name}</p>
      <p>{deck.cards.length}</p>
      <p>{deck.progress.learned.length + deck.progress.round.learned.length}</p>
    </React.Fragment>
  );
}
