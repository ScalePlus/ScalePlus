import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Filters from "./subComponents/filter";
import { PrimaryButton } from "../common";
import { MainContainer } from "./style";
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

export default function AllChallenges() {
  const [show, setShow] = useState(false);
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
      <div className="content-container">
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
                  <div
                    className="filter-container"
                    onClick={() => setShow(true)}
                  >
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
                        >
                          <div>
                            <Card>
                              <Card.Img variant="top" src={each.src} />
                              <Card.Body>
                                <Card.Text>By Rio Tinto</Card.Text>
                                <Card.Title>
                                  Low Impact Agriculture Challenge
                                </Card.Title>
                                <Card.Text className="description">
                                  Lorem ipsum dolor sit amet, oportere prodesset
                                  at mei. Vel in tollit viderer pertinacia. Mel
                                  timeam corpora vituperatoribus ei. In inimicus
                                  sententiae interesset usu……everti officiis
                                  sensibus cum, an theophrastus interpretaris
                                  pro. Ut eum aperiri atomorum.
                                </Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <div className="days-container">
                                  <img
                                    src={"/images/interface.svg"}
                                    height="25px"
                                    width="25px"
                                    alt=""
                                  ></img>
                                  <div className="days-text">
                                    <span>30 days left</span>
                                  </div>
                                </div>
                                <div className="prize-text">
                                  <span>Prize AED 50K </span>
                                </div>
                              </Card.Footer>
                            </Card>
                            <div className="circle-container">
                              <img
                                src={"/images/image.svg"}
                                height="40px"
                                width="40px"
                                alt=""
                              ></img>
                            </div>
                          </div>
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
      </div>
      <Filters show={show} setShow={setShow} />
    </MainContainer>
  );
}
