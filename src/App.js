import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import MainRouter from "./Router";
import { GlobalStyle } from "./styles/CommonStyle";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <MainRouter />
    </div>
  );
};

export default App;
