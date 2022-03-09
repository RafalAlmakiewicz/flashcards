import React from "react";

interface AnswerProps {
  seeAnswer: boolean;
  setSeeAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  next: (isCorrect: boolean) => void;
}

export const Answer = ({ seeAnswer, setSeeAnswer, next }: AnswerProps) => {
  return (
    <React.Fragment>
      {seeAnswer ? (
        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              next(true);
            }}
          >
            I was right
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              next(false);
            }}
          >
            I was wrong
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            setSeeAnswer(true);
          }}
        >
          See Answer
        </button>
      )}
    </React.Fragment>
  );
};
