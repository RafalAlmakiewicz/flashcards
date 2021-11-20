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
    <React.Fragment>
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
    </React.Fragment>
  );
}
