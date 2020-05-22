import React, { useState } from "react";
import { TextArea, PrimaryButton, PageTitle } from "../common";
import { Form, Row, Col } from "react-bootstrap";

function Step3({ setActiveStep }) {
  const [problemStatement, changeProblemStatement] = useState("");
  const [currentSolution, changeCurrentSolution] = useState("");
  const [painPoint, changePainPoint] = useState("");
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>WHAT SOLUTION ARE YOU LOOKING FOR?</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text="Challenge Problem Statement" />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>
            Tell us about the problem, the current solutions, and what solution
            you are looking for.
          </Col>
        </Row>
        <Form>
          <Row className="form-container">
            <Col>
              <TextArea
                rows="4"
                label="Problem Statement (optional)"
                description="What problem are you tackling?"
                value={problemStatement}
                onChange={(e) => {
                  changeProblemStatement(e.target.value);
                }}
              />
              <TextArea
                rows="4"
                label="Current Solutions (optional)"
                description="What are the current solutions to this problem?"
                value={currentSolution}
                onChange={(e) => {
                  changeCurrentSolution(e.target.value);
                }}
              />
              <TextArea
                rows="4"
                label="Pain Point (optional)"
                description="What are the current solutions missing?"
                value={painPoint}
                onChange={(e) => {
                  changePainPoint(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row className="right-content-container">
            <Col>You can always edit this information later</Col>
          </Row>
          <Row className="button-container">
            <Col className="center-component">
              <PrimaryButton
                variant="primary"
                text={"Continue"}
                onClick={() => {
                  setActiveStep(3);
                }}
              ></PrimaryButton>
            </Col>
          </Row>
          <Row className="bottom-container">
            <Col>
              Need Help? or Looking for custom solution?{" "}
              <span className="contact-link">Contact Us</span>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Step3;
