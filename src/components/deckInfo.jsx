import React from "react";
import { useSelector } from "react-redux";
import { selectDeckById } from "../app/decksSlice";
import { ProgressBar } from "./reusable/progressBar";

export function DeckInfo({ id }) {
  const deck = useSelector(selectDeckById(id));

  return (
    <div className="deck-info">
      <h2>{deck.name}</h2>
      <ProgressBar
        value={
          deck.progress.learned.length + deck.progress.round.learned.length
        }
        max={deck.cards.length}
      />
    </div>
  );
}
