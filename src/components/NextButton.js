import React from "react";

export default function NextButton({ dispatch, index, noOfQuestions, answer }) {
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
