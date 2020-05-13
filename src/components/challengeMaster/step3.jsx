import React from "react";
import { Row, Col } from "react-bootstrap";

function Step3() {
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>WHAT SOLUTION ARE YOU LOOKING FOR?</Col>
        </Row>
        <Row className="title">
          <Col>Challenge Problem Statement</Col>
        </Row>
        <Row className="sub-title">
          <Col>
            Tell us about the problem, the current solutions, and what solution
            you are looking for.
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Step3;
