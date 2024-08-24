import React, { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Ready from "./Ready";
import Progress from "./Progress";
import ActiveQuestion from "./ActiveQuestion";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";
import Finished from "./Finished";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_QUESTIONS_LOADING":
      return { ...state, status: "loading" };
    case "FETCH_QUESTIONS_ERROR":
      return { ...state, status: "error" };
    case "FETCH_QUESTIONS_READY":
      return { ...state, questions: action.payload, status: "ready" };
    case "START_QUIZ":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "ANSWER_QUESTION":
      const activeQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === activeQuestion.correctOption
            ? state.points + activeQuestion.points
            : state.points,
      };
    case "LOAD_NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        status: "finished",
        index: 0,
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "RESTART_QUIZ":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: null,
      };
    case "DECREMENT_SECONDS":
      if (state.secondsRemaining === 0) {
        return {
          ...state,
          status: "finished",
          index: 0,
          answer: null,
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      }
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      return state;
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const noOfQuestions = questions.length;
  const activeQuestion = questions.at(index);
  const maxPoints = questions.reduce(
    (accPoints, currQuestion) => accPoints + currQuestion.points,
    0
  );

  useEffect(function () {
    async function fetchQuestions() {
      dispatch({ type: "FETCH_QUESTIONS_LOADING" });
      const response = await fetch("http://localhost:8000/questions");
      if (!response.ok) {
        dispatch({ type: "FETCH_QUESTIONS_ERROR" });
        return;
      }
      const data = await response.json();
      dispatch({ type: "FETCH_QUESTIONS_READY", payload: data });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Ready dispatch={dispatch} noOfQuestions={noOfQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              index={index}
              noOfQuestions={noOfQuestions}
              points={points}
              maxPoints={maxPoints}
            />
            <ActiveQuestion
              dispatch={dispatch}
              activeQuestion={activeQuestion}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                noOfQuestions={noOfQuestions}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
