import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, index, noOfQuestions, answer } = useQuizContext();

  if (answer === null) return;

  if (index < noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "LOAD_NEXT_QUESTION",
          })
        }
      >
        Next
      </button>
    );

  if (index === noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "FINISH_QUIZ",
          })
        }
      >
        Finish
      </button>
    );
}
