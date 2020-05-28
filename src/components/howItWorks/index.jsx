import React from "react";
import { Row, Col } from "react-bootstrap";
import Footer from "../footer";
import { PrimaryButton } from "../common";
import { MainContainer } from "./style";

const HowItWorks = () => {
  return (
    <MainContainer>
      <div className="subscribe-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>Innovate the easy way.</span>
                </div>
                <div className="description">
                  <span>
                    Find innovative solutions on Scale Plus through the power of
                    crowdsourcing. We provide a two-sided platform where our
                    clients design challenges around problems they need solved,
                    and our solvers work to come up with a solution and win the
                    prize.
                  </span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="primary"
                    text={"Evaluate My Challenge"}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} />
            </Row>
          </Col>
        </Row>
      </div>
      <div className="time-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="timer-image-container"
              >
                <img alt="" src="/images/timer.png"></img>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>How Much Time Will it Take to Get a Solution?</span>
                </div>
                <div className="description">
                  <span>
                    On average, challenges run between 2 to 4 months. Some of
                    the more technical challenges can run for much longer. With
                    so much flexibility on our platform, you can customize how
                    long you’ll give the crowd to present your solution.
                  </span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="primary"
                    text={"Launch My Challenge Now"}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="expert-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>Can I Get Help Setting Up My Challenge?</span>
                </div>
                <div className="description">
                  <span>
                    Yes. Scale Plus has plenty of experts who are willing to
                    help. Use their expertise in every aspect of your challenge
                    with the Custom Challenge Package. Contact now to get your
                    challenge started today!
                  </span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="secondary"
                    text={"Meet Our Challenge Expert"}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="live-image-container"
              >
                <img alt="" src="/images/live.png"></img>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="expect-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={8} md={10} sm={12} xs={12}>
            <Row>
              <Col>
                <div className="title">
                  <span>What Should I Expect?</span>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/platform.png"></img>
              </Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">
                  A ready to use platform, which gives you everything you need
                  to run a challenge.
                </span>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={1} md={1} sm={1} xs={1}></Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">
                  Incredible solutions from minds all over the world.
                </span>
              </Col>
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/solver.png"></img>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/live-1.png"></img>
              </Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">
                  Guidance and support from a challenge expert at Scale Plus.
                </span>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={1} md={1} sm={1} xs={1}></Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">
                  Access to a full knowledge base with best practices,
                  templates, and tools.
                </span>
              </Col>
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/knowledge-base.png"></img>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Footer />
    </MainContainer>
  );
};

export default HowItWorks;
