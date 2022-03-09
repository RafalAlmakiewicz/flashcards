import React from "react";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { selectDeckIds } from "../state/decksSlice";
import { Deck } from "./deck";
import { setCurrent } from "../state/decksSlice";
import { Link } from "react-router-dom";

export const DecksList = () => {
  const deckIds = useAppSelector(selectDeckIds);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      {deckIds ? (
        <div className="main-container">
          <div className="actions-container">
            <Link
              className="btn btn-primary"
              to="/new"
              onClick={() => {
                dispatch(setCurrent(""));
              }}
            >
              new deck
            </Link>
          </div>
          <div className="decks-container">
            {deckIds.map((id) => (
              <Deck key={id} id={id} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </React.Fragment>
  );
};
