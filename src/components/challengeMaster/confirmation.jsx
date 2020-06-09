import React from "react";
import { Row, Col } from "react-bootstrap";
import { PrimaryButton, PageTitle } from "../common";
import { MainContainer } from "./style";
import history from "../../history";

const ChallengeConfirmation = () => {
  return (
    <MainContainer>
      <Row className="justify-content-center challenge-completed-container">
        <Col lg={5} md={10} sm={12}>
          <Row style={{ marginBottom: "20px" }}>
            <Col>
              <div className="image-container">
                <img
                  src={"/images/launch.svg"}
                  height="210px"
                  width="210px"
                  alt=""
                ></img>
              </div>
            </Col>
          </Row>
          <Row className="title-container" style={{ marginBottom: "15px" }}>
            <Col>
              <PageTitle text="Challenge Created!" />
            </Col>
          </Row>
          <Row className="sub-title" style={{ marginBottom: "35px" }}>
            <Col>New 1</Col>
          </Row>
          <Row className="description" style={{ marginBottom: "50px" }}>
            <Col>
              Great job on creating a challenge! Scale+ team will review the
              content and give you the green light to go live if you want.
            </Col>
          </Row>
          <Row style={{ marginBottom: "50px" }}>
            <Col lg={2} md={2} sm={2} xs={2} />
            <Col lg={4} md={4} sm={4} xs={4} className="center-component">
              <PrimaryButton
                variant="secondary"
                text={"Edit Challenge Details"}
                onClick={() => {
                  history.push("/challenge/edit/Description");
                }}
              ></PrimaryButton>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="center-component">
              <PrimaryButton
                variant="primary"
                text={"Preview Challenge"}
                onClick={() => {
                  history.push("/challenge/preview/Overview");
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

export default ChallengeConfirmation;
