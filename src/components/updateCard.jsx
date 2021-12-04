import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UpdateCard({ card, handleChange, handleDelete }) {
  return (
    <div className="form-card">
      <input
        type="text"
        value={card.front}
        onChange={(e) => handleChange({ ...card, front: e.target.value })}
      />
      <input
        type="text"
        value={card.back}
        onChange={(e) => handleChange({ ...card, back: e.target.value })}
      />
      <button
        className="btn btn-primary btn-square"
        onClick={() => handleDelete(card._id)}
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </div>
  );
}
