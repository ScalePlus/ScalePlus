import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const JudgingCriteria = ({
  t,
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
              titleText={t("Judging criteria")}
              buttonText={t("Edit")}
              buttonVariant="info"
              buttonClick={() => {
                history.push(
                  `/challenge/${challengeData._id}/edit/Judging Criteria`
                );
              }}
            />
          ) : (
            <HeaderComponent titleText={t("Judging criteria")} />
          )}
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
                          {t("Overall Weight")} {each.weight}
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
