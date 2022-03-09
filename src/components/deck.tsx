import React, { useState } from "react";
import { DeckInfo } from "./deckInfo";
import { DeckActions } from "./deckActions";

interface DeckProps {
  id: string;
}

export function Deck({ id }: DeckProps) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div
      className="deck-container"
      data-testid={id}
      onMouseEnter={() => setShowInfo(false)}
      onMouseLeave={() => setShowInfo(true)}
    >
      {showInfo ? (
        <DeckInfo id={id} />
      ) : (
        <React.Fragment>
          <DeckInfo id={id} />
          <DeckActions id={id} />
        </React.Fragment>
      )}
    </div>
  );
}
