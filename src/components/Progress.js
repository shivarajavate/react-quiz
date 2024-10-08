import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function Progress() {
  const { answer, index, noOfQuestions, points, maxPoints } = useQuizContext();

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
