import React from "react";
import { useAppDispatch } from "../state/hooks";
import { remove } from "../state/thunks";
import { Deck } from "../types/deckTypes";

interface DeleteDeckPopUpProps {
  deck: Deck;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteDeckPopUp({ deck, setShowPopUp }: DeleteDeckPopUpProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="delete-pop-up-bg">
      <div className="delete-pop-up">
        <p>Do you want to delete {deck.name}?</p>
        <div className="delete-pop-up-buttons">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(remove(deck));
              setShowPopUp(false);
            }}
          >
            ok
          </button>
          <button
            className="btn btn-light"
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
