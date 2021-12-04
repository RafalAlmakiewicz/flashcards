import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, selectDeckById } from "../app/decksSlice";
import { Link } from "react-router-dom";
import { DeleteDeckPopUp } from "./deleteDeckPopUp";

export function DeckActions({ id }) {
  const dispatch = useDispatch();
  const deck = useSelector(selectDeckById(id));
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="deck-actions">
      <Link
        className="btn btn-light"
        to="/learn"
        onClick={() => {
          dispatch(setCurrent(deck._id));
        }}
      >
        learn
      </Link>
      <Link
        className="btn btn-light"
        to="/update"
        onClick={() => {
          dispatch(setCurrent(deck._id));
        }}
      >
        update
      </Link>
      <button
        className="btn btn-light"
        onClick={() => {
          setShowPopUp(true);
        }}
      >
        delete
      </button>
      {showPopUp ? (
        <DeleteDeckPopUp deck={deck} setShowPopUp={setShowPopUp} />
      ) : null}
    </div>
  );
}
