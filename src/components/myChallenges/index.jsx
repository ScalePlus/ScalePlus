import React from "react";
import { Row, Col } from "react-bootstrap";
import ChallengesList from "../allChallenges/subComponents/challengesList";
import { CardComponent } from "../common";
import { MainContainer } from "./style";
let cards = [
  {
    src: "/images/Rectangle1.png",
    progress: 80,
    variant: "warning",
    label: "Judging",
  },
  {
    src: "/images/Rectangle2.png",
    progress: 10,
    variant: "success",
    label: "Start",
  },
];

const MyChallenges = ({ history }) => {
  return (
    <MainContainer>
      <div className="my-content-container">
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="header">
              <div className="title">
                <span>My Challenges</span>
              </div>
              <div className="circle-container">
                <span className="count">{cards.length}</span>
              </div>
            </div>
            <div className="card-list">
              <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                {cards.map((each, index) => {
                  return (
                    <Col
                      lg={4}
                      md={6}
                      sm={12}
                      xs={12}
                      key={index}
                      style={{
                        paddingRight: "15px",
                        paddingLeft: "15px",
                      }}
                    >
                      <CardComponent
                        src={each.src}
                        variant={each.variant}
                        progress={each.progress}
                        label={each.label}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <ChallengesList history={history} />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default MyChallenges;
