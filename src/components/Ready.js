import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function Ready() {
  const { dispatch, noOfQuestions } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz </h2>
      <h3>{noOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START_QUIZ" })}
      >
        Let's start
      </button>
    </div>
  );
}
