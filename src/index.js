import React from "react";
import ReactDOM from "react-dom/client";
import { QuizContextProvider } from "./contexts/QuizContext";
import App from "./components/App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </React.StrictMode>
);
