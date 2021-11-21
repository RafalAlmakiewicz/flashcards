import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles/deleteDeckPopUp.module.css";
import api from "../app/api";

export function DeleteDeckPopUp({ deck, setShowPopUp }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <p>Do you want to delete {deck.name}?</p>
        <button
          onClick={() => {
            dispatch(api.remove(deck));
            setShowPopUp(false);
          }}
        >
          ok
        </button>
        <button
          onClick={() => {
            setShowPopUp(false);
          }}
        >
          cancel
        </button>
      </div>
    </div>
  );
}
