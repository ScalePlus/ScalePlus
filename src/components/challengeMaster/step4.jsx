import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { DateInput, PrimaryButton, PageTitle } from "../common";
import history from "../../history";

function Step4() {
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>HOW LONG WILL YOUR CHALLENGE TAKE?</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text="Challenge Timeline" />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>When would you like to launch your challenge?</Col>
        </Row>
        <Form>
          <Row className="form-container">
            <Col>
              <DateInput
                label="My challenge launch date: *"
                description="Asia/Dubai"
                maxDate={new Date()}
              />
              <DateInput
                label="My challenge submissions are due on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
              />
              <DateInput
                label="My challenge judging begins on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
              />
              <DateInput
                label="My challenge judging begins on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
              />
              <DateInput
                label="Challenge winners are announced on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
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
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  history.push("/challenge/confirmation");
                }}
              ></PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Step4;
