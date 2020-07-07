import React, { useEffect } from "react";
import MainRouter from "./Router";
import { GlobalStyle } from "./styles/CommonStyle";
import theme from "./theme";
import { Row, Col, Button } from "react-bootstrap";

const App = () => {
  useEffect(() => {
    if (theme.isRTL) {
      require("./lib/bootstrap.rtl.min.css");
      document.getElementById("MainComponent").setAttribute("dir", "rtl");
    } else {
      require("bootstrap/dist/css/bootstrap.min.css");
      document.getElementById("MainComponent").setAttribute("dir", "ltr");
    }
  }, []);
  return (
    <div className="App">
      <Row>
        <Col style={{ textAlign: "center", padding: 10 }}>
          <Button
            onClick={() => {
              if (theme.isRTL) {
                localStorage.setItem("language", "en");
                document.location.reload();
              } else {
                localStorage.setItem("language", "ar");
                document.location.reload();
              }
            }}
          >
            Change View
          </Button>
        </Col>
      </Row>
      <GlobalStyle></GlobalStyle>
      <MainRouter />
    </div>
  );
};

export default App;
