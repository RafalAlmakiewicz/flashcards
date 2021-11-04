import React from "react";

export const Answer = ({ seeAnswer, setSeeAnswer, next }) => {
  return (
    <React.Fragment>
      {seeAnswer ? (
        <div>
          <button
            onClick={() => {
              next(true);
            }}
          >
            I was right
          </button>
          <button
            onClick={() => {
              next(false);
            }}
          >
            I was wrong
          </button>
        </div>
      ) : (
        <button
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
