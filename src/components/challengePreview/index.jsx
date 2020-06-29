import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie";
import { Row, Col, Tab, Nav, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getChallengeAction,
  updateChallengeAction,
  updateChallengeViewsAction,
} from "../challengeMaster/action";
import {
  PageTitle,
  WarningBlock,
  ChallengeHeader,
  ChallengeViewHeader,
  Loading,
} from "../common";
import UserFlowModal from "../userFlowModal";
import { Constants } from "../../lib/constant";
import { MainContainer, TabContainer } from "./style";
import OverView from "./subComponents/overview";
import JudgingCriteria from "./subComponents/judgingCriteria";
import Submissions from "./subComponents/submissions";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
import Timeline from "./subComponents/timeline";
import Forum from "./subComponents/forum";
import FAQ from "./subComponents/FAQ";
import Resources from "./subComponents/resources";
import "react-circular-progressbar/dist/styles.css";

const cookies = new Cookies();

const ChallengePreview = ({ history, match }) => {
  const dispatch = useDispatch();
  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
    [dispatch]
  );
  const updateChallengeMethod = (data) => dispatch(updateChallengeAction(data));
  const updateChallengeViewsMethod = useCallback(
    (data) => dispatch(updateChallengeViewsAction(data)),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [challengeData, setChallenge] = useState(null);
  const is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE &&
      localStorage.getItem("token"),
    is_logged_in = localStorage.getItem("token"),
    is_profile_updated = localStorage.getItem("profileUpdated");
  const [tabs, changeTabs] = useState(["Overview", "Timeline", "Forum"]);
  const [errors, setErrors] = useState([]);
  const [selectedTab, selectTab] = useState(null);
  const [show, setUserFlowModal] = useState(false);
  const [organisationTeamMember, setTeamMember] = useState(null);
  const [memberAsParticipant, setParticipation] = useState(false);
  const [memberAsJudge, setJudge] = useState(false);
  const [submissionVisibility, setSubmissionVisibility] = useState(false);
  const [judgingStarted, setJudgingVisibility] = useState(false);
  const [judgingClosed, setJudgingClosed] = useState(false);
  const [submissionClosed, setSubmissionClosed] = useState(false);
  const [progress, setProgress] = useState(0);
  const challengeId = match.params.id;

  useEffect(() => {
    if (challengeId) {
      if (!cookies.get("unique_id")) {
        cookies.set("unique_id", uuidv4(), { path: "/" });
      }

      updateChallengeViewsMethod({
        _id: challengeId,
        unique_id: cookies.get("unique_id"),
      });
    }
  }, [updateChallengeViewsMethod, challengeId]);

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

      const organisationTeamMember =
        challengeData &&
        challengeData.teamId &&
        challengeData.teamId.data &&
        challengeData.teamId.data.length &&
        challengeData.teamId.data.find(
          (each) =>
            each.userId._id.toString() === localStorage.getItem("userId")
        );

      setTeamMember(organisationTeamMember);

      let memberAsParticipant;
      if (
        challengeData &&
        challengeData.participantsId &&
        challengeData.participantsId.data &&
        challengeData.participantsId.data.length
      ) {
        const { data } = challengeData.participantsId;

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          if (element && element.team && element.team.length) {
            const { team } = element;
            for (let j = 0; j < team.length; j++) {
              const member = team[j];
              if (
                member.userId._id.toString() === localStorage.getItem("userId")
              ) {
                memberAsParticipant = member;
                setParticipation(memberAsParticipant);
              }
            }
          }
        }
      }

      const memberAsJudge =
        challengeData &&
        challengeData.judgesId &&
        challengeData.judgesId.data.length &&
        challengeData.judgesId.data.find(
          (each) =>
            each.userId._id.toString() === localStorage.getItem("userId")
        )
          ? true
          : false;
      setJudge(memberAsJudge);

      const submissionStart =
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length &&
        challengeData.timelineId.data.find(
          (each) => each.state.name === "Start"
        );

      const submissionDeadline =
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length &&
        challengeData.timelineId.data.find(
          (each) => each.state.name === "Submission Deadline"
        );

      if (submissionStart && submissionDeadline) {
        setSubmissionVisibility(
          new Date(submissionStart.date).setHours(0, 0, 0, 0) <=
            new Date().setHours(0, 0, 0, 0) &&
            new Date().setHours(0, 0, 0, 0) <=
              new Date(submissionDeadline.date).setHours(0, 0, 0, 0)
        );
      }

      if (submissionDeadline) {
        setSubmissionClosed(
          new Date(submissionDeadline.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0)
        );
      }

      const judgingStart =
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length &&
        challengeData.timelineId.data.find(
          (each) => each.state.name === "Judging"
        );

      const judgingClosed =
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length &&
        challengeData.timelineId.data.find(
          (each) => each.state.name === "Judging Closed"
        );

      if (judgingStart) {
        setJudgingVisibility(
          new Date(judgingStart.date).setHours(0, 0, 0, 0) <=
            new Date().setHours(0, 0, 0, 0)
        );
      }

      if (judgingClosed) {
        setJudgingClosed(
          new Date(judgingClosed.date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0)
        );
      }

      changeTabs((data) => {
        if (challengeData.resourceId && challengeData.resourceId.isActive) {
          if (!data.find((each) => each === "Resources")) {
            data.splice(3, 0, "Resources");
          }
        } else {
          let index = data.findIndex((each) => each === "Resources");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (challengeData.FAQId && challengeData.FAQId.isActive) {
          if (!data.find((each) => each === "FAQ")) {
            data.splice(3, 0, "FAQ");
          }
        } else {
          let index = data.findIndex((each) => each === "FAQ");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (challengeData.updateId && challengeData.updateId.isActive) {
          if (!data.find((each) => each === "Updates")) {
            data.splice(1, 0, "Updates");
          }
        } else {
          let index = data.findIndex((each) => each === "Updates");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (challengeData.guidelineId && challengeData.guidelineId.isActive) {
          if (!data.find((each) => each === "Guidelines")) {
            data.splice(1, 0, "Guidelines");
          }
        } else {
          let index = data.findIndex((each) => each === "Guidelines");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        return data;
      });

      setChallenge(challengeData);

      if (is_startup_Individual) {
        if (
          (organisationTeamMember &&
            organisationTeamMember.permission ===
              Constants.TEAM_PERMISSION.ADMIN) ||
          (memberAsParticipant &&
            memberAsParticipant.permission === Constants.TEAM_PERMISSION.ADMIN)
        ) {
          changeTabs((data) => {
            if (!data.find((each) => each === "Submissions")) {
              data.splice(1, 0, "Submissions");
            }
            return data;
          });
        } else {
          changeTabs((data) => {
            let index = data.findIndex((each) => each === "Submissions");
            if (index >= 0) {
              data.splice(index, 1);
            }
            return data;
          });
        }
      }
      if (is_organisation || is_mentor_judge) {
        if (
          (challengeData &&
            challengeData.organisationId._id.toString() ===
              localStorage.getItem("userId")) ||
          memberAsJudge
        ) {
          changeTabs((data) => {
            if (!data.find((each) => each === "Submissions")) {
              data.splice(1, 0, "Submissions");
            }
            return data;
          });
        } else {
          changeTabs((data) => {
            let submissionIndex = data.findIndex(
              (each) => each === "Submissions"
            );
            if (submissionIndex >= 0) {
              data.splice(submissionIndex, 1);
            }
            return data;
          });
        }
      }

      if (is_organisation || is_mentor_judge) {
        if (
          challengeData &&
          (challengeData.organisationId._id.toString() ===
            localStorage.getItem("userId") ||
            memberAsJudge) &&
          challengeData.judgingCriteriaId &&
          challengeData.judgingCriteriaId.data &&
          challengeData.judgingCriteriaId.data.length
        ) {
          changeTabs((data) => {
            if (!data.find((each) => each === "Judging Criteria")) {
              data.splice(1, 0, "Judging Criteria");
            }

            return data;
          });
        } else {
          changeTabs((data) => {
            let judginfCriteriaIndex = data.findIndex(
              (each) => each === "Judging Criteria"
            );
            if (judginfCriteriaIndex >= 0) {
              data.splice(judginfCriteriaIndex, 1);
            }

            return data;
          });
        }
      }
    }
  }, [
    is_organisation,
    is_startup_Individual,
    is_mentor_judge,
    challengeReducer,
  ]);

  useEffect(() => {
    if (match && match.params && match.params.tab) {
      selectTab(match.params.tab);
    }
  }, [match]);

  return challengeData ? (
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

      {challengeData && !challengeData.isPublished && is_organisation && (
        <Row>
          <Col>
            <WarningBlock />
          </Col>
        </Row>
      )}

      {challengeData && !challengeData.isPublished && is_organisation && (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="preview-container">
              <PageTitle text="Preview" />
            </div>
          </Col>
        </Row>
      )}

      {is_organisation &&
        (challengeData && !challengeData.isPublished ? (
          <Row className="justify-content-center" style={{ marginBottom: 10 }}>
            <Col lg={11} md={11} sm={11} xs={11}>
              <ChallengeHeader
                primaryButtonText="Submit for review"
                secondaryButtonText="Edit Challenge Details"
                primaryButtonClick={() => {
                  updateChallengeMethod({
                    _id: challengeId,
                    isPublished: true,
                  });
                }}
                primaryButtonDisable={progress !== 100}
                secondaryButtonClick={() => {
                  history.push(`/challenge/${challengeId}/edit/Description`);
                }}
                organisationId={challengeData.organisationId}
                progress={progress}
              />
            </Col>
          </Row>
        ) : (
          <Row
            className="justify-content-center"
            style={{ marginBottom: 10, marginTop: 20 }}
          >
            <Col lg={11} md={11} sm={11} xs={11}>
              <ChallengeViewHeader
                organisationId={challengeData.organisationId}
                viewCount={
                  challengeData &&
                  challengeData.views &&
                  challengeData.views.length
                }
              />
            </Col>
          </Row>
        ))}

      {!is_organisation && (
        <Row
          className="justify-content-center"
          style={{ marginBottom: 10, marginTop: 20 }}
        >
          <Col lg={11} md={11} sm={11} xs={11}>
            <ChallengeViewHeader
              organisationId={challengeData.organisationId}
              viewCount={
                challengeData &&
                challengeData.views &&
                challengeData.views.length
              }
              buttonText={
                selectedTab === tabs[0] || !is_logged_in
                  ? is_mentor_judge && !memberAsJudge
                    ? "Judge this Challenge"
                    : (is_startup_Individual &&
                        !memberAsParticipant &&
                        !organisationTeamMember) ||
                      !is_logged_in
                    ? submissionClosed
                      ? "Submission Closed"
                      : "Solve Challenge"
                    : null
                  : null
              }
              buttonClick={() => {
                if (is_logged_in) {
                  if (is_profile_updated) {
                    if (is_mentor_judge) {
                      history.push("/dashboard");
                    } else if (!submissionClosed) {
                      history.push(`/solve/challenge/${challengeData._id}`);
                    }
                  } else {
                    if (!submissionClosed) {
                      history.push("/detail");
                    }
                  }
                } else {
                  if (!submissionClosed) {
                    setUserFlowModal(true);
                  }
                }
              }}
              buttonVariant={
                ((is_startup_Individual &&
                  !memberAsParticipant &&
                  !organisationTeamMember) ||
                  !is_logged_in) &&
                submissionClosed
                  ? "secondary"
                  : "primary"
              }
            />
          </Col>
        </Row>
      )}

      <Tab.Container id="left-tabs-example" activeKey={selectedTab}>
        <Row className="justify-content-center full-width-cotainer">
          <Col>
            <TabContainer>
              <Row className="justify-content-center">
                <Col md={11}>
                  <Tab.Container activeKey={selectedTab}>
                    <Nav>
                      {tabs && tabs.length
                        ? tabs.map((each, index) => {
                            return (
                              <Nav.Item
                                key={index}
                                onClick={() => {
                                  history.push(
                                    `/challenge/${challengeId}/preview/${each}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each}>{each}</Nav.Link>
                                {each === "Updates" && (
                                  <div className="count-container">
                                    <span>1</span>
                                  </div>
                                )}
                              </Nav.Item>
                            );
                          })
                        : null}
                    </Nav>
                  </Tab.Container>
                </Col>
              </Row>
            </TabContainer>
          </Col>
        </Row>

        <Tab.Content>
          <Tab.Pane eventKey="Overview">
            <OverView
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              is_mentor_judge={is_mentor_judge}
              is_startup_Individual={is_startup_Individual}
              is_logged_in={is_logged_in}
              is_profile_updated={is_profile_updated}
              setUserFlowModal={setUserFlowModal}
              submissionClosed={submissionClosed}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Judging Criteria">
            <JudgingCriteria
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              challengeData={challengeData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Submissions">
            {challengeData && (
              <Submissions
                challengeData={challengeData}
                is_startup_Individual={is_startup_Individual}
                is_mentor_judge={is_mentor_judge}
                organisationTeamMember={organisationTeamMember}
                is_organisation={is_organisation}
                fromPreview={true}
                submissionVisibility={true}
                judgingStarted={true}
                judgingClosed={false}
                submissionClosed={false}
              />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines">
            <Guidelines
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates">
            <Updates
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline
              challengeData={challengeData}
              is_startup_Individual={is_startup_Individual}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Forum">
            <Forum
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="FAQ">
            <FAQ
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Resources">
            <Resources
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <UserFlowModal
        show={show}
        setUserFlowModal={setUserFlowModal}
        challengeData={challengeData}
        history={history}
      />
    </MainContainer>
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
    </MainContainer>
  );
};

export default ChallengePreview;
