import React, { useState } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { WarningBlock, ChallengeHeader, PrimaryButton } from "../common";
import Description from "./subComponents/description";
import Overview from "./subComponents/overview";
import FAQ from "./subComponents/FAQ";
import Resources from "./subComponents/resources";
import Guidelines from "./subComponents/guidelines";
import Updates from "./subComponents/updates";
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

const submissionLinks = [
  "Submission form",
  "Judging criteria",
  "Judging activities",
  "Judges",
  "Judges NDA",
];

const otherLinks = ["Legal agreement", "Settings"];

const ChallengeEdit = ({ history }) => {
  const [activeKey, selectKey] = useState(challengeLinks[0]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <WarningBlock />
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginBottom: 50 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <ChallengeHeader
            primaryButtonText="Submit for review"
            secondaryButtonText="Save Draft"
            primaryButtonClick={() => {
              history.push("/challenge/preview");
            }}
            secondaryButtonClick={() => {
              history.push("/challenge/preview");
            }}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={3} md={4} sm={4} xs={12}>
              <div className="custom-sidebar">
                <div>
                  <div className="title">
                    <span>Challenge page</span>
                  </div>
                  <Nav
                    activeKey={activeKey}
                    onSelect={(k) => selectKey(k)}
                    className="flex-column"
                  >
                    {challengeLinks.map((each, index) => {
                      return (
                        <Nav.Item key={index}>
                          <Nav.Link eventKey={each}>{each}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </div>
                <div style={{ marginTop: 20 }}>
                  <div className="title">
                    <span>Submissions and judging</span>
                  </div>
                  <Nav
                    activeKey={activeKey}
                    onSelect={(k) => selectKey(k)}
                    className="flex-column"
                  >
                    {submissionLinks.map((each, index) => {
                      return (
                        <Nav.Item key={index}>
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
                  <Nav
                    activeKey={activeKey}
                    onSelect={(k) => selectKey(k)}
                    className="flex-column"
                  >
                    {otherLinks.map((each, index) => {
                      return (
                        <Nav.Item key={index}>
                          <Nav.Link eventKey={each}>{each}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </div>
              </div>
              <div className="button-container">
                <PrimaryButton
                  variant="primary"
                  text={"Need Help?"}
                  onClick={() => {}}
                ></PrimaryButton>
              </div>
            </Col>
            <Col lg={9} md={8} sm={8} xs={12}>
              <div className="content-container">
                {activeKey === "Description" && <Description />}
                {activeKey === "Overview" && <Overview />}
                {activeKey === "FAQ" && <FAQ />}
                {activeKey === "Resources" && <Resources />}
                {activeKey === "Guidelines" && <Guidelines />}
                {activeKey === "Updates" && <Updates />}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ChallengeEdit;
