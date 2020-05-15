import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, Stepper } from "../common";
import { MainContainer } from "./style";

export default function Timeline() {
  return (
    <MainContainer>
      <Row
        className="justify-content-center"
        style={{ alignItems: "center", marginBottom: 40 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent titleText="Timeline" buttonText="Add New" />
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ alignItems: "center" }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <Stepper steps={[{}, {}, {}, {}, {}, {}]}></Stepper>
        </Col>
      </Row>
    </MainContainer>
  );
}
