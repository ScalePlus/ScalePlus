import React, { useState } from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PrimaryButton, PageTitle } from "../common";
import theme from "../../theme";
import { MainContainer, WarningContainer, TabContainer } from "./style";
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

function ChallengePreview() {
  const [selectedTab, selectTab] = useState(tabs[0]);

  return (
    <MainContainer>
      <Row>
        <Col>
          <WarningContainer>
            <span>
              The challenge is not published yet. Before you can publish, you
              will need to request an invoice to pay the platform fee and have
              Scale+ team review the content of your page.{" "}
              <b className="read-more-text bold-text">Read more.</b> <br /> If
              you have any questions, please contact us by emailing{" "}
              <b className="bold-text">help@scaleplus.co</b>
            </span>
          </WarningContainer>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="preview-container">
            <PageTitle text="Preview" />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginBottom: 25 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row style={{ alignItems: "center" }}>
            <Col lg={6} md={6} sm={6} xs={12}>
              <div className="left-continer">
                <div className="oval-container">
                  <img
                    src={"/images/image.svg"}
                    height="20px"
                    width="20px"
                    alt=""
                  ></img>
                </div>
                <div className="organization-name">
                  <span>Organization Name Here</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <div className="right-continer">
                <CircularProgressbar
                  value={20}
                  text={`${20}%`}
                  className="progress-oval-container"
                  background={true}
                  styles={buildStyles({
                    textSize: "30px",
                    pathColor: "#4CD964",
                    textColor: theme.colors.black,
                    trailColor: "#d7d7d7",
                    backgroundColor: theme.colors.white,
                  })}
                />
                <div style={{ margin: "0px 10px" }}>
                  <PrimaryButton
                    variant="secondary"
                    text={"Edit Challenge Details"}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
                <PrimaryButton
                  variant="primary"
                  text={"Submit for review"}
                  onClick={() => {}}
                ></PrimaryButton>
              </div>
            </Col>
          </Row>
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
                    onSelect={(k) => selectTab(k)}
                  >
                    <Nav>
                      {tabs.map((each, index) => {
                        return (
                          <Nav.Item key={index}>
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
