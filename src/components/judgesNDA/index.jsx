import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Alert } from "react-bootstrap";
import { attachJudgesAction } from "../challengeEdit/subComponents/judges/action";
import { MainContainer } from "./style";
import { PrimaryButton, Loading } from "../common";
import { getChallengeAction } from "../challengeMaster/action";
import { useDispatch, useSelector } from "react-redux";

const JudgesAggrement = ({ history, match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const attachJudgesMethod = (data) =>
    dispatch(attachJudgesAction(data, match.params.id));

  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const challengeJudgesReducer = useSelector((state) => {
    return state.challengeJudgesReducer;
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

  useEffect(() => {
    const { error, success } = challengeJudgesReducer;
    if (success) {
      history.push(`/challenge/${match.params.id}/preview/Submissions`);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeJudgesReducer, history, match]);

  return (
    <MainContainer>
      {(challengeReducer.loading ||
        signinReducer.loading ||
        challengeJudgesReducer.loading) && <Loading />}

      {errors && errors.length ? (
        <Row style={{ marginTop: 10 }} className="justify-content-center">
          <Col lg={9} md={10} sm={12}>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : null}

      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={12}>
          <div className="header-container">
            <div
              className="back-container"
              onClick={() => {
                history.goBack();
              }}
            >
              {"<"}
            </div>
            <div className="avtar-container">
              <img
                src={
                  challengeReducer.challengeData &&
                  challengeReducer.challengeData.organisationId &&
                  challengeReducer.challengeData.organisationId.details &&
                  challengeReducer.challengeData.organisationId.details.logo
                    ? challengeReducer.challengeData.organisationId.details.logo
                    : "/images/image.svg"
                }
                height={
                  challengeReducer.challengeData &&
                  challengeReducer.challengeData.organisationId &&
                  challengeReducer.challengeData.organisationId.details &&
                  challengeReducer.challengeData.organisationId.details.logo
                    ? "100%"
                    : "25px"
                }
                width={
                  challengeReducer.challengeData &&
                  challengeReducer.challengeData.organisationId &&
                  challengeReducer.challengeData.organisationId.details &&
                  challengeReducer.challengeData.organisationId.details.logo
                    ? "100%"
                    : "25px"
                }
                alt=""
                style={{ borderRadius: "50%" }}
              ></img>
            </div>
            <div className="user-name">
              {challengeReducer.challengeData &&
                challengeReducer.challengeData.organisationId &&
                challengeReducer.challengeData.organisationId.details &&
                challengeReducer.challengeData.organisationId.details.name}
            </div>
          </div>
          <div className="challenge-title">
            {challengeReducer.challengeData &&
              challengeReducer.challengeData.descriptionId &&
              challengeReducer.challengeData.descriptionId.title}
          </div>
          <div className="sub-header-container">
            <div className="agreement-text">{t("Judges NDA")}</div>
            <div className="button-container">
              <PrimaryButton
                text={t("dont_accept_agreement")}
                variant="light"
                onClick={() => {
                  history.goBack();
                }}
              />
              <PrimaryButton
                text={t("accept_agreement")}
                variant="primary"
                onClick={() => {
                  if (
                    signinReducer &&
                    signinReducer.userData &&
                    signinReducer.userData.email
                  ) {
                    attachJudgesMethod({
                      email: signinReducer.userData.email,
                      linkedin:
                        signinReducer.userData.details &&
                        signinReducer.userData.details.website
                          ? signinReducer.userData.details.website
                          : "",
                      additionalMessage: "",
                    });
                  }
                }}
              />
            </div>
          </div>
          {challengeReducer.challengeData &&
          challengeReducer.challengeData.judgesNDAID &&
          challengeReducer.challengeData.judgesNDAID.data ? (
            <div
              className="agreement"
              dangerouslySetInnerHTML={{
                __html: challengeReducer.challengeData.judgesNDAID.data,
              }}
            />
          ) : null}
          <div className="float-right">
            <div className="button-container">
              <PrimaryButton
                text={t("dont_accept_agreement")}
                variant="light"
                onClick={() => {
                  history.goBack();
                }}
              />
              <PrimaryButton
                text={t("accept_agreement")}
                variant="primary"
                onClick={() => {
                  if (
                    signinReducer &&
                    signinReducer.userData &&
                    signinReducer.userData.email
                  ) {
                    attachJudgesMethod({
                      email: signinReducer.userData.email,
                      linkedin:
                        signinReducer.userData.details &&
                        signinReducer.userData.details.website
                          ? signinReducer.userData.details.website
                          : "",
                      additionalMessage: "",
                    });
                  }
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default JudgesAggrement;
