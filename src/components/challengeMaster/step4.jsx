import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { DateInput, PrimaryButton, PageTitle } from "../common";
import history from "../../history";
import { Constants } from "../../lib/constant";

function Step4() {
  const [launchDate, changeLaunchDate] = useState(null);
  const [dueDate, changeDueDate] = useState(null);
  const [biginDate, changeBiginDate] = useState(null);
  const [endDate, changeEndDate] = useState(null);
  const [anounceDate, changeAnounceDate] = useState(null);
  const [validated, setValidated] = useState(false);
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
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity()) {
              history.push("/challenge/confirmation");
            }
            setValidated(true);
          }}
        >
          <Row className="form-container">
            <Col>
              <DateInput
                label="My challenge launch date: *"
                description="Asia/Dubai"
                maxDate={new Date()}
                value={launchDate}
                onChange={(date) => {
                  changeLaunchDate(date);
                }}
                required
                errorMessage={Constants.Errors.launchDate}
              />
              <DateInput
                label="My challenge submissions are due on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
                value={dueDate}
                onChange={(date) => {
                  changeDueDate(date);
                }}
                required
                errorMessage={Constants.Errors.dueDate}
              />
              <DateInput
                label="My challenge judging begins on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
                value={biginDate}
                onChange={(date) => {
                  changeBiginDate(date);
                }}
                required
                errorMessage={Constants.Errors.biginDate}
              />
              <DateInput
                label="My challenge judging ends on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
                value={endDate}
                onChange={(date) => {
                  changeEndDate(date);
                }}
                required
                errorMessage={Constants.Errors.endDate}
              />
              <DateInput
                label="Challenge winners are announced on: *"
                description="Asia/Dubai"
                maxDate={new Date()}
                value={anounceDate}
                onChange={(date) => {
                  changeAnounceDate(date);
                }}
                required
                errorMessage={Constants.Errors.anounceDate}
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
                type="submit"
              ></PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Step4;
