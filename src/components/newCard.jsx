import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NewCard({ card, handleAdd, handleChange }) {
  return (
    <div className="form-card form-new-card">
      <input
        type="text"
        value={card.front}
        placeholder="front"
        onChange={(e) => handleChange({ ...card, front: e.target.value })}
      />
      <input
        type="text"
        value={card.back}
        placeholder="back"
        onChange={(e) => handleChange({ ...card, back: e.target.value })}
      />
      <button className="btn btn-primary btn-square" onClick={handleAdd}>
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}
