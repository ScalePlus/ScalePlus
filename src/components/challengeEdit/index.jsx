import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { Row, Col, Nav, Navbar, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getChallengeAction,
  updateChallengeAction,
} from "../challengeMaster/action";
import {
  WarningBlock,
  ChallengeHeader,
  PrimaryButton,
  Loading,
} from "../common";
import { Constants } from "../../lib/constant";
import Description from "./subComponents/description";
import Overview from "./subComponents/overview";
import Timeline from "./subComponents/timeline";
import FAQ from "./subComponents/FAQ";
import Resources from "./subComponents/resources";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
import SubmissionForm from "./subComponents/submissionForm";
import Submissions from "../challengePreview/subComponents/submissions";
import JudgingCriteria from "./subComponents/judgingCriteria";
import JudgingActivities from "./subComponents/judgingActivities";
// import Judges from "./subComponents/judges";
import JudgesNDA from "./subComponents/judgesNDA";
// import Team from "./subComponents/team";
import LegalAgreement from "./subComponents/legalAgreement";
import Settings from "./subComponents/settings";
import UserList from "./subComponents/userList";
import { MainContainer } from "./style";

const ChallengeEdit = ({ history, match }) => {
  const { t } = useTranslation();
  const challengeLinks = [
    { label: t("Description"), value: "Description" },
    { label: t("Overview"), value: "Overview" },
    { label: t("Timeline"), value: "Timeline" },
    { label: t("FAQ"), value: "FAQ" },
    { label: t("Resources"), value: "Resources" },
    { label: t("Guidelines"), value: "Guidelines" },
    { label: t("Updates"), value: "Updates" },
  ];

  const submissionLinks = [
    { label: t("Submission form"), value: "Submission form" },
    { label: t("Submissions"), value: "Submissions" },
  ];

  const usersLinks = [
    { label: t("Admins"), value: "Admins" },
    { label: t("Startups"), value: "Startups" },
    { label: t("Individuals"), value: "Individuals" },
    { label: t("Judges"), value: "Judges" },
  ];

  const judgeLinks = [
    { label: t("Judging criteria"), value: "Judging criteria" },
    { label: t("Judging activities"), value: "Judging activities" },
    { label: t("Judges NDA"), value: "Judges NDA" },
  ];

  const otherLinks = [
    // { label: t("Team"), value: "Team" },
    { label: t("Legal agreement"), value: "Legal agreement" },
    { label: t("Settings"), value: "Settings" },
  ];

  const is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE &&
      localStorage.getItem("token");
  const dispatch = useDispatch();

  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );
  const updateChallengeMethod = (data) => dispatch(updateChallengeAction(data));

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [errors, setErrors] = useState([]);
  const [challengeData, setChallenge] = useState(null);
  const [activeKey, selectTab] = useState(null);
  const [expanded, onToggle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [organisationTeamMember, setTeamMember] = useState(null);
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

    if (challengeData) {
      const perFieldPer = 100 / 13;
      let filledTabs = 0;

      if (challengeData.descriptionId) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.overviewId &&
        challengeData.overviewId.data &&
        challengeData.overviewId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.timelineId &&
        challengeData.timelineId.data &&
        challengeData.timelineId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.FAQId &&
        challengeData.FAQId.data &&
        challengeData.FAQId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.resourceId &&
        challengeData.resourceId.data &&
        challengeData.resourceId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.guidelineId &&
        challengeData.guidelineId.data &&
        challengeData.guidelineId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.updateId &&
        challengeData.updateId.data &&
        challengeData.updateId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.submissionFormId &&
        challengeData.submissionFormId.data &&
        challengeData.submissionFormId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.judgesId &&
        challengeData.judgesId.data &&
        challengeData.judgesId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.judgingCriteriaId &&
        challengeData.judgingCriteriaId.data &&
        challengeData.judgingCriteriaId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.judgesNDAID &&
        challengeData.judgesNDAID.data &&
        challengeData.judgesNDAID.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.teamId &&
        challengeData.teamId.data &&
        challengeData.teamId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      if (
        challengeData.legalAgreementId &&
        challengeData.legalAgreementId.data &&
        challengeData.legalAgreementId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }

      const per = filledTabs * perFieldPer;
      setProgress(Math.round(per));

      const memberOfTeam =
        challengeData &&
        challengeData.teamId &&
        challengeData.teamId.data &&
        challengeData.teamId.data.length &&
        challengeData.teamId.data.find(
          (each) =>
            each.userId._id.toString() === localStorage.getItem("userId")
        );

      setTeamMember(memberOfTeam);

      setChallenge(challengeData);
    }
  }, [challengeReducer]);

  useEffect(() => {
    if (
      match &&
      match.params &&
      match.params.tab &&
      ((activeKey && activeKey.value !== match.params.tab) || !activeKey)
    ) {
      let selectedChallengeTab = challengeLinks.find(
          (each) =>
            each.value.toLocaleLowerCase() ===
            match.params.tab.toLocaleLowerCase()
        ),
        selectedSubmissionTab = submissionLinks.find(
          (each) =>
            each.value.toLocaleLowerCase() ===
            match.params.tab.toLocaleLowerCase()
        ),
        selectedUserTab = usersLinks.find(
          (each) =>
            each.value.toLocaleLowerCase() ===
            match.params.tab.toLocaleLowerCase()
        ),
        selectedJudgeTab = judgeLinks.find(
          (each) =>
            each.value.toLocaleLowerCase() ===
            match.params.tab.toLocaleLowerCase()
        ),
        selectedOtherTab = otherLinks.find(
          (each) =>
            each.value.toLocaleLowerCase() ===
            match.params.tab.toLocaleLowerCase()
        );
      selectTab(
        selectedChallengeTab ||
          selectedSubmissionTab ||
          selectedUserTab ||
          selectedJudgeTab ||
          selectedOtherTab
      );
    }
  }, [
    match,
    challengeLinks,
    submissionLinks,
    usersLinks,
    judgeLinks,
    otherLinks,
    activeKey,
  ]);

  return challengeData &&
    (challengeData.isPublished ||
      challengeData.organisationId._id !== localStorage.getItem("userId") ||
      (organisationTeamMember &&
        organisationTeamMember.permission ===
          Constants.TEAM_PERMISSION.VIEW)) ? (
    <Redirect to={`/challenge/${challengeData._id}/preview/Overview`} />
  ) : (
    <MainContainer>
      {challengeReducer.loading && <Loading />}

      {errors && errors.length ? (
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : null}

      {challengeData && !challengeData.isPublished && (
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <WarningBlock t={t} />
          </Col>
        </Row>
      )}

      <Row className="justify-content-center" style={{ marginBottom: 35 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <ChallengeHeader
            primaryButtonText={t("Submit for review")}
            secondaryButtonText={t("Preview")}
            primaryButtonClick={() => {
              updateChallengeMethod({
                _id: challengeId,
                isPublished: true,
              });
            }}
            primaryButtonDisable={progress !== 100}
            secondaryButtonClick={() => {
              history.push(`/challenge/${challengeId}/preview/Overview`);
            }}
            organisationId={challengeData && challengeData.organisationId}
            progress={progress}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={3} md={4} sm={12} xs={12}>
              <Navbar
                expand="md"
                onToggle={() => {
                  onToggle(!expanded);
                }}
                expanded={expanded}
              >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <div style={{ flex: "auto" }}>
                    <div className="custom-sidebar">
                      <div>
                        <div className="title">
                          <span>{t("Challenge page")}</span>
                        </div>
                        <Nav
                          activeKey={activeKey && activeKey.value}
                          className="flex-column"
                        >
                          {challengeLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div className="title">
                          <span>{t("Users")}</span>
                        </div>
                        <Nav
                          activeKey={activeKey && activeKey.value}
                          className="flex-column"
                        >
                          {usersLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div className="title">
                          <span>{t("Submissions")}</span>
                        </div>
                        <Nav
                          activeKey={activeKey && activeKey.value}
                          className="flex-column"
                        >
                          {submissionLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div className="title">
                          <span>{t("Judging")}</span>
                        </div>
                        <Nav
                          activeKey={activeKey && activeKey.value}
                          className="flex-column"
                        >
                          {judgeLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ margin: "20px 0px" }}>
                        <div className="title">
                          <span>{t("Other")}</span>
                        </div>
                        <Nav
                          activeKey={activeKey && activeKey.value}
                          className="flex-column"
                        >
                          {otherLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                    </div>
                  </div>
                </Navbar.Collapse>
              </Navbar>
              <div className="button-container">
                <PrimaryButton
                  variant="primary"
                  text={t("Need_Help")}
                  onClick={() => {}}
                ></PrimaryButton>
              </div>
            </Col>
            <Col lg={9} md={8} sm={12} xs={12}>
              <div className="content-container">
                {activeKey && activeKey.value === "Description" && (
                  <Description t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Overview" && (
                  <Overview t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Timeline" && (
                  <Timeline t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "FAQ" && (
                  <FAQ t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Resources" && (
                  <Resources t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Guidelines" && (
                  <Guidelines t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Updates" && (
                  <Updates t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Submission form" && (
                  <SubmissionForm t={t} challengeId={challengeId} />
                )}
                {activeKey &&
                  activeKey.value === "Submissions" &&
                  challengeData && (
                    <Submissions
                      t={t}
                      challengeData={challengeData}
                      is_startup_Individual={is_startup_Individual}
                      is_mentor_judge={is_mentor_judge}
                      is_organisation={is_organisation}
                      fromPreview={false}
                      submissionVisibility={true}
                      judgingStarted={true}
                      judgingClosed={false}
                      submissionClosed={false}
                    />
                  )}
                {activeKey && activeKey.value === "Admins" && (
                  <UserList
                    t={t}
                    history={history}
                    activeKey={activeKey}
                    challengeId={challengeId}
                  />
                )}
                {activeKey && activeKey.value === "Startups" && (
                  <UserList
                    t={t}
                    history={history}
                    activeKey={activeKey}
                    challengeId={challengeId}
                  />
                )}
                {activeKey && activeKey.value === "Individuals" && (
                  <UserList
                    t={t}
                    history={history}
                    activeKey={activeKey}
                    challengeId={challengeId}
                  />
                )}
                {activeKey && activeKey.value === "Judges" && (
                  <UserList
                    t={t}
                    history={history}
                    activeKey={activeKey}
                    challengeId={challengeId}
                  />
                )}
                {activeKey && activeKey.value === "Judging criteria" && (
                  <JudgingCriteria t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Judging activities" && (
                  <JudgingActivities t={t} challengeId={challengeId} />
                )}
                {/* {activeKey && activeKey.value === "Judges" && (
                  <Judges t={t} challengeId={challengeId} />
                )} */}
                {activeKey && activeKey.value === "Judges NDA" && (
                  <JudgesNDA t={t} challengeId={challengeId} />
                )}
                {/* {activeKey && activeKey.value === "Team" && (
                  <Team t={t} challengeId={challengeId} />
                )} */}
                {activeKey && activeKey.value === "Legal agreement" && (
                  <LegalAgreement t={t} challengeId={challengeId} />
                )}
                {activeKey && activeKey.value === "Settings" && (
                  <Settings t={t} challengeId={challengeId} />
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ChallengeEdit;
