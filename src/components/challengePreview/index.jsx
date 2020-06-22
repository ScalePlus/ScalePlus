import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Tab, Nav, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getChallengeAction } from "../challengeMaster/action";
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

const ChallengePreview = ({ history, match }) => {
  const dispatch = useDispatch();
  const getChallengeMethod = useCallback(
    (challengeId) => dispatch(getChallengeAction(challengeId)),
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
  const [memberAsParticipant, setParticipation] = useState(false);
  const [memberAsJudge, setJudge] = useState(false);
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

      const memberAsParticipant =
        challengeData &&
        challengeData.participantsId &&
        challengeData.participantsId.data &&
        challengeData.participantsId.data.length &&
        challengeData.participantsId.data.find((each) => {
          return each.team.find(
            (member) => member.userId._id === localStorage.getItem("userId")
          );
        })
          ? true
          : false;
      setParticipation(memberAsParticipant);

      const memberAsJudge =
        challengeData &&
        challengeData.judgesId &&
        challengeData.judgesId.data.length &&
        challengeData.judgesId.data.find(
          (each) => each.userId._id === localStorage.getItem("userId")
        )
          ? true
          : false;
      setJudge(memberAsJudge);

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

      if (is_startup_Individual && memberAsParticipant) {
        changeTabs((data) => {
          if (!data.find((each) => each === "Submissions")) {
            data.splice(1, 0, "Submissions");
          }
          return data;
        });
      }

      if (
        (is_organisation &&
          challengeData &&
          challengeData.organisationId._id ===
            localStorage.getItem("userId")) ||
        (is_mentor_judge && memberAsJudge)
      ) {
        changeTabs((data) => {
          if (!data.find((each) => each === "Judging Criteria")) {
            data.splice(1, 0, "Judging Criteria");
          }
          if (!data.find((each) => each === "Submissions")) {
            data.splice(2, 0, "Submissions");
          }
          return data;
        });
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
                primaryButtonClick={() => {}}
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
                shareClick={() => {
                  alert("clicked");
                }}
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
              primaryButtonText={
                selectedTab === tabs[0] || !is_logged_in
                  ? is_mentor_judge && !memberAsJudge
                    ? "Judge this Challenge"
                    : (is_startup_Individual && !memberAsParticipant) ||
                      !is_logged_in
                    ? "Solve Challenge"
                    : null
                  : null
              }
              primaryButtonClick={() => {
                if (is_logged_in) {
                  if (is_profile_updated) {
                    if (is_mentor_judge) {
                      history.push("/dashboard");
                    } else {
                      history.push(`/solve/challenge/${challengeData._id}`);
                    }
                  } else {
                    history.push("/detail");
                  }
                } else {
                  setUserFlowModal(true);
                }
              }}
              shareClick={() => {
                alert("clicked");
              }}
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
              is_organisation={is_organisation}
              is_mentor_judge={is_mentor_judge}
              is_startup_Individual={is_startup_Individual}
              is_logged_in={is_logged_in}
              is_profile_updated={is_profile_updated}
              setUserFlowModal={setUserFlowModal}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Judging Criteria">
            <JudgingCriteria
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
                is_organisation={is_organisation}
                fromPreview={true}
              />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines">
            <Guidelines
              challengeData={challengeData}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates">
            <Updates
              challengeData={challengeData}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline
              challengeData={challengeData}
              is_startup_Individual={is_startup_Individual}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Forum">
            <Forum
              challengeData={challengeData}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="FAQ">
            <FAQ
              challengeData={challengeData}
              is_organisation={is_organisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Resources">
            <Resources
              challengeData={challengeData}
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
