import React, { useState } from "react";
import { DeckInfo } from "./deckInfo";
import { DeckActions } from "./deckActions";
import styles from "./styles/deck.module.css";

export function Deck({ id }) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div
      className={styles.deck}
      onMouseEnter={() => setShowInfo(false)}
      onMouseLeave={() => setShowInfo(true)}
    >
      {showInfo ? <DeckInfo id={id} /> : <DeckActions id={id} />}
    </div>
  );
}
