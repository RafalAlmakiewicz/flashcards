import React from "react";

export const ProgressBar = ({ value, max }) => {
  return (
    <label>
      {value}/{max}
      <progress value={value} max={max}></progress>
    </label>
  );
};
