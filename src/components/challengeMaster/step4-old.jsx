import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { DateInput, PrimaryButton, PageTitle } from "../common";
import { Constants } from "../../lib/constant";

const Step4 = ({
  launchDate,
  changeLaunchDate,
  dueDate,
  changeDueDate,
  biginDate,
  changeBiginDate,
  endDate,
  changeEndDate,
  anounceDate,
  changeAnounceDate,
  createChallenge,
}) => {
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
              createChallenge();
            } else {
              window.scrollTo(0, 0);
              setValidated(true);
            }
          }}
        >
          <Row className="form-container">
            <Col>
              <DateInput
                isSmall={true}
                label="My challenge launch date: *"
                description="Asia/Dubai"
                minDate={new Date().setTime(
                  new Date().getTime() + 1000 * 60 * 60 * 24 * 1
                )}
                value={launchDate}
                onChange={(date) => {
                  changeLaunchDate(date);
                }}
                required
                errorMessage={Constants.Errors.launchDate}
              />
              <DateInput
                isSmall={true}
                label="My challenge submissions are due on: *"
                description="Asia/Dubai"
                minDate={
                  launchDate
                    ? new Date().setTime(
                        launchDate.getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                    : new Date().setTime(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                }
                value={dueDate}
                onChange={(date) => {
                  changeDueDate(date);
                }}
                required
                errorMessage={Constants.Errors.dueDate}
              />
              <DateInput
                isSmall={true}
                label="My challenge judging begins on: *"
                description="Asia/Dubai"
                minDate={
                  dueDate
                    ? new Date().setTime(
                        dueDate.getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                    : new Date().setTime(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                }
                value={biginDate}
                onChange={(date) => {
                  changeBiginDate(date);
                }}
                required
                errorMessage={Constants.Errors.biginDate}
              />
              <DateInput
                isSmall={true}
                label="My challenge judging ends on: *"
                description="Asia/Dubai"
                minDate={
                  biginDate
                    ? new Date().setTime(
                        biginDate.getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                    : new Date().setTime(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                }
                value={endDate}
                onChange={(date) => {
                  changeEndDate(date);
                }}
                required
                errorMessage={Constants.Errors.endDate}
              />
              <DateInput
                isSmall={true}
                label="Challenge winners are announced on: *"
                description="Asia/Dubai"
                minDate={
                  endDate
                    ? new Date().setTime(
                        endDate.getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                    : new Date().setTime(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 1
                      )
                }
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
};

export default React.memo(Step4);
