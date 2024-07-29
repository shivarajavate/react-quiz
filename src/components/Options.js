import React from "react";

export default function Options({ dispatch, options, correctOption, answer }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          onClick={() =>
            dispatch({
              type: "ANSWER_QUESTION",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
