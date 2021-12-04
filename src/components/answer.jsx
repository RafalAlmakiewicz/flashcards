import React from "react";

export const Answer = ({ seeAnswer, setSeeAnswer, next }) => {
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
