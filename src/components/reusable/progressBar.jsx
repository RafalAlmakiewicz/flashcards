import React from "react";

export const ProgressBar = ({ value, max }) => {
  return (
    <React.Fragment>
      <p className="score">
        {value}/{max}
      </p>
      <progress value={value} max={max}></progress>
    </React.Fragment>
  );
};
