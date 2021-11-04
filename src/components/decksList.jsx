import React from "react";
import { useSelector } from "react-redux";
import { selectDeckIds } from "../app/decksSlice";
import { DeckSummary } from "./deckSummary";

export const DecksList = () => {
  const deckIds = useSelector(selectDeckIds);

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
    </React.Fragment>
  );
};
