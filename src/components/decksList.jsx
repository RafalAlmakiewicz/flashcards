import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDeckIds } from "../app/decksSlice";
import { Deck } from "./deck";
import { setCurrent } from "../app/decksSlice";
import { Link } from "react-router-dom";

export const DecksList = () => {
  const deckIds = useSelector(selectDeckIds);
  const dispatch = useDispatch();

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
