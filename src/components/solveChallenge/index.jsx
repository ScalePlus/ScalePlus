import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { solveChallengeAction } from "./action";
import { getChallengeAction } from "../challengeMaster/action";
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
} from "../common";
import TeamAgreement from "./teamAgreement";

const tabs = [
  {
    text: "Create My Team",
  },
  {
    text: "No, Solve Alone",
  },
];

const SolveChallenge = ({ match }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const solveChallengeMethod = (data) =>
    dispatch(solveChallengeAction(match.params.id, data));
  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const SolveChallengeReducer = useSelector((state) => {
    return state.SolveChallengeReducer;
  });

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
  const challengeId = match.params.id;

  useEffect(() => {
    getChallengeMethod(challengeId);
  }, [getChallengeMethod, challengeId]);

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
  ) : (
    <MainContainer>
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
                    {t(
                      "Type in their email addresses to invite people to your team:"
                    )}
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
                      {t(
                        "Leave fields blank if you don't want to invite anyone right now."
                      )}
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
  );
};

export default SolveChallenge;
