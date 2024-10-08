import React, { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuizContext();

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "DECREMENT_SECONDS" });
      }, 1000);
      return () => clearInterval(timer);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
