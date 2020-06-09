import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import { WarningBlock, ChallengeHeader, PrimaryButton } from "../common";
import Description from "./subComponents/description";
import Overview from "./subComponents/overview";
import Timeline from "./subComponents/timeline";
import FAQ from "./subComponents/FAQ";
import Resources from "./subComponents/resources";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
import SubmissionForm from "./subComponents/submissionForm";
import Submissions from "./subComponents/submissions";
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
  const [activeKey, selectTab] = useState(null);
  const [expanded, onToggle] = useState(false);
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

  return (
    <MainContainer>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <WarningBlock />
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginBottom: 35 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <ChallengeHeader
            primaryButtonText="Submit for review"
            secondaryButtonText="Save Draft"
            primaryButtonClick={() => {
              history.push("/challenge/preview/Overview");
            }}
            secondaryButtonClick={() => {
              history.push("/challenge/preview/Overview");
            }}
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
                                  history.push(`/challenge/edit/${each}`);
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
                                  history.push(`/challenge/edit/${each}`);
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
                                  history.push(`/challenge/edit/${each}`);
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
                                  history.push(`/challenge/edit/${each}`);
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
                {activeKey === "Description" && <Description />}
                {activeKey === "Overview" && <Overview />}
                {activeKey === "Timeline" && <Timeline />}
                {activeKey === "FAQ" && <FAQ />}
                {activeKey === "Resources" && <Resources />}
                {activeKey === "Guidelines" && <Guidelines />}
                {activeKey === "Updates" && <Updates />}
                {activeKey === "Submission form" && <SubmissionForm />}
                {activeKey === "Submissions" && <Submissions />}
                {activeKey === "Judging criteria" && <JudgingCriteria />}
                {activeKey === "Judging activities" && <JudgingActivities />}
                {activeKey === "Judges" && <Judges />}
                {activeKey === "Judges NDA" && <JudgesNDA />}
                {activeKey === "Team" && <Team />}
                {activeKey === "Legal agreement" && <LegalAgreement />}
                {activeKey === "Settings" && <Settings />}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ChallengeEdit;
