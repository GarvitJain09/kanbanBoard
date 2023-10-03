// import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);
// const title = "Kanban Board";
ReactDOM.render(
  <React.StrictMode>
    <nav class="navbar navbar-light bg-light justify-content-center">
      <a class="navbar-brand" href="#">
        Kanban Board
      </a>
    </nav>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
