import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Resources = ({
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
          challengeData ? (
            // && !challengeData.isPublished
            <HeaderComponent
              titleText={t("Resources")}
              buttonText={t("Add New")}
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Resources`);
              }}
            />
          ) : (
            <HeaderComponent titleText={t("Resources")} />
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
                    attachmentLink={each.attachmentURL}
                    link={each.link}
                    timestamp={
                      each && each.date
                        ? moment(each.date).format("MMMM DD, YYYY")
                        : null
                    }
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
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Resources);
