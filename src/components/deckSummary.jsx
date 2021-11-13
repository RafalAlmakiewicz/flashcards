import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, selectDeckById } from "../app/decksSlice";
import { Link } from "react-router-dom";

export function DeckSummary({ id }) {
  const dispatch = useDispatch();
  const deck = useSelector(selectDeckById(id));

  return (
    <div>
      <p>{deck.name}</p>
      <p>{deck.cards.length}</p>
      <p>{deck.progress.learned.length + deck.progress.round.learned.length}</p>
      <Link
        to="/learn"
        onClick={() => {
          dispatch(setCurrent(deck._id));
        }}
      >
        Learn
      </Link>
      <Link
        to="/update"
        onClick={() => {
          dispatch(setCurrent(deck._id));
        }}
      >
        Update
      </Link>
    </div>
  );
}
