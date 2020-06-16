import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";
import history from "../../../../history";

const Resources = ({ is_organisation, challengeData }) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {is_organisation ? (
            <HeaderComponent
              titleText="Resources"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Resources`);
              }}
            />
          ) : (
            <HeaderComponent titleText="Resources" />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          {challengeData.resourceId &&
          challengeData.resourceId.data &&
          challengeData.resourceId.data.length
            ? challengeData.resourceId.data.map((each) => {
                return (
                  <ExpandCollapse
                    key={each._id}
                    title={each.title}
                    description={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: each.description,
                        }}
                      />
                    }
                  />
                );
              })
            : null}
          <ExpandCollapse
            title="Challenge NDA Document"
            timestamp="time/date stamp"
            link="Attachment link here as hyperlink"
            description="Attachment content description here"
          />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Resources);
