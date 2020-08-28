import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { solveChallengeAction } from "./action";
import { getChallengeAction } from "../challengeMaster/action";
import { getInvitationByCodeAction } from "../signin/action";
import { Constants } from "../../lib/constant";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  Switch,
  PrimaryButton,
  RemoveButton,
  Tab,
  CheckBox,
  Loading,
} from "../common";
import TeamAgreement from "./teamAgreement";

const SolveChallenge = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const solveChallengeMethod = (data) =>
    dispatch(solveChallengeAction(challengeId, data));
  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );
  const getInvitationByCode = useCallback(
    (invitationCode) => dispatch(getInvitationByCodeAction(invitationCode)),
    [dispatch]
  );

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const SolveChallengeReducer = useSelector((state) => {
    return state.SolveChallengeReducer;
  });

  const tabs = [
    {
      text: t("Create My Team"),
    },
    {
      text: t("No, Solve Alone"),
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].text);
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState([
    {
      email: "",
      permission: Constants.TEAM_PERMISSION.ADMIN,
    },
  ]);
  const [errors, setErrors] = useState([]);
  const [participated, setParticipation] = useState(false);
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
    const { error, challengeData } = challengeReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);

    if (
      challengeData &&
      challengeData.participantsId &&
      challengeData.participantsId.data &&
      challengeData.participantsId.data.length
    ) {
      const { data } = challengeData.participantsId;

      let dataFound = data.find((each) => {
        return each.team.find(
          (member) =>
            member.userId._id.toString() === localStorage.getItem("userId")
        );
      });

      setParticipation(dataFound ? true : false);
    }
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

  return participated ? (
    <Redirect to={`/challenge/${challengeId}/preview/Submissions`}></Redirect>
  ) : challengeId &&
    challengeReducer.challengeData &&
    challengeReducer.challengeData._id.toString() === challengeId.toString() ? (
    <MainContainer>
      {challengeReducer.loading ||
        signinReducer.loading ||
        (SolveChallengeReducer.loading && <Loading />)}
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={t("Solve Challenge")} icon={true}></Title>
            </Col>
          </Row>
          <Row>
            <Col>
              {errors && errors.length ? (
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              ) : null}
            </Col>
          </Row>
          <div className="content-container">
            <Row className="description-container">
              <Col>
                <Description>
                  {t("Would you like to compete as a team? *")}
                </Description>
              </Col>
            </Row>

            <Row className="justify-content-center tab-container">
              {tabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      setActiveTab(each.text);
                    }}
                  >
                    <Tab
                      text={t(each.text)}
                      isActive={activeTab === t(each.text)}
                    />
                  </Col>
                );
              })}
            </Row>

            {activeTab === t(tabs[0].text) && (
              <Row>
                <Col>
                  <div className="sub-description-container">
                    {t("invite_people_team")}
                  </div>
                </Col>
              </Row>
            )}

            {activeTab === t(tabs[0].text) ? (
              <Form
                noValidate
                validated={validated}
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const form = event.currentTarget;
                  if (form.checkValidity()) {
                    solveChallengeMethod({
                      team: members,
                    });
                  }
                  setValidated(true);
                }}
              >
                <Row className="form-container">
                  <Col>
                    {members.map((each, index) => {
                      return (
                        <div key={index} className="email-container">
                          <Input
                            type="email"
                            placeholder={t("email_placeholder")}
                            value={each.email}
                            onChange={(e) => {
                              let newArr = [...members];
                              newArr[index]["email"] = e.target.value;
                              setMembers(newArr);
                            }}
                            required
                            errorMessage={
                              each.email
                                ? t("invalid_email_error")
                                : t("email_error")
                            }
                          ></Input>

                          <div className="switch-container">
                            <div className={"left-text"}>
                              <span>{t("Admin")}</span>
                            </div>
                            <div>
                              <Switch
                                variant="primary"
                                label=""
                                checked={
                                  each.permission ===
                                  Constants.TEAM_PERMISSION.ADMIN
                                    ? false
                                    : true
                                }
                                onChange={() => {
                                  let newArr = [...members];
                                  newArr[index]["permission"] = Constants
                                    .TEAM_PERMISSION.ADMIN
                                    ? Constants.TEAM_PERMISSION.VIEW
                                    : Constants.TEAM_PERMISSION.ADMIN;
                                  setMembers(newArr);
                                }}
                              ></Switch>
                            </div>
                            <div className={"right-text"}>
                              <span>{t("View Only")}</span>
                            </div>
                          </div>

                          {members.length > 1 && (
                            <div className="remove-button-container">
                              <RemoveButton
                                onClick={() => {
                                  setMembers((data) => {
                                    return data.filter((each, i) => {
                                      return index !== i;
                                    });
                                  });
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className="add-member"
                      onClick={() => {
                        setMembers((data) =>
                          data.concat({
                            email: "",
                            permission: Constants.TEAM_PERMISSION.ADMIN,
                          })
                        );
                      }}
                    >
                      {t("+ Add Another Member")}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="checkbox-container">
                      <CheckBox
                        id={`checkbox-1`}
                        checkBoxText={
                          <span className="bold-text">
                            {t("Team Agreement")}
                          </span>
                        }
                        checked={check}
                        onChange={() => {
                          if (!check) {
                            setShow(true);
                          } else {
                            setCheck(!check);
                          }
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="right-container">
                      {t("Leave_fields_blank")}
                    </div>
                  </Col>
                </Row>
                <Row className="button-container">
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      disabled={!check}
                      text={t("Enter Challenge")}
                      type="submit"
                    ></PrimaryButton>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Form
                noValidate
                validated={validated}
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const form = event.currentTarget;
                  if (form.checkValidity()) {
                    solveChallengeMethod();
                  }
                }}
              >
                <Row className="button-container">
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      text={t("Enter Challenge")}
                      type="submit"
                    ></PrimaryButton>
                  </Col>
                </Row>
              </Form>
            )}
          </div>
        </Col>
      </Row>
      <TeamAgreement t={t} show={show} setShow={setShow} setCheck={setCheck} />
    </MainContainer>
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
  ) : null;
};

export default SolveChallenge;
