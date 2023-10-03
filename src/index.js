// import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
// const title = "Kanban Board";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
