import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClassroomContextProvider } from "./context/ClassroomContext";
import { SchoolContextProvider } from "./context/SchoolContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <SchoolContextProvider> */}
      <ClassroomContextProvider>
        <App />
      </ClassroomContextProvider>
    {/* </SchoolContextProvider> */}
  </React.StrictMode>
);
