import React from "react";
import Options from "./Options";

export default function ActiveQuestion({ dispatch, activeQuestion, answer }) {
  return (
    <div>
      <h4>{activeQuestion.question}</h4>
      <Options
        dispatch={dispatch}
        options={activeQuestion.options}
        correctOption={activeQuestion.correctOption}
        answer={answer}
      />
    </div>
  );
}
