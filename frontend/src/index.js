import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClassroomContextProvider } from "./context/ClassroomContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap');
    </style>
    <ClassroomContextProvider>
      <App />
    </ClassroomContextProvider>
  </React.StrictMode>
);
