import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Updates = ({
  is_organisation,
  organisationTeamMember,
  challengeData,
}) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {(is_organisation ||
            (organisationTeamMember &&
              organisationTeamMember.permission ===
                Constants.TEAM_PERMISSION.ADMIN)) &&
          challengeData &&
          !challengeData.isPublished ? (
            <HeaderComponent
              titleText="Updates"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Updates`);
              }}
            />
          ) : (
            <HeaderComponent titleText="Updates" />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          {challengeData.updateId &&
          challengeData.updateId.data &&
          challengeData.updateId.data.length
            ? challengeData.updateId.data.map((each) => {
                return (
                  <ContentContainer key={each._id}>
                    <div className="collapse-container">
                      <div className="content-container">
                        <span className="title">{each.title}</span>
                        <span className="timestamp">
                          {each && each.date
                            ? moment(each.date).format("MMMM DD, YYYY")
                            : null}
                        </span>
                      </div>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: each.description,
                        }}
                      />
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

export default React.memo(Updates);
