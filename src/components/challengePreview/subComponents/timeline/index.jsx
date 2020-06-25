import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, VeticalStepper } from "../common";
import moment from "moment";
import { MainContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Timeline = ({
  is_startup_Individual,
  is_organisation,
  organisationTeamMember,
  challengeData,
}) => {
  const [currentMilestone, setCurrentMilestone] = useState(null);
  useEffect(() => {
    if (challengeData) {
      const { timelineId } = challengeData;
      let selectedData = null;

      if (timelineId && timelineId.data && timelineId.data.length) {
        const { data } = timelineId;

        for (let i = 0; i < data.length; i++) {
          const each = data[i];
          if (selectedData) {
            selectedData =
              new Date(each.date).setHours(0, 0, 0, 0) <=
                new Date().setHours(0, 0, 0, 0) &&
              new Date(each.date).setHours(0, 0, 0, 0) >=
                new Date(selectedData.date).setHours(0, 0, 0, 0)
                ? each
                : selectedData;
          } else {
            selectedData =
              new Date(each.date).setHours(0, 0, 0, 0) ===
              new Date().setHours(0, 0, 0, 0)
                ? each
                : selectedData;
          }
        }
        if (selectedData) {
          setCurrentMilestone(selectedData);
        }
      }
    }
  }, [challengeData]);

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
              titleText="Timeline"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Timeline`);
              }}
            />
          ) : (
            <HeaderComponent titleText="Timeline" />
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
                ? challengeData.timelineId.data.map((each) => {
                    return {
                      active: currentMilestone
                        ? currentMilestone._id.toString() ===
                          each._id.toString()
                        : false,
                      timestamp: moment(each.date).format("MMMM DD, YYYY"),
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
