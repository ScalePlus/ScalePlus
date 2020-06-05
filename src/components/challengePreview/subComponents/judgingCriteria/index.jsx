import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";

const JudgingCriteria = () => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent titleText="Judging Criteria" />
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Proposal quality</span>
                <span className="timestamp">Overall Weight 10</span>
              </div>
              <div className="description">
                Quality of proposal: clear, concise writing; thoughtful and
                complete responses; realistic projections of time needed, effort
                expended, and outcomes attained. High-level project plan that
                demonstrates a potential path for future development of proposed
                payload.
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Capabilities</span>
                <span className="timestamp">Overall Weight 10</span>
              </div>
              <div className="description">
                Technical soundness of proposed payload.
                <br />
                <br />
                Likelihood that it can be successfully integrated into a
                micro-rover and used on the lunar surface.
                <br />
                <br />
                Clear description of new technology/instrumentation to be
                demonstrated, or specific experiment to be run, or other payload
                capability. Likelihood that proposer/proposing team will be able
                to successfully develop proposed payload.
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Technical Maturity </span>
                <span className="timestamp">Overall Weight 30</span>
              </div>
              <div className="description">
                The likelihood that proposed payload can be developed and
                deployed in 1-4 years
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Impact</span>
                <span className="timestamp">Overall Weight 25</span>
              </div>
              <div className="description">
                The potential impact of proposed payload if it is successfully
                developed and deployed.
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Innovation</span>
                <span className="timestamp">Overall Weight 10</span>
              </div>
              <div className="description">
                Novelty or creativity of proposed approach.
                <br />
                <br />
                Elegance of design.
                <br />
                <br />
                Clever use of existing technologies or work-around of existing
                limitations/constraints.
              </div>
            </div>
          </ContentContainer>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(JudgingCriteria);
