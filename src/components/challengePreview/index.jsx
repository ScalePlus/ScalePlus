import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
import AllUsers from "../allUsers";
import "react-circular-progressbar/dist/styles.css";

const cookies = new Cookies();

const ChallengePreview = ({ history, match }) => {
  const { t } = useTranslation();
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
      (localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION ||
        localStorage.getItem("userRole") === Constants.ROLES.ADMIN) &&
      localStorage.getItem("token"),
    is_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
      localStorage.getItem("token"),
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE &&
      localStorage.getItem("token"),
    is_logged_in = localStorage.getItem("token"),
    is_profile_updated = localStorage.getItem("profileUpdated");
  const [tabs, changeTabs] = useState([
    { label: t("Overview"), value: "Overview" },
    { label: t("Timeline"), value: "Timeline" },
    { label: t("Forum"), value: "Forum" },
    { label: t("Users"), value: "Users" },
  ]);
  const [errors, setErrors] = useState([]);
  const [selectedTab, selectTab] = useState(null);
  const [show, setUserFlowModal] = useState(false);
  const [organisationTeamMember, setTeamMember] = useState(null);
  const [memberAsParticipant, setParticipation] = useState(false);
  const [memberAsJudge, setJudge] = useState(false);
  const [judgingClosed, setJudgingClosed] = useState(false);
  const [submissionClosed, setSubmissionClosed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const challengeId = match.params.id;

  useEffect(() => {
    if (challengeId && cookies.get("unique_id")) {
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
      const perFieldPer = 100 / 7;
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
      // if (
      //   challengeData.FAQId &&
      //   challengeData.FAQId.data &&
      //   challengeData.FAQId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
      // if (
      //   challengeData.resourceId &&
      //   challengeData.resourceId.data &&
      //   challengeData.resourceId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
      // if (
      //   challengeData.guidelineId &&
      //   challengeData.guidelineId.data &&
      //   challengeData.guidelineId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
      // if (
      //   challengeData.updateId &&
      //   challengeData.updateId.data &&
      //   challengeData.updateId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
      if (
        challengeData.submissionFormId &&
        challengeData.submissionFormId.data &&
        challengeData.submissionFormId.data.length
      ) {
        filledTabs = filledTabs + 1;
      }
      // if (
      //   challengeData.judgesId &&
      //   challengeData.judgesId.data &&
      //   challengeData.judgesId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
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
      // if (
      //   challengeData.teamId &&
      //   challengeData.teamId.data &&
      //   challengeData.teamId.data.length
      // ) {
      //   filledTabs = filledTabs + 1;
      // }
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
            each.userId._id.toString() === localStorage.getItem("userId") &&
            each.status !== Constants.USER_STATUS.Declined &&
            each.status !== Constants.USER_STATUS.Canceled &&
            each.status !== Constants.USER_STATUS.Invited
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
                member &&
                member.userId &&
                member.userId._id &&
                member.userId._id.toString() ===
                  localStorage.getItem("userId") &&
                member.status !== Constants.USER_STATUS.Declined &&
                member.status !== Constants.USER_STATUS.Canceled &&
                member.status !== Constants.USER_STATUS.Invited
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
          (member) =>
            member.userId._id.toString() === localStorage.getItem("userId") &&
            member.status !== Constants.USER_STATUS.Declined &&
            member.status !== Constants.USER_STATUS.Invited
        )
          ? true
          : false;
      setJudge(memberAsJudge);

      if (
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length
      ) {
        setSubmissionClosed(
          challengeData.timelineId.data.find((each) => {
            return (
              each.state.name === "Submission" &&
              new Date(each.endDate).getTime() > new Date().getTime()
            );
          })
            ? false
            : true
        );
      }

      if (
        challengeData &&
        challengeData.timelineId &&
        challengeData.timelineId.data.length
      ) {
        setJudgingClosed(
          challengeData.timelineId.data.find((each) => {
            return (
              each.state.name === "Judging" &&
              new Date(each.endDate).getTime() > new Date().getTime()
            );
          })
            ? false
            : true
        );
      }

      changeTabs((data) => {
        if (
          challengeData.resourceId &&
          challengeData.resourceId.isActive &&
          challengeData.resourceId.data &&
          challengeData.resourceId.data.length
        ) {
          if (!data.find((each) => each.value === "Resources")) {
            data.splice(3, 0, { label: t("Resources"), value: "Resources" });
          }
        } else {
          let index = data.findIndex((each) => each.value === "Resources");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (
          challengeData.FAQId &&
          challengeData.FAQId.isActive &&
          challengeData.FAQId.data &&
          challengeData.FAQId.data.length
        ) {
          if (!data.find((each) => each.value === "FAQ")) {
            data.splice(3, 0, { label: t("FAQ"), value: "FAQ" });
          }
        } else {
          let index = data.findIndex((each) => each.value === "FAQ");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (
          challengeData.updateId &&
          challengeData.updateId.isActive &&
          challengeData.updateId.data &&
          challengeData.updateId.data.length
        ) {
          if (!data.find((each) => each.value === "Updates")) {
            data.splice(1, 0, { label: t("Updates"), value: "Updates" });
          }
        } else {
          let index = data.findIndex((each) => each.value === "Updates");
          if (index >= 0) {
            data.splice(index, 1);
          }
        }

        if (
          challengeData.guidelineId &&
          challengeData.guidelineId.isActive &&
          challengeData.guidelineId.data &&
          challengeData.guidelineId.data.length
        ) {
          if (!data.find((each) => each.value === "Guidelines")) {
            data.splice(1, 0, { label: t("Guidelines"), value: "Guidelines" });
          }
        } else {
          let index = data.findIndex((each) => each.value === "Guidelines");
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
            if (!data.find((each) => each.value === "Submissions")) {
              data.splice(1, 0, {
                label: t("Submissions"),
                value: "Submissions",
              });
            }
            return data;
          });
        } else {
          changeTabs((data) => {
            let index = data.findIndex((each) => each.value === "Submissions");
            if (index >= 0) {
              data.splice(index, 1);
            }
            return data;
          });
        }
      }
      if (is_organisation || is_mentor_judge || is_admin) {
        if (
          (challengeData &&
            challengeData.organisationId._id.toString() ===
              localStorage.getItem("userId")) ||
          memberAsJudge ||
          is_admin
        ) {
          changeTabs((data) => {
            if (!data.find((each) => each.value === "Submissions")) {
              data.splice(1, 0, {
                label: t("Submissions"),
                value: "Submissions",
              });
            }
            return data;
          });
        } else {
          changeTabs((data) => {
            let submissionIndex = data.findIndex(
              (each) => each.value === "Submissions"
            );
            if (submissionIndex >= 0) {
              data.splice(submissionIndex, 1);
            }
            return data;
          });
        }
      }

      if (is_organisation || is_mentor_judge || is_admin) {
        if (
          challengeData &&
          (challengeData.organisationId._id.toString() ===
            localStorage.getItem("userId") ||
            memberAsJudge ||
            is_admin) &&
          challengeData.judgingCriteriaId &&
          challengeData.judgingCriteriaId.data &&
          challengeData.judgingCriteriaId.data.length
        ) {
          changeTabs((data) => {
            if (!data.find((each) => each.value === "Judging Criteria")) {
              data.splice(1, 0, {
                label: t("Judging criteria"),
                value: "Judging Criteria",
              });
            }

            return data;
          });
        } else {
          changeTabs((data) => {
            let judginfCriteriaIndex = data.findIndex(
              (each) => each.value === "Judging Criteria"
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
    is_admin,
    is_organisation,
    is_startup_Individual,
    is_mentor_judge,
    challengeReducer,
    t,
  ]);

  useEffect(() => {
    if (
      challengeData &&
      challengeData.updateId &&
      challengeData.updateId.data &&
      challengeData.updateId.data.length
    ) {
      let count = 0;
      const { data } = challengeData.updateId;
      for (let i = 0; i < data.length; i++) {
        const record = data[i];
        if (
          record &&
          record.viewers &&
          (!record.viewers.length ||
            (record.viewers.length &&
              localStorage.getItem("userId") &&
              record.viewers.indexOf(localStorage.getItem("userId")) < 0))
        ) {
          count++;
        }
      }
      setUpdateCount(count);
    }
  }, [challengeData]);

  useEffect(() => {
    if (match && match.params && match.params.tab) {
      selectTab(match.params.tab);
      if (match.params.tab === "Updates") {
        setUpdateCount(0);
      }
    }
  }, [match]);

  return challengeData &&
    (!challengeData.isPrivate ||
      (challengeData.isPrivate &&
        (organisationTeamMember ||
          memberAsParticipant ||
          memberAsJudge ||
          is_admin ||
          (challengeData.organisationId &&
            challengeData.organisationId.status === Constants.STATUS.ACTIVE &&
            challengeData.organisationId._id &&
            challengeData.organisationId._id.toString() ===
              localStorage.getItem("userId"))))) ? (
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
            <WarningBlock t={t} />
          </Col>
        </Row>
      )}

      {challengeData && !challengeData.isPublished && is_organisation && (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="preview-container">
              <PageTitle text={t("Preview")} />
            </div>
          </Col>
        </Row>
      )}

      {(is_organisation &&
        challengeData &&
        challengeData.organisationId &&
        challengeData.organisationId._id &&
        challengeData.organisationId._id.toString() ===
          localStorage.getItem("userId")) ||
      is_admin ? (
        !challengeData.isPublished ? (
          <Row className="justify-content-center" style={{ marginBottom: 10 }}>
            <Col lg={11} md={11} sm={11} xs={11}>
              <ChallengeHeader
                primaryButtonText={t("Submit for review")}
                primaryButtonClick={() => {
                  if (
                    challengeData &&
                    challengeData.timelineId &&
                    challengeData.timelineId.data &&
                    challengeData.timelineId.data.length &&
                    challengeData.timelineId.data.find(
                      (each) =>
                        each.state.name === "Start" &&
                        new Date(each.startDate) > new Date()
                    )
                  ) {
                    updateChallengeMethod({
                      _id: challengeId,
                      isPublished: true,
                    });
                  } else {
                    setErrors([t("timeline_error")]);
                  }
                }}
                primaryButtonDisable={progress !== 100}
                secondaryButtonText={t("Edit Challenge Details")}
                secondaryButtonClick={() => {
                  history.push(`/challenge/${challengeId}/edit/Description`);
                }}
                challengeData={challengeData}
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
              <ChallengeHeader
                challengeData={challengeData}
                organisationId={challengeData.organisationId}
                secondaryButtonText={t("Edit Challenge Details")}
                secondaryButtonClick={() => {
                  history.push(`/challenge/${challengeId}/edit/Description`);
                }}
              />
            </Col>
          </Row>
        )
      ) : !is_organisation ? (
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
                selectedTab === tabs[0].value || !is_logged_in
                  ? is_mentor_judge && !memberAsJudge
                    ? judgingClosed
                      ? t("Judging Closed")
                      : t("Judge this Challenge")
                    : (is_startup_Individual &&
                        !memberAsParticipant &&
                        !organisationTeamMember) ||
                      !is_logged_in
                    ? submissionClosed
                      ? t("Submission Closed")
                      : t("Solve Challenge")
                    : null
                  : null
              }
              buttonClick={() => {
                if (is_logged_in) {
                  if (is_profile_updated) {
                    if (is_mentor_judge && !judgingClosed) {
                      history.push(`/judges/agreement/${challengeData._id}`);
                    } else if (!submissionClosed) {
                      history.push(`/challenge/agreement/${challengeData._id}`);
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
                (((is_startup_Individual &&
                  !memberAsParticipant &&
                  !organisationTeamMember) ||
                  !is_logged_in) &&
                  submissionClosed) ||
                (is_mentor_judge && !memberAsJudge && judgingClosed)
                  ? "secondary"
                  : "primary"
              }
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
                                    `/challenge/${challengeId}/preview/${each.value}`
                                  );
                                }}
                              >
                                <Nav.Link eventKey={each.value}>
                                  {each.label}
                                </Nav.Link>
                                {each.value === "Updates" &&
                                updateCount &&
                                updateCount > 0 ? (
                                  <div className="count-container">
                                    <span>{updateCount}</span>
                                  </div>
                                ) : null}
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
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              is_mentor_judge={is_mentor_judge}
              is_startup_Individual={is_startup_Individual}
              is_logged_in={is_logged_in}
              is_profile_updated={is_profile_updated}
              setUserFlowModal={setUserFlowModal}
              submissionClosed={submissionClosed}
              judgingClosed={judgingClosed}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Judging Criteria">
            <JudgingCriteria
              t={t}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              challengeData={challengeData}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Submissions">
            {challengeData && (
              <Submissions
                t={t}
                challengeData={challengeData}
                is_startup_Individual={is_startup_Individual}
                is_mentor_judge={is_mentor_judge}
                organisationTeamMember={organisationTeamMember}
                memberAsParticipant={memberAsParticipant}
                is_organisation={is_organisation}
                fromPreview={true}
                match={match}
              />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines">
            <Guidelines
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates">
            <Updates
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline
              t={t}
              challengeData={challengeData}
              is_startup_Individual={is_startup_Individual}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Forum">
            <Forum
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Users">
            <AllUsers
              t={t}
              history={history}
              challengeId={challengeId}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              from_preview={true}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="FAQ">
            <FAQ
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Resources">
            <Resources
              t={t}
              challengeData={challengeData}
              organisationTeamMember={organisationTeamMember}
              is_organisation={is_organisation}
              match={match}
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

      {challengeReducer.loading ? (
        <Loading />
      ) : (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="no-data-text">
              {t("Invitation is expired or Permission denied")}{" "}
              <Link to="/dashboard">{t("explore other challenges")}</Link>
            </div>
          </Col>
        </Row>
      )}
    </MainContainer>
  );
};

export default ChallengePreview;
