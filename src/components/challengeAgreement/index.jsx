import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col, Alert } from "react-bootstrap";
import { MainContainer } from "./style";
import { PrimaryButton, Loading } from "../common";
import { acceptParticipantInvitationAction } from "../solveChallenge/action";
import { acceptTeamInvitationAction } from "../challengeEdit/subComponents/team/action";
import { getChallengeAction } from "../challengeMaster/action";
import { getInvitationByCodeAction } from "../signin/action";
import { useDispatch, useSelector } from "react-redux";
import { Constants } from "../../lib/constant";

const ChallengeAgreement = ({ history, match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );
  const getInvitationByCode = useCallback(
    (invitationCode) => dispatch(getInvitationByCodeAction(invitationCode)),
    [dispatch]
  );
  const acceptParticipantInvitation = (data) =>
    dispatch(acceptParticipantInvitationAction(data));
  const acceptTeamInvitation = (data) =>
    dispatch(acceptTeamInvitationAction(data));

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const SolveChallengeReducer = useSelector((state) => {
    return state.SolveChallengeReducer;
  });

  const challengeTeamReducer = useSelector((state) => {
    return state.challengeTeamReducer;
  });

  const [errors, setErrors] = useState([]);

  const [challengeId, setChallengeId] = useState(null);

  useEffect(() => {
    if (match.params && match.params.id) {
      setChallengeId(match.params.id);
    }
    if (match.params && match.params.invitationCode) {
      getInvitationByCode(match.params.invitationCode);
    }
  }, [getInvitationByCode, match]);

  useEffect(() => {
    if (challengeId) {
      getChallengeMethod(challengeId);
    }
  }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { invitation } = signinReducer;
    if (
      invitation &&
      invitation.userId &&
      invitation.userId.toString() ===
        localStorage.getItem("userId").toString() &&
      invitation.challengeId &&
      (!challengeId ||
        (challengeId &&
          challengeId.toString() !== invitation.challengeId.toString()))
    ) {
      setChallengeId(invitation.challengeId);
    }
  }, [signinReducer, challengeId]);

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
    const { error } = SolveChallengeReducer;

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [SolveChallengeReducer]);

  useEffect(() => {
    const { error } = challengeTeamReducer;

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeTeamReducer]);

  const onSubmit = () => {
    if (
      match.params &&
      match.params.invitationCode &&
      signinReducer.invitation
    ) {
      if (
        signinReducer.invitation.invitationType ===
        Constants.ACTIVITY_TYPE.SOLVE_INVITE
      ) {
        acceptParticipantInvitation({
          challengeId: signinReducer.invitation.challengeId,
          invitationBy: signinReducer.invitation.invitationBy,
        });
      } else if (
        signinReducer.invitation.invitationType ===
        Constants.ACTIVITY_TYPE.TEAM_INVITE
      ) {
        acceptTeamInvitation({
          challengeId: signinReducer.invitation.challengeId,
          invitationBy: signinReducer.invitation.invitationBy,
        });
      } else if (
        signinReducer.invitation.invitationType ===
        Constants.ACTIVITY_TYPE.PARTICIPANT_INVITE
      ) {
        history.push(
          `/solve/challenge/invitation/${signinReducer.invitation.invitationCode}`
        );
      } else {
        console.log(signinReducer.invitation);
      }
    } else {
      history.push(`/solve/challenge/${challengeId}`);
    }
  };

  return (
    <MainContainer>
      {errors && errors.length ? (
        <Row className="justify-content-center" style={{ marginTop: 10 }}>
          <Col lg={9} md={10} sm={12}>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : null}

      {challengeReducer.loading ||
      signinReducer.loading ||
      SolveChallengeReducer.loading ||
      challengeTeamReducer.loading ? (
        <Loading />
      ) : challengeId &&
        challengeReducer.challengeData &&
        challengeReducer.challengeData._id.toString() ===
          challengeId.toString() ? (
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
                      ? challengeReducer.challengeData.organisationId.details
                          .logo
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
              <div className="agreement-text">
                {t("Challenge-Specific Agreement")}
              </div>
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
                    onSubmit();
                  }}
                />
              </div>
            </div>
            {challengeReducer.challengeData &&
            challengeReducer.challengeData.legalAgreementId &&
            challengeReducer.challengeData.legalAgreementId.data ? (
              <div
                className="agreement"
                dangerouslySetInnerHTML={{
                  __html: challengeReducer.challengeData.legalAgreementId.data,
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
                    onSubmit();
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      ) : match.params &&
        match.params.invitationCode &&
        signinReducer &&
        ((signinReducer.invitation &&
          match.params.invitationCode ===
            signinReducer.invitation.invitationCode) ||
          !signinReducer.invitation) ? (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="no-data-text">
              {t("Invitation is expired or invalid")}{" "}
              <Link to="/dashboard">{t("explore other challenges")}</Link>
            </div>
          </Col>
        </Row>
      ) : null}
    </MainContainer>
  );
};

export default ChallengeAgreement;
