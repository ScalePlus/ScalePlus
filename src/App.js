import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import MainRouter from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "./styles/CommonStyle";

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <ToastContainer></ToastContainer>
      <MainRouter />
    </div>
  );
}

export default App;
