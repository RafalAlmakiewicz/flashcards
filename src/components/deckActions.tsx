import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { setCurrent, selectDeckById } from "../state/decksSlice";
import { Link } from "react-router-dom";
import { DeleteDeckPopUp } from "./deleteDeckPopUp";

interface DeckActionsProps {
  id: string;
}

export function DeckActions({ id }: DeckActionsProps) {
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectDeckById(id));
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
