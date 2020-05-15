import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PrimaryButton } from "../common";
import theme from "../../theme";
import { MainContainer, WarningContainer, TabContainer } from "./style";
import OverView from "./subComponents/overview";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
import Timeline from "./subComponents/timeline";
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
  const [selectedTab, selectTab] = useState(tabs[3]);
  return (
    <MainContainer>
      <Row>
        <Col>
          <WarningContainer>
            <span>
              The challenge is not published yet. Before you can publish, you
              will need to request an invoice to pay the platform fee and have
              Scale+ team review the content of your page. <b>Read more.</b> If
              you have any questions, please contact us by emailing{" "}
              <b>help@scaleplus.co</b>
            </span>
          </WarningContainer>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="preview-container">
            <span>Preview</span>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginBottom: 15 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row style={{ alignItems: "center" }}>
            <Col lg={6} md={6} sm={6} xs={12}>
              <div className="left-continer">
                <div className="oval-container">
                  <img
                    src={"/images/image.svg"}
                    height="25px"
                    width="25px"
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
                  styles={buildStyles({
                    pathColor: `#4CD964`,
                    textColor: theme.colors.black,
                    trailColor: "#d7d7d7",
                    backgroundColor: theme.colors.white,
                  })}
                />
                <div style={{ margin: "0px 15px" }}>
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

      <Row className="justify-content-center full-width-cotainer">
        <Col>
          <TabContainer>
            <Row className="justify-content-center">
              <Col md={11}>
                <div className="tabs">
                  {tabs.map((each, index) => {
                    return (
                      <div key={index}>
                        <div
                          className={
                            each === selectedTab ? "selected-tab tab" : "tab"
                          }
                        >
                          <span onClick={() => selectTab(each)}>{each}</span>
                          <div className="tab-border"></div>
                        </div>
                        {each === "Updates" && (
                          <div className="count-container">
                            <span>1</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </TabContainer>
        </Col>
      </Row>
      {selectedTab === "Overview" && <OverView />}
      {selectedTab === "Guidelines" && <Guidelines />}
      {selectedTab === "Updates" && <Updates />}
      {selectedTab === "Timeline" && <Timeline />}
      {selectedTab === "FAQ" && <FAQ />}
      {selectedTab === "Resources" && <Resources />}
    </MainContainer>
  );
}

export default ChallengePreview;
