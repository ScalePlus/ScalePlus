import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";

export default function FAQ() {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent
            titleText="Frequently Asked Questions"
            buttonText="Add New"
          />
        </Col>
      </Row>
      <Row className="justify-content-center center-alignment">
        <Col lg={11} md={11} sm={11} xs={11}>
          <ExpandCollapse
            title="Do I have to register on Scale+ to follow the challenge, leave a comment or register to compete in the challenge?"
            description="Yes, but it’s quick and easy. Just click the “Accept Challenge” button on this page and follow the instructions to complete your registration. All you need to provide is your name and email address."
          />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
          <ExpandCollapse title="Expandable" description="description" />
        </Col>
      </Row>
    </MainContainer>
  );
}
