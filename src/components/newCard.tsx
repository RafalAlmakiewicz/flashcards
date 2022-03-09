import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardForm } from "../types/cardTypes";

interface NewCardProps {
  card: CardForm;
  handleAdd: () => void;
  handleChange: (card: CardForm) => void;
}

export function NewCard({ card, handleAdd, handleChange }: NewCardProps) {
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
      <button
        data-testid="add-card"
        className="btn btn-primary btn-square"
        onClick={handleAdd}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}
