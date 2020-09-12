import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, VeticalStepper } from "../common";
import moment from "moment";
import { MainContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Timeline = ({
  t,
  is_startup_Individual,
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
              titleText={t("Timeline")}
              buttonText={t("Add New")}
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Timeline`);
              }}
            />
          ) : (
            <HeaderComponent titleText={t("Timeline")} />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <VeticalStepper
            is_startup_Individual={is_startup_Individual}
            steps={
              challengeData.timelineId &&
              challengeData.timelineId.data &&
              challengeData.timelineId.data.length
                ? challengeData.timelineId.data.map((each, index) => {
                    return {
                      completed:
                        each && each.startDate && each.endDate
                          ? new Date(each.startDate) <= new Date() &&
                            new Date(each.endDate) <= new Date()
                          : false,
                      lastCompleted:
                        each && each.startDate && each.endDate
                          ? new Date(each.startDate) <= new Date() &&
                            new Date(each.endDate) <= new Date() &&
                            challengeData.timelineId.data.find(
                              (rec, ind) =>
                                ind === index + 1 &&
                                (new Date(rec.startDate) >= new Date() ||
                                  (new Date(rec.startDate) <= new Date() &&
                                    new Date() <= new Date(rec.endDate)))
                            )
                          : false,
                      active:
                        each && each.startDate && each.endDate
                          ? new Date(each.startDate) <= new Date() &&
                            new Date() <= new Date(each.endDate)
                          : false,
                      timestamp:
                        moment(each.startDate).format("MMMM DD, YYYY, h:mm a") +
                        " - " +
                        moment(each.endDate).format("MMMM DD, YYYY, h:mm a"),
                      title: each.state && each.state.name,
                      description: each.description,
                      downloadFiles:
                        each.adminAttachments && each.adminAttachments.length
                          ? each.adminAttachments
                          : [],
                    };
                  })
                : null
            }
          ></VeticalStepper>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Timeline);
