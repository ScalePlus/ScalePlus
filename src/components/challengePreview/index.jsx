import React, { useState } from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import {
  PageTitle,
  WarningBlock,
  ChallengeHeader,
  ChallengeViewHeader,
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
const tabs = [
  "Overview",
  "Judging Criteria",
  "Submissions",
  "Guidelines",
  "Updates",
  "Timeline",
  "Forum",
  "FAQ",
  "Resources",
];

const ChallengePreview = ({ history }) => {
  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE &&
      localStorage.getItem("token");
  const [selectedTab, selectTab] = useState(tabs[0]);
  const [show, setUserFlowModal] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  return (
    <MainContainer>
      {isOrganisation && (
        <Row>
          <Col>
            <WarningBlock />
          </Col>
        </Row>
      )}

      {isOrganisation && (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="preview-container">
              <PageTitle text="Preview" />
            </div>
          </Col>
        </Row>
      )}

      {isOrganisation && (
        <Row className="justify-content-center" style={{ marginBottom: 10 }}>
          <Col lg={11} md={11} sm={11} xs={11}>
            <ChallengeHeader
              primaryButtonText="Submit for review"
              secondaryButtonText="Edit Challenge Details"
              primaryButtonClick={() => {}}
              secondaryButtonClick={() => {
                history.push("/challenge/edit");
              }}
            />
          </Col>
        </Row>
      )}

      {!isOrganisation && (
        <Row
          className="justify-content-center"
          style={{ marginBottom: 10, marginTop: 20 }}
        >
          <Col lg={11} md={11} sm={11} xs={11}>
            <ChallengeViewHeader
              primaryButtonText={
                isMentor_Judge ? "Judge this Challenge" : "Solve Challenge"
              }
              primaryButtonClick={() => {
                if (isLoggedIn) {
                  history.push("/solve/challenge");
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
                  <Tab.Container
                    activeKey={selectedTab}
                    // onSelect={(k) => selectTab(k)}
                  >
                    <Nav>
                      {tabs.map((each, index) => {
                        return (
                          <Nav.Item
                            key={index}
                            onClick={() => {
                              selectTab(each);
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
                      })}
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
              isOrganisation={isOrganisation}
              isMentor_Judge={isMentor_Judge}
              isLoggedIn={isLoggedIn}
              setUserFlowModal={setUserFlowModal}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Judging Criteria">
            <JudgingCriteria />
          </Tab.Pane>
          <Tab.Pane eventKey="Submissions">
            <Submissions
              isStartUp_Individual={isStartUp_Individual}
              isMentor_Judge={isMentor_Judge}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines">
            <Guidelines />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates">
            <Updates />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline isStartUp_Individual={isStartUp_Individual} />
          </Tab.Pane>
          <Tab.Pane eventKey="Forum">
            <Forum />
          </Tab.Pane>
          <Tab.Pane eventKey="FAQ">
            <FAQ />
          </Tab.Pane>
          <Tab.Pane eventKey="Resources">
            <Resources />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <UserFlowModal
        show={show}
        setUserFlowModal={setUserFlowModal}
        history={history}
      />
    </MainContainer>
  );
};

export default ChallengePreview;
