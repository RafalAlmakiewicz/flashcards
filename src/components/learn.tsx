import { useState } from "react";
import { ProgressBar } from "./reusable/progressBar";
import { Answer } from "./answer";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import {
  selectRound,
  nextCard,
  nextRound,
  resetProgress,
  shuffle,
} from "../state/decksSlice";
import { selectNextCard } from "../state/cardsSlice";

export const Learn = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(selectNextCard);
  const round = useAppSelector(selectRound);
  const [facingFront, setFacingFront] = useState(false);
  const [seeAnswer, setSeeAnswer] = useState(false);

  const roundEnded = round.notTried.length === 0;
  const completed = roundEnded && round.failed.length === 0;

  const percentResult = () =>
    Math.round(
      (round.learned.length /
        (round.learned.length + round.failed.length + round.notTried.length)) *
        100
    );

  const next = (isCorrect: boolean) => {
    dispatch(nextCard(isCorrect));
    setSeeAnswer(false);
    setFacingFront(false);
  };

  return (
    <div className="card">
      <div className="card-top">
        <button
          className="btn btn-light"
          disabled={!seeAnswer}
          onClick={() => setFacingFront(!facingFront)}
        >
          Flip
        </button>
        <button
          className="btn btn-light"
          disabled={seeAnswer}
          onClick={() => dispatch(shuffle)}
        >
          Shuffle
        </button>
        <button
          className="btn btn-light"
          disabled={seeAnswer}
          onClick={() => dispatch(resetProgress())}
        >
          Reset
        </button>
        <div className="card-top-results">
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
          <button
            className="btn btn-primary"
            onClick={() => dispatch(resetProgress())}
          >
            start over
          </button>
        ) : roundEnded ? (
          <button
            className="btn btn-primary"
            onClick={() => dispatch(nextRound())}
          >
            next round
          </button>
        ) : (
          <Answer
            seeAnswer={seeAnswer}
            setSeeAnswer={setSeeAnswer}
            next={next}
          />
        )}
      </div>
    </div>
  );
};
