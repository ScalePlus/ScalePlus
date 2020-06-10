import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Input, Tab, PrimaryButton } from "../../../common";
import { MainContainer } from "./style";
const stageTabs = [
    "All",
    "Open for Submission",
    "Judging",
    "Voting",
    "Finished",
    "Coming Soon",
  ],
  categoryTabs = [
    "All",
    "Technology",
    "Non-Profit & Social Impact",
    "Education",
    "Healthcare",
    "Engineering",
    "Science",
    "Space",
    "Energy, Environment & Resources",
    "Government",
    "Arts & Design",
    "Data Science",
    "Infrastructure",
    "Finance",
    "Drones",
    "Covid 19",
  ],
  orderByTabs = ["Newest", "Popular"];

const Filters = ({ show, setShow }) => {
  const [stage, selectStage] = useState("");
  const [category, selectCategory] = useState("");
  const [orderby, selectOrder] = useState("");
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="filter-modal"
      centered
    >
      <Modal.Body>
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12} xs={12}>
            <MainContainer>
              <Row>
                <Col>
                  <div className="header-container">
                    <div className="title-text">Filter Challenges</div>
                    <div
                      className="close-button-container"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col ld={6} md={6} sm={12} xs={12}>
                  <Input
                    type="text"
                    placeholder="Search by keyword or title"
                  ></Input>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>Stage</span>
                  </div>
                  <div className="custom-tab-container">
                    {stageTabs.map((each, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            selectStage(each);
                          }}
                          className="custom-tab"
                        >
                          <Tab text={each} isActive={each === stage} />
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>Category</span>
                  </div>
                  <div className="custom-tab-container">
                    {categoryTabs.map((each, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            selectCategory(each);
                          }}
                          className="custom-tab"
                        >
                          <Tab text={each} isActive={each === category} />
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>Order by</span>
                  </div>
                  <div className="custom-tab-container">
                    {orderByTabs.map((each, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            selectOrder(each);
                          }}
                          className="custom-tab"
                        >
                          <Tab text={each} isActive={each === orderby} />
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={"Apply Filter"}
                    onClick={() => {
                      setShow(false);
                    }}
                  ></PrimaryButton>
                </Col>
              </Row>
            </MainContainer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(Filters);
