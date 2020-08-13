import React from "react";
import { TextArea, PrimaryButton, PageTitle } from "../common";
import { Form, Row, Col } from "react-bootstrap";

const Step3 = ({
  t,
  problemStatement,
  changeProblemStatement,
  currentSolution,
  changeCurrentSolution,
  painPoint,
  changePainPoint,
  history,
}) => {
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>{t("STEP3_title")}</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text={t("STEP3_pagetitle")} />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>{t("STEP3_subtitle")}</Col>
        </Row>
        <Form>
          <Row className="form-container">
            <Col>
              <TextArea
                rows="4"
                label={t("Problem Statement (optional)")}
                description={t("problem_statement_description")}
                value={problemStatement}
                onChange={(e) => {
                  changeProblemStatement(e.target.value);
                }}
              />
              <TextArea
                rows="4"
                label={t("Current Solutions (optional)")}
                description={t("current_solution_description")}
                value={currentSolution}
                onChange={(e) => {
                  changeCurrentSolution(e.target.value);
                }}
              />
              <TextArea
                rows="4"
                label={t("Pain Point (optional)")}
                description={t("pain_point_description")}
                value={painPoint}
                onChange={(e) => {
                  changePainPoint(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row className="right-content-container">
            <Col>{t("You can always edit this information later")}</Col>
          </Row>
          <Row className="button-container">
            <Col className="center-component">
              <PrimaryButton
                variant="primary"
                text={t("Continue")}
                onClick={() => {
                  history.push("/create/challenge/4");
                }}
              ></PrimaryButton>
            </Col>
          </Row>
          <Row className="bottom-container">
            <Col>
              {t("Need_Help_Text")}{" "}
              <span className="contact-link">{t("Contact Us")}</span>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default React.memo(Step3);
