import React, { useState } from "react";
import { ProgressBar } from "./reusable/progressBar";
import { Answer } from "./answer";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRound,
  nextCard,
  nextRound,
  resetProgress,
  shuffle,
} from "../app/decksSlice";
import { selectNextCard } from "../app/cardsSlice";
import { Link } from "react-router-dom";

export const Learn = () => {
  const dispatch = useDispatch();
  const card = useSelector(selectNextCard);
  const round = useSelector(selectRound);
  const [facingFront, setFacingFront] = useState(false);
  const [seeAnswer, setSeeAnswer] = useState(false);

  const roundEnded = round.notTried.length === 0;
  const completed = roundEnded && round.failed.length === 0;

  const percentResult = () =>
    (round.learned.length /
      (round.learned.length + round.failed.length + round.notTried.length)) *
    100;

  const next = (isCorrect) => {
    dispatch(nextCard(isCorrect));
    setSeeAnswer(false);
    setFacingFront(false);
  };

  return (
    <div className="card">
      <div className="card-top">
        <button
          disabled={!seeAnswer}
          onClick={() => setFacingFront(!facingFront)}
        >
          Flip
        </button>
        <button disabled={seeAnswer} onClick={() => dispatch(shuffle)}>
          Shuffle
        </button>
        <button disabled={seeAnswer} onClick={() => dispatch(resetProgress())}>
          Reset
        </button>
        <div className="results">
          <p>right: {round.learned.length}</p>
          <p>wrong: {round.failed.length}</p>
        </div>
      </div>
      <div className="card-center">
        {completed ? (
          <p>deck completed!</p>
        ) : roundEnded ? (
          <p>
            Round {round.number}: {percentResult()}%
          </p>
        ) : (
          <p>
            {!seeAnswer ? card.front : facingFront ? card.front : card.back}
          </p>
        )}

        <ProgressBar
          value={round.learned.length + round.failed.length}
          max={
            round.learned.length + round.failed.length + round.notTried.length
          }
        />
      </div>
      <div className="card-bottom">
        {completed ? (
          <button onClick={() => dispatch(resetProgress())}>start over</button>
        ) : roundEnded ? (
          <button onClick={() => dispatch(nextRound())}>next round</button>
        ) : (
          <Answer
            seeAnswer={seeAnswer}
            setSeeAnswer={setSeeAnswer}
            next={next}
          />
        )}
      </div>
      <Link to="/">Decks</Link>
    </div>
  );
};
