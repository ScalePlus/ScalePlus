import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Filters from "../filter";
import { ChallengesListContainer } from "./style";
import { PrimaryButton, CardComponent } from "../../../common";
let cards = [
  { src: "/images/Rectangle1.png" },
  { src: "/images/Rectangle2.png" },
  { src: "/images/Rectangle3.png" },
  { src: "/images/Rectangle4.png" },
  { src: "/images/Rectangle5.png" },
  { src: "/images/Rectangle6.png" },
  { src: "/images/Rectangle7.png" },
  { src: "/images/Rectangle2.png" },
  { src: "/images/Rectangle1.png" },
  { src: "/images/Rectangle4.png" },
  { src: "/images/Rectangle5.png" },
  { src: "/images/Rectangle6.png" },
];

const ChallengesList = ({ history }) => {
  const [show, setShow] = useState(false);
  return (
    <ChallengesListContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row style={{ marginTop: 45 }}>
            <Col>
              <div className="header-container">
                <span className="title-text">Explore Challenges</span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="sub-header-container">
                <div className="text">
                  <span>Find a challenge, solve it, make a difference</span>
                </div>
                <div className="filter-container" onClick={() => setShow(true)}>
                  <div>
                    <img
                      src={"/images/filter-icon.png"}
                      height="20px"
                      width="20px"
                      alt=""
                    ></img>
                  </div>
                  <div className="filter-text">
                    <span>Filters</span>
                  </div>
                  <div className="filter-count">
                    <span className="count-text">2</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: 25 }}>
            <Col>
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
                        onClick={() => {
                          history.push("/challenge/preview");
                        }}
                      >
                        <CardComponent src={each.src} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col>
              <div className="bottom-button-container">
                <PrimaryButton
                  variant="primary"
                  text={"Load More Challenges"}
                  onClick={() => {}}
                ></PrimaryButton>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Filters show={show} setShow={setShow} />
    </ChallengesListContainer>
  );
};

export default React.memo(ChallengesList);
