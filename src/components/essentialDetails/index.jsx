import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import { Title, TextArea, PrimaryButton, BackButton, Tab } from "../common";
import { Constants } from "../../lib/constant";

const EssentialDetail = ({ history }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [coreBusinessTabs, selectCoreBusinessTab] = useState([
    {
      id: 1,
      text: "Software",
      isActive: true,
    },
    {
      id: 2,
      text: "Physical Products",
      isActive: false,
    },
    {
      id: 3,
      text: "Consulting",
      isActive: false,
    },
  ]);
  const [marketStageTabs, selectMarketStageTab] = useState([
    {
      id: 1,
      text: "Idea",
      isActive: true,
    },
    {
      id: 2,
      text: "Prototype",
      isActive: false,
    },
    {
      id: 3,
      text: "Ready For Market",
      isActive: false,
    },
    {
      id: 4,
      text: "Product Released",
      isActive: false,
    },
  ]);
  const [fundingTabs, selectFundingTab] = useState([
    {
      id: 1,
      text: "Consulting",
      isActive: true,
    },
    {
      id: 2,
      text: "Ext. Investment",
      isActive: false,
    },
    {
      id: 3,
      text: "Revenue",
      isActive: false,
    },
  ]);
  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Essential Detail"}></Title>
            </Col>
          </Row>

          <Row className="form-container">
            <Col>
              <Form>
                <TextArea
                  rows="12"
                  placeholder={
                    isStartUp_Individual || isOrganisation
                      ? "Company Description"
                      : isMentor_Judge
                      ? "Summary"
                      : ""
                  }
                  value={textAreaValue}
                  onChange={(e) => {
                    setTextAreaValue(e.target.value);
                  }}
                />
              </Form>
            </Col>
          </Row>

          <Row className="tab-title">
            <Col>
              <span>Core Business</span>
            </Col>
          </Row>
          <Row className="tab-container">
            {coreBusinessTabs.map((each) => {
              return (
                <Col
                  key={each.id}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  onClick={() => {
                    selectCoreBusinessTab(
                      coreBusinessTabs.map((record) => {
                        if (record.id === each.id) {
                          record.isActive = true;
                          return record;
                        } else {
                          record.isActive = false;
                          return record;
                        }
                      })
                    );
                  }}
                >
                  <div
                    className={
                      each.id !==
                      coreBusinessTabs[coreBusinessTabs.length - 1].id
                        ? "outer-tab-container"
                        : ""
                    }
                  >
                    <Tab text={each.text} isActive={each.isActive} />
                  </div>
                </Col>
              );
            })}
          </Row>

          <Row className="tab-title">
            <Col>
              <span>
                {isStartUp_Individual || isOrganisation
                  ? "Market Stage"
                  : isMentor_Judge
                  ? "Expertise"
                  : ""}
              </span>
            </Col>
          </Row>
          <Row className="tab-container">
            {marketStageTabs.map((each) => {
              return (
                <Col
                  key={each.id}
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  onClick={() => {
                    selectMarketStageTab(
                      marketStageTabs.map((record) => {
                        if (record.id === each.id) {
                          record.isActive = true;
                          return record;
                        } else {
                          record.isActive = false;
                          return record;
                        }
                      })
                    );
                  }}
                >
                  <div
                    className={
                      each.id !== marketStageTabs[marketStageTabs.length - 1].id
                        ? "outer-tab-container"
                        : ""
                    }
                  >
                    <Tab text={each.text} isActive={each.isActive} />
                  </div>
                </Col>
              );
            })}
          </Row>

          {isStartUp_Individual || isOrganisation ? (
            <>
              <Row className="tab-title">
                <Col>
                  <span>Funding</span>
                </Col>
              </Row>
              <Row className="tab-container">
                {fundingTabs.map((each) => {
                  return (
                    <Col
                      key={each.id}
                      lg={4}
                      md={6}
                      sm={6}
                      xs={12}
                      onClick={() => {
                        selectFundingTab(
                          fundingTabs.map((record) => {
                            if (record.id === each.id) {
                              record.isActive = true;
                              return record;
                            } else {
                              record.isActive = false;
                              return record;
                            }
                          })
                        );
                      }}
                    >
                      <div
                        className={
                          each.id !== fundingTabs[fundingTabs.length - 1].id
                            ? "outer-tab-container"
                            : ""
                        }
                      >
                        <Tab text={each.text} isActive={each.isActive} />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : null}

          <Row className="button-container">
            <Col lg={2} md={2} sm={2} xs={2}>
              <BackButton
                text={"Back"}
                onClick={() => {
                  history.goBack();
                }}
              ></BackButton>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <PrimaryButton
                text={
                  isStartUp_Individual
                    ? "Add Members"
                    : isOrganisation
                    ? "Create My Account"
                    : isMentor_Judge
                    ? "Join"
                    : ""
                }
                onClick={() => {
                  localStorage.clear();
                  history.push("/");
                }}
              ></PrimaryButton>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2} />
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default EssentialDetail;
