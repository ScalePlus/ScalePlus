import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";
import history from "../../../../history";

const Guidelines = ({ isOrganisation }) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {isOrganisation ? (
            <HeaderComponent
              titleText="Guidelines"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push("/challenge/edit/Guidelines");
              }}
            />
          ) : (
            <HeaderComponent titleText="Guidelines" />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <ExpandCollapse
            title="Challenge NDA Document"
            timestamp="time/date stamp"
            link="Attachment link here as hyperlink"
            description="Attachment content description here"
          />
          <ExpandCollapse
            title="Expandable"
            link="Attachment link here as hyperlink"
            description="Attachment content description here"
          />
          <ExpandCollapse
            title="Expandable"
            link="Attachment link here as hyperlink"
            description="Attachment content description here"
          />
          <ExpandCollapse
            title="Expandable"
            link="Attachment link here as hyperlink"
            description="Attachment content description here"
          />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Guidelines);
