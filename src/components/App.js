import React from "react";
import { useQuizContext } from "../contexts/QuizContext";
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

function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Ready />}
        {status === "active" && (
          <>
            <Progress />
            <ActiveQuestion />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <Finished />}
      </Main>
    </div>
  );
}

export default App;
