import React from "react";

export function NewCard({ card, handleAdd, handleChange }) {
  return (
    <React.Fragment>
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
      <button onClick={handleAdd}>Add</button>
    </React.Fragment>
  );
}
