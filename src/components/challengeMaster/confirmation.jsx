import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getChallengeAction } from "./action";
import { PrimaryButton, PageTitle } from "../common";
import { MainContainer } from "./style";
import history from "../../history";

const ChallengeConfirmation = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getChallengeMethod = useCallback(
    (id) => dispatch(getChallengeAction(id)),
    [dispatch]
  );
  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getChallengeMethod(match.params.id);
  }, [getChallengeMethod, match]);

  useEffect(() => {
    const { error } = challengeReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeReducer]);

  const { challengeData } = challengeReducer;

  return (
    <MainContainer>
      {challengeReducer && challengeData ? (
        <Row className="justify-content-center challenge-completed-container">
          <Col lg={5} md={10} sm={12}>
            <Row style={{ marginBottom: "20px" }}>
              <Col>
                <div className="image-container">
                  <img
                    src={"/images/launch.svg"}
                    height="210px"
                    width="210px"
                    alt=""
                  ></img>
                </div>
              </Col>
            </Row>
            {errors && errors.length ? (
              <Row style={{ marginBottom: "20px" }}>
                <Col>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row className="title-container" style={{ marginBottom: "15px" }}>
              <Col>
                <PageTitle text={t("Challenge Created!")} />
              </Col>
            </Row>
            <Row className="sub-title" style={{ marginBottom: "35px" }}>
              <Col>{challengeData.descriptionId.title}</Col>
            </Row>
            <Row className="description" style={{ marginBottom: "50px" }}>
              <Col>{challengeData.descriptionId.shortDescription}</Col>
            </Row>
            <Row style={{ marginBottom: "50px" }}>
              <Col lg={2} md={2} sm={2} xs={2} />
              <Col lg={4} md={4} sm={4} xs={4} className="center-component">
                <PrimaryButton
                  variant="secondary"
                  text={t("Edit Challenge Details")}
                  onClick={() => {
                    history.push(
                      `/challenge/${challengeData._id}/edit/Description`
                    );
                  }}
                ></PrimaryButton>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} className="center-component">
                <PrimaryButton
                  variant="primary"
                  text={t("Preview Challenge")}
                  onClick={() => {
                    history.push(
                      `/challenge/${challengeData._id}/preview/Overview`
                    );
                  }}
                ></PrimaryButton>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} />
            </Row>
          </Col>
        </Row>
      ) : null}
    </MainContainer>
  );
};

export default ChallengeConfirmation;
