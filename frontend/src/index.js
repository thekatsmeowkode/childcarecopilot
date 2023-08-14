import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClassroomContextProvider } from "./context/ClassroomContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import "bootstrap/dist/css/bootstrap.min.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <style>
      @import
      url('https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap');
    </style>
    {/* <ThemeProvider theme={darkTheme}> */}
    {/* <CssBaseline /> */}
    <ClassroomContextProvider>
      <App />
    </ClassroomContextProvider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
