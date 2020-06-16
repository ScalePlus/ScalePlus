import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, VeticalStepper } from "../common";
import moment from "moment";
import { MainContainer } from "./style";
import history from "../../../../history";
const stateList = [
  { value: "1", label: "Start" },
  { value: "2", label: "Submission Deadline" },
  { value: "3", label: "Judging" },
  { value: "4", label: "Judging Closed" },
  { value: "5", label: "Won" },
];

const Timeline = ({
  is_startup_Individual,
  is_organisation,
  challengeData,
}) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {is_organisation ? (
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
                      active: false,
                      timestamp: moment(each.date).format("MMMM DD, YYYY"),
                      title: stateList.find(
                        (option) => option.value === each.state
                      ).label,
                      description: each.description,
                    };
                  })
                : null
            }
            // steps={[
            //   {
            //     active: false,
            //     timestamp: "April 9, 2020, 9 a.m. +04",
            //     title: "Date Launched",
            //     description:
            //       "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
            //   },
            //   {
            //     active: false,
            //     timestamp: "April 9, 2020, 5 p.m. +04",
            //     title: "Enter",
            //     description:
            //       "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
            //     downloadFiles: [
            //       "Download Challenge entry form",
            //       "Download Some form",
            //       "Download Some form",
            //     ],
            //   },
            //   {
            //     active: true,
            //     timestamp: "April 30, 2020, 8:07 a.m. +04",
            //     title: "You are here",
            //     description:
            //       "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
            //     // uploadFiles: [
            //     //   "Submit Challenge entry form",
            //     //   "Submit Some form",
            //     //   "Submit Challenge entry form",
            //     // ],
            //   },
            //   {
            //     active: false,
            //     timestamp: "June 9, 2020, 1 a.m. +04",
            //     title: "Submission Deadline",
            //     description:
            //       "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
            //   },
            //   {
            //     active: false,
            //     timestamp: "June 9, 2020, 3 a.m. +04",
            //     title: "Judging",
            //     description: "",
            //   },
            //   {
            //     active: false,
            //     timestamp: "July 11, 2020, 3 a.m. +04",
            //     title: "Judging Closed",
            //     description: "Winners announced on July 14, 2020",
            //   },
            //   {
            //     active: false,
            //     timestamp: "July 14, 2020, 8 p.m. +04",
            //     title: "Won",
            //     description: "",
            //   },
            // ]}
          ></VeticalStepper>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Timeline);
