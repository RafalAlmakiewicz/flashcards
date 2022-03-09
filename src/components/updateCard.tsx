import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../types/cardTypes";

interface UpdateCardProps {
  card: Card;
  handleChange: (card: Card) => void;
  handleDelete: (id: string) => void;
}

export function UpdateCard({
  card,
  handleChange,
  handleDelete,
}: UpdateCardProps) {
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
        data-testid="delete-card"
        className="btn btn-primary btn-square"
        onClick={() => handleDelete(card._id)}
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </div>
  );
}
