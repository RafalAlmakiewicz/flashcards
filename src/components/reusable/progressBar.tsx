import React from "react";

interface Props {
  value: number;
  max: number;
}

export const ProgressBar = ({ value, max }: Props) => {
  return (
    <React.Fragment>
      <p className="score">
        {value}/{max}
      </p>
      <progress value={value} max={max}></progress>
    </React.Fragment>
  );
};
