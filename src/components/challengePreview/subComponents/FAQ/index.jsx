import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";
import history from "../../../../history";

const FAQ = ({ is_organisation, challengeData }) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {is_organisation && challengeData && !challengeData.isPublished ? (
            <HeaderComponent
              titleText="Frequently Asked Questions"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/FAQ`);
              }}
            />
          ) : (
            <HeaderComponent titleText="Frequently Asked Questions" />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          {challengeData.FAQId &&
          challengeData.FAQId.data &&
          challengeData.FAQId.data.length
            ? challengeData.FAQId.data.map((each) => {
                return (
                  <ExpandCollapse
                    key={each._id}
                    title={each.question}
                    description={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: each.answer,
                        }}
                      />
                    }
                  />
                );
              })
            : null}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(FAQ);
