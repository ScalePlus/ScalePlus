import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Nav, Navbar, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getChallengeAction } from "../challengeMaster/action";
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
import Judges from "./subComponents/judges";
import JudgesNDA from "./subComponents/judgesNDA";
import Team from "./subComponents/team";
import LegalAgreement from "./subComponents/legalAgreement";
import Settings from "./subComponents/settings";
import { MainContainer } from "./style";
const challengeLinks = [
  "Description",
  "Overview",
  "Timeline",
  "FAQ",
  "Resources",
  "Guidelines",
  "Updates",
];

const submissionLinks = ["Submission form", "Submissions"];

const judgeLinks = [
  "Judges",
  "Judging criteria",
  "Judging activities",
  "Judges NDA",
];

const otherLinks = ["Team", "Legal agreement", "Settings"];

const ChallengeEdit = ({ history, match }) => {
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

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [errors, setErrors] = useState([]);
  const [challengeData, setChallenge] = useState(null);
  const [activeKey, selectTab] = useState(null);
  const [expanded, onToggle] = useState(false);
  const [progress, setProgress] = useState(0);
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

      if (challengeData && challengeData.descriptionId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.overviewId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.timelineId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.FAQId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.resourceId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.guidelineId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.updateId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.submissionFormId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.judgesId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.judgingCriteriaId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.judgesNDAID) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.teamId) {
        filledTabs = filledTabs + 1;
      }
      if (challengeData && challengeData.legalAgreementId) {
        filledTabs = filledTabs + 1;
      }

      const per = filledTabs * perFieldPer;
      setProgress(Math.round(per));

      setChallenge(challengeData);
    }
  }, [challengeReducer]);

  useEffect(() => {
    if (match && match.params && match.params.tab) {
      let selectedChallengeTab = challengeLinks.find(
          (each) =>
            each.toLocaleLowerCase() === match.params.tab.toLocaleLowerCase()
        ),
        selectedSubmissionTab = submissionLinks.find(
          (each) =>
            each.toLocaleLowerCase() === match.params.tab.toLocaleLowerCase()
        ),
        selectedJudgeTab = judgeLinks.find(
          (each) =>
            each.toLocaleLowerCase() === match.params.tab.toLocaleLowerCase()
        ),
        selectedOtherTab = otherLinks.find(
          (each) =>
            each.toLocaleLowerCase() === match.params.tab.toLocaleLowerCase()
        );
      selectTab(
        selectedChallengeTab ||
          selectedSubmissionTab ||
          selectedJudgeTab ||
          selectedOtherTab
      );
    }
  }, [match]);

  return challengeData &&
    (challengeData.isPublished ||
      challengeData.organisationId._id !== localStorage.getItem("userId")) ? (
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
            <WarningBlock />
          </Col>
        </Row>
      )}

      <Row className="justify-content-center" style={{ marginBottom: 35 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <ChallengeHeader
            primaryButtonText="Submit for review"
            secondaryButtonText="Save Draft"
            primaryButtonClick={() => {
              history.push(`/challenge/${challengeId}/preview/Overview`);
            }}
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
                          <span>Challenge page</span>
                        </div>
                        <Nav activeKey={activeKey} className="flex-column">
                          {challengeLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each}>{each}</Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div className="title">
                          <span>Submissions</span>
                        </div>
                        <Nav activeKey={activeKey} className="flex-column">
                          {submissionLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each}>{each}</Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div className="title">
                          <span>Judging</span>
                        </div>
                        <Nav activeKey={activeKey} className="flex-column">
                          {judgeLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each}>{each}</Nav.Link>
                              </Nav.Item>
                            );
                          })}
                        </Nav>
                      </div>
                      <div style={{ margin: "20px 0px" }}>
                        <div className="title">
                          <span>Other</span>
                        </div>
                        <Nav activeKey={activeKey} className="flex-column">
                          {otherLinks.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/edit/${each}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each}>{each}</Nav.Link>
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
                  text={"Need Help?"}
                  onClick={() => {}}
                ></PrimaryButton>
              </div>
            </Col>
            <Col lg={9} md={8} sm={12} xs={12}>
              <div className="content-container">
                {activeKey === "Description" && (
                  <Description challengeId={challengeId} />
                )}
                {activeKey === "Overview" && (
                  <Overview challengeId={challengeId} />
                )}
                {activeKey === "Timeline" && (
                  <Timeline challengeId={challengeId} />
                )}
                {activeKey === "FAQ" && <FAQ challengeId={challengeId} />}
                {activeKey === "Resources" && (
                  <Resources challengeId={challengeId} />
                )}
                {activeKey === "Guidelines" && (
                  <Guidelines challengeId={challengeId} />
                )}
                {activeKey === "Updates" && (
                  <Updates challengeId={challengeId} />
                )}
                {activeKey === "Submission form" && (
                  <SubmissionForm challengeId={challengeId} />
                )}
                {activeKey === "Submissions" && challengeData && (
                  <Submissions
                    challengeData={challengeData}
                    is_startup_Individual={is_startup_Individual}
                    is_mentor_judge={is_mentor_judge}
                    is_organisation={is_organisation}
                    fromPreview={false}
                  />
                )}
                {activeKey === "Judging criteria" && (
                  <JudgingCriteria challengeId={challengeId} />
                )}
                {activeKey === "Judging activities" && (
                  <JudgingActivities challengeId={challengeId} />
                )}
                {activeKey === "Judges" && <Judges challengeId={challengeId} />}
                {activeKey === "Judges NDA" && (
                  <JudgesNDA challengeId={challengeId} />
                )}
                {activeKey === "Team" && <Team challengeId={challengeId} />}
                {activeKey === "Legal agreement" && (
                  <LegalAgreement challengeId={challengeId} />
                )}
                {activeKey === "Settings" && (
                  <Settings challengeId={challengeId} />
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
