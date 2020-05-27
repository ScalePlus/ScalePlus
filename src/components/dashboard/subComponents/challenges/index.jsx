import React from "react";
import { MainContainer } from "./style";
import { Row, Col } from "react-bootstrap";

const Challenges = () => {
  return (
    <MainContainer>
      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div className="block">
            <div className="header">
              <span className="title">Challenges</span>
              <span className="count">3</span>
            </div>
            <div className="content-container">
              <div className="border-cotainer">
                <div>
                  <span className="content-title">Challenge 1</span>
                </div>
                <div>
                  <span className="description">
                    Lorem ipsum dolor sit amet, oportere prodesset at mei. Vel
                    in tollit viderer pertinacia. Mel timeam corpora
                    vituperatoribus ei. In inimicus sententiae interesset usu.
                    Cu everti officiis sensibus cum, an theophrastus
                    interpretaris pro. Ut eum aperiri atomorum.
                  </span>
                </div>
              </div>
              <div className="border-cotainer">
                <Row>
                  <Col>
                    <div>
                      <span className="content-title">Start Date</span>
                    </div>
                    <div>
                      <span className="description">04.04.2020</span>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <span className="content-title">End Date</span>
                    </div>
                    <div>
                      <span className="description">04.06.2020</span>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="border-cotainer">
                <div>
                  <span className="content-title">Participants/Matches</span>
                </div>
                <div>
                  <span className="description">6</span>
                </div>
              </div>
              <div className="border-cotainer">
                <div>
                  <span className="content-title">Judges</span>
                </div>
                <div>
                  <span className="description">5</span>
                </div>
              </div>
              <div className="bottom-button-container">
                <div>Modify</div>
                <div>Manage</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Challenges;
