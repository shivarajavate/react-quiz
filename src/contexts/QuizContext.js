import { createContext, useContext, useReducer, useEffect } from "react";

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

const QuizContext = createContext();

function QuizContextProvider({ children }) {
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
      try {
        dispatch({ type: "FETCH_QUESTIONS_LOADING" });
        const response = await fetch("http://localhost:8000/questions");
        const questions = await response.json();
        dispatch({ type: "FETCH_QUESTIONS_READY", payload: questions });
      } catch (err) {
        dispatch({ type: "FETCH_QUESTIONS_ERROR" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        noOfQuestions,
        activeQuestion,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  return useContext(QuizContext);
}

export { QuizContextProvider, useQuizContext };
