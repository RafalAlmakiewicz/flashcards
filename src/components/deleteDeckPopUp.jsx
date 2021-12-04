import React from "react";
import { useDispatch } from "react-redux";
import api from "../app/api";

export function DeleteDeckPopUp({ deck, setShowPopUp }) {
  const dispatch = useDispatch();

  return (
    <div className="delete-pop-up-bg">
      <div className="delete-pop-up">
        <p>Do you want to delete {deck.name}?</p>
        <div className="delete-pop-up-buttons">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(api.remove(deck));
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
