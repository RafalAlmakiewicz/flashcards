import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentDeck } from "../app/decksSlice";
import { Link } from "react-router-dom";
import { selectCardsByIds } from "../app/cardsSlice";
import { NewCard } from "./newCard";
import { UpdateCard } from "./updateCard";
import api from "../app/api";
import { uniqueId } from "lodash";
import { validateCard, validateDeck, toArray } from "../app/utils";

export function DeckForm() {
  const dispatch = useDispatch();
  const deck = useSelector(selectCurrentDeck);
  const currentCards = useSelector(selectCardsByIds(deck.cards));
  const blank = { front: "", back: "" };

  const [name, setName] = useState(deck.name);
  const [cards, setCards] = useState(currentCards);
  const [newCard, setNewCard] = useState(blank);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors(validateDeck({ name, cards }));
  }, [cards, name]);

  const handleAdd = () => {
    const newCardErrors = validateCard(newCard);
    if (newCardErrors.length > 0) setErrors([...errors, ...newCardErrors]);
    else {
      const id = uniqueId("newCard_");
      setCards({ ...cards, [id]: { _id: id, ...newCard } });
      setNewCard(blank);
    }
  };

  const handleDelete = (id) => {
    let copy = { ...cards };
    delete copy[id];
    setCards(copy);
  };

  const handleChange = (card) => {
    if (!card._id) setNewCard(card);
    else {
      const copy = { ...cards };
      copy[card._id] = card;
      setCards(copy);
    }
  };

  const handleSubmit = (e) => {
    dispatch(
      api.update({
        name,
        cards: toArray(cards).map(({ front, back }) => {
          return { front, back };
        }),
      })
    );
  };

  return (
    <React.Fragment>
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <p key={uniqueId()}>{error}</p>
          ))}
        </div>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
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
      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  );
}