import React from "react";

export function UpdateCard({ card, handleChange, handleDelete }) {
  return (
    <React.Fragment>
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
      <button onClick={() => handleDelete(card._id)}>Delete</button>
    </React.Fragment>
  );
}
