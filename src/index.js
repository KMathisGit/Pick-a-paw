import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#222",
    },
    secondary: { main: "#ff69b4" },
  },
  overrides: {
    MuiTextField: {
      root: {
        color: "#fff",
        background: "rgba(0, 0, 0, 0.15)",
      },
    },
    MuiInputBase: {
      root: {
        color: "#fff",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#fff !important",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        border: "2px solid rgba(0, 0, 0, 0.3) !important",
      },
    },
  },
  props: {
    MuiInputLabel: {
      // shrink: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
