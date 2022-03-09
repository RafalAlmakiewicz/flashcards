import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { selectCurrentDeck } from "../state/decksSlice";
import { selectCardsByIds } from "../state/cardsSlice";
import { NewCard } from "./newCard";
import { UpdateCard } from "./updateCard";
import { update, create } from "../state/thunks";
import { uniqueId } from "lodash";
import { useHistory } from "react-router";
import { Card, CardForm } from "../types/cardTypes";
import { ApiDeck } from "../types/deckTypes";
import { validateCard, validateDeck } from "../state/validation";
import { distinct, toArray } from "../helpers";

export function DeckForm() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectCurrentDeck);
  const currentCards = useAppSelector(selectCardsByIds(deck ? deck.cards : []));
  const blank: CardForm = { front: "", back: "" };

  const [name, setName] = useState(deck?.name || "name");
  const [cards, setCards] = useState(currentCards);
  const [newCard, setNewCard] = useState(blank);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors(validateDeck({ name, cards }));
  }, [cards, name]);

  const handleAdd = () => {
    const newCardErrors = validateCard(newCard);
    if (newCardErrors.length > 0)
      setErrors([...errors, ...newCardErrors].filter(distinct));
    else {
      const id = uniqueId("newCard_");
      setCards({ ...cards, [id]: { _id: id, ...newCard } });
      setNewCard(blank);
    }
  };

  const handleDelete = (id: string) => {
    let copy = { ...cards };
    delete copy[id];
    setCards(copy);
  };

  const handleChange = (card: Card) => {
    if (!card._id) setNewCard(card);
    else {
      const copy = { ...cards };
      copy[card._id] = card;
      setCards(copy);
    }
  };

  const handleSubmit = () => {
    if (errors.length > 0) return;
    const payload: ApiDeck = {
      name,
      cards: toArray(cards).map(({ front, back }) => {
        return { front, back };
      }),
    };
    if (deck) dispatch(update(payload));
    else dispatch(create(payload));
    history.push("/");
  };

  return (
    <div className="form-container">
      {errors.length > 0 && (
        <div className="form-errors">
          {errors.map((error) => (
            <p key={uniqueId()}>{error}</p>
          ))}
        </div>
      )}
      <div className="form">
        <div className="form-name">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        {toArray(cards).map((card) => (
          <UpdateCard
            key={card._id}
            card={card}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        ))}

        <NewCard
          card={newCard}
          handleAdd={handleAdd}
          handleChange={handleChange}
        />
        <button className="btn btn-primary form-submit" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
}
