import React from "react";
import { Row, Col } from "react-bootstrap";
import ChallengesList from "./subComponents/challengesList";
import Footer from "../footer";
import { PrimaryButton } from "../common";
import { MainContainer } from "./style";

const AllChallenges = ({ history }) => {
  return (
    <MainContainer>
      <div className="subscribe-container">
        <Row className="justify-content-center">
          <Col lg={4} md={8} sm={12} xs={12}>
            <Row>
              <Col>
                <span className="text">
                  Be the first to know when crowdsourcing projects like this are
                  posted.
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <div className="button-container">
                  <PrimaryButton
                    variant="secondary"
                    text={"Subscribe"}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <ChallengesList history={history} />
      <Footer />
    </MainContainer>
  );
};

export default AllChallenges;
