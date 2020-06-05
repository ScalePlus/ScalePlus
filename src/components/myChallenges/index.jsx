import React from "react";
import { Row, Col } from "react-bootstrap";
import ChallengesList from "../allChallenges/subComponents/challengesList";
import MyChallengesList from "./challengeList";
import { MainContainer } from "./style";

const MyChallenges = ({ history }) => {
  return (
    <MainContainer>
      <Row>
        <Col>
          <MyChallengesList history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChallengesList history={history} />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default MyChallenges;
