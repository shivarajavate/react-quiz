import React from "react";

export default function Progress({
  answer,
  index,
  noOfQuestions,
  points,
  maxPoints,
}) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={noOfQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {noOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}
