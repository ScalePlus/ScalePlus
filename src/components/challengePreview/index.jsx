import React, { useState } from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { PageTitle, WarningBlock, ChallengeHeader } from "../common";
import { MainContainer, TabContainer } from "./style";
import OverView from "./subComponents/overview";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
import Timeline from "./subComponents/timeline";
import Forum from "./subComponents/forum";
import FAQ from "./subComponents/FAQ";
import Resources from "./subComponents/resources";
import "react-circular-progressbar/dist/styles.css";
const tabs = [
  "Overview",
  "Guidelines",
  "Updates",
  "Timeline",
  "Forum",
  "FAQ",
  "Resources",
];

function ChallengePreview({ history }) {
  const [selectedTab, selectTab] = useState(tabs[0]);

  return (
    <MainContainer>
      <Row>
        <Col>
          <WarningBlock />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="preview-container">
            <PageTitle text="Preview" />
          </div>
        </Col>
      </Row>

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
            <OverView />
          </Tab.Pane>
          <Tab.Pane eventKey="Guidelines">
            <Guidelines />
          </Tab.Pane>
          <Tab.Pane eventKey="Updates">
            <Updates />
          </Tab.Pane>
          <Tab.Pane eventKey="Timeline">
            <Timeline />
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
    </MainContainer>
  );
}

export default ChallengePreview;
