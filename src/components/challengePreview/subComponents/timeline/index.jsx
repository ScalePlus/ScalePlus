import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, VeticalStepper } from "../common";
import { MainContainer } from "./style";

export default function Timeline() {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent
            titleText="Timeline"
            buttonText="Add New"
            buttonVariant="info"
          />
        </Col>
      </Row>
      <Row className="justify-content-center center-alignment">
        <Col lg={11} md={11} sm={11} xs={11}>
          <VeticalStepper
            steps={[
              {
                active: false,
                timestamp: "April 9, 2020, 9 a.m. +04",
                title: "Date Launched",
                description:
                  "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
              },
              {
                active: false,
                timestamp: "April 9, 2020, 5 p.m. +04",
                title: "Enter",
                description:
                  "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective. Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
              },
              {
                active: true,
                timestamp: "April 30, 2020, 8:07 a.m. +04",
                title: "You are here",
                description:
                  "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
              },
              {
                active: false,
                timestamp: "June 9, 2020, 1 a.m. +04",
                title: "Submission Deadline",
                description:
                  "Give a tiny bot a new set of tools to explore the moon. Share your ideas for a mini payload to make lunar exploration more effective.",
              },
              {
                active: false,
                timestamp: "June 9, 2020, 3 a.m. +04",
                title: "Judging",
                description: "",
              },
              {
                active: false,
                timestamp: "July 11, 2020, 3 a.m. +04",
                title: "Judging Closed",
                description: "Winners announced on July 14, 2020",
              },
              {
                active: false,
                timestamp: "July 14, 2020, 8 p.m. +04",
                title: "Won",
                description: "",
              },
            ]}
          ></VeticalStepper>
        </Col>
      </Row>
    </MainContainer>
  );
}
