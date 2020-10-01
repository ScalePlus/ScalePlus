import React from "react";
import { Row, Col } from "react-bootstrap";
import ChallengesList from "../allChallenges/subComponents/challengesList";
import MyChallengesList from "./challengeList";
import ListBlock from "./listBlock";
import StartupEcoSystem from "./startUpEcoSystem";
import Team from "./team";
import Charts from "./charts";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const MyChallenges = ({ history }) => {
  const is_admin =
    localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
    localStorage.getItem("token");
  return (
    <MainContainer>
      <Row>
        <Col>
          {is_admin ? (
            <ChallengesList history={history} />
          ) : (
            <MyChallengesList history={history} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <StartupEcoSystem />
        </Col>
      </Row>
      <Row>
        <Col>
          <Team />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListBlock history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Charts history={history} />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default MyChallenges;
