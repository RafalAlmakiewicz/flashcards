import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, selectDeckById } from "../app/decksSlice";
import { Link } from "react-router-dom";
import { DeleteDeckPopUp } from "./deleteDeckPopUp";

export function DeckSummary({ id }) {
  const dispatch = useDispatch();
  const deck = useSelector(selectDeckById(id));
  const [showPopUp, setShowPopUp] = useState(false);

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
      <button
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        Delete
      </button>
      {showPopUp ? (
        <DeleteDeckPopUp deck={deck} setShowPopUp={setShowPopUp} />
      ) : null}
    </div>
  );
}
