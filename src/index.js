import { StrictMode } from "react";
import ReactDOM from "react-dom";
import ThemeContextProvider from "./state/ThemeContext";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
  rootElement
);
