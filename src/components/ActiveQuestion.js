import React from "react";
import Options from "./Options";
import { useQuizContext } from "../contexts/QuizContext";

export default function ActiveQuestion() {
  const { activeQuestion } = useQuizContext();

  return (
    <div>
      <h4>{activeQuestion.question}</h4>
      <Options />
    </div>
  );
}
