import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDeckIds } from "../app/decksSlice";
import { DeckSummary } from "./deckSummary";
import { setCurrent } from "../app/decksSlice";
import { Link } from "react-router-dom";

export const DecksList = () => {
  const deckIds = useSelector(selectDeckIds);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {deckIds ? (
        <div>
          {deckIds.map((id) => (
            <DeckSummary key={id} id={id} />
          ))}
        </div>
      ) : (
        <span>Loading...</span>
      )}
      <Link
        to="/new"
        onClick={() => {
          dispatch(setCurrent(""));
        }}
      >
        New Deck
      </Link>
    </React.Fragment>
  );
};
