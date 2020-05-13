import React from "react";
import {
  Input,
  DropDown,
  TextArea,
  SecondaryButton,
  BannerInput,
} from "../common";
import { Form, Row, Col } from "react-bootstrap";

function Step2() {
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>WHAT’S YOUR ELEVATOR PITCH?</Col>
        </Row>
        <Row className="title">
          <Col>Challenge Overview</Col>
        </Row>
        <Row className="sub-title">
          <Col>
            Tell us your challenge name, category, description, and upload your
            challenge visual.
          </Col>
        </Row>
        <Form>
          <Row className="form-container">
            <Col>
              <Input type="text" label="Title *" />
              <DropDown
                label="Categories *"
                description="The categories help people use search criteria to find your challenge. Select no more than 3."
                options={[]}
              />
              <Input
                type="text"
                label="Prize *"
                description="NOTE: The payment of the prize value is the responsibility of you, the sponsor, to pay out at time of winners announcement"
              />
              <TextArea
                rows="5"
                label="Short Description"
                description="Describe the challenge in 140 characters or less. This will be displayed with the description on the Explore Page."
              />
              <BannerInput
                label="Challenge Banner Image"
                description="The image should illustrate your challenge. Recommended size is 1280 by 720"
              />
              <Input
                type="text"
                label="Video URL"
                description="You can include a video describing your challenge. You must have the rights to display the video. You can link from YouTube or Vimeo."
              />
            </Col>
          </Row>
          <Row className="right-content-container">
            <Col>You can always edit this information later</Col>
          </Row>
          <Row className="button-container">
            <Col>
              <SecondaryButton
                text={"Continue"}
                onClick={() => {}}
              ></SecondaryButton>
            </Col>
          </Row>
          <Row className="bottom-container">
            <Col>
              Need Help? or Looking for custom solution?{" "}
              <span className="contact-link">Contact Us</span>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Step2;
