import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";

const JudgingCriteria = ({ challengeData }) => {
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
          {challengeData.judgingCriteriaId &&
          challengeData.judgingCriteriaId.data &&
          challengeData.judgingCriteriaId.data.length
            ? challengeData.judgingCriteriaId.data.map((each) => {
                return (
                  <ContentContainer key={each._id}>
                    <div className="collapse-container">
                      <div className="content-container">
                        <span className="title">{each.title}</span>
                        <span className="timestamp">
                          Overall Weight {each.weight}
                        </span>
                      </div>
                      <div className="description">{each.description}</div>
                    </div>
                  </ContentContainer>
                );
              })
            : null}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(JudgingCriteria);
