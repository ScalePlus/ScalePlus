import React, { useState, useEffect } from "react";
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

const ChallengePreview = ({ history, match }) => {
  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE &&
      localStorage.getItem("token"),
    isLoggedIn = localStorage.getItem("token"),
    isProfileUpdated = localStorage.getItem("profileUpdated");
  const [tabs, changeTabs] = useState([
    "Overview",
    "Guidelines",
    "Updates",
    "Timeline",
    "Forum",
    "FAQ",
    "Resources",
  ]);
  const [selectedTab, selectTab] = useState(null);
  const [show, setUserFlowModal] = useState(false);

  useEffect(() => {
    if (isOrganisation || isStartUp_Individual) {
      changeTabs((data) => {
        data.splice(1, 0, "Submissions");
        return data;
      });
    }
    if (isMentor_Judge) {
      changeTabs((data) => {
        data.splice(1, 0, "Judging Criteria");
        data.splice(2, 0, "Submissions");
        return data;
      });
    }
  }, [isOrganisation, isStartUp_Individual, isMentor_Judge]);

  useEffect(() => {
    if (match && match.params && match.params.tab) {
      selectTab(
        tabs.find(
          (each) =>
            each.toLocaleLowerCase() === match.params.tab.toLocaleLowerCase()
        )
      );
    }
  }, [match, tabs]);

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
                history.push("/challenge/edit/Description");
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
                selectedTab === tabs[0] || !isLoggedIn
                  ? isMentor_Judge
                    ? "Judge this Challenge"
                    : "Solve Challenge"
                  : null
              }
              primaryButtonClick={() => {
                if (isLoggedIn) {
                  if (isProfileUpdated) {
                    if (isMentor_Judge) {
                      history.push("/dashboard");
                    } else {
                      history.push("/solve/challenge");
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
                                  history.push(`/challenge/preview/${each}`);
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
              isOrganisation={isOrganisation}
              isMentor_Judge={isMentor_Judge}
              isLoggedIn={isLoggedIn}
              isProfileUpdated={isProfileUpdated}
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
              isOrganisation={isOrganisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines" isOrganisation={isOrganisation}>
            <Guidelines />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates" isOrganisation={isOrganisation}>
            <Updates />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline
              isStartUp_Individual={isStartUp_Individual}
              isOrganisation={isOrganisation}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="Forum" isOrganisation={isOrganisation}>
            <Forum />
          </Tab.Pane>
          <Tab.Pane eventKey="FAQ" isOrganisation={isOrganisation}>
            <FAQ />
          </Tab.Pane>
          <Tab.Pane eventKey="Resources" isOrganisation={isOrganisation}>
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
