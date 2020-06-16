import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Input,
  DropDown,
  TextArea,
  PrimaryButton,
  BannerInput,
  PageTitle,
} from "../common";
import { Form, Row, Col } from "react-bootstrap";
import { Constants } from "../../lib/constant";

const Step2 = ({
  setActiveStep,
  title,
  setTitle,
  prize,
  setPrize,
  categories,
  selectCategories,
  shortDescription,
  setSortDescription,
  bannerImage,
  setBannerImage,
  videoURL,
  setVideoURL,
}) => {
  const [validated, setValidated] = useState(false);
  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>WHAT’S YOUR ELEVATOR PITCH?</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text="Challenge Overview" />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>
            Tell us your challenge name, category, description, and upload your
            challenge visual.
          </Col>
        </Row>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (
              form.checkValidity() &&
              (!videoURL || (videoURL && videoURL.match(Constants.isURL)))
            ) {
              setActiveStep(2);
            }
            window.scrollTo(0, 0);
            setValidated(true);
          }}
        >
          <Row className="form-container">
            <Col>
              <Input
                type="text"
                label="Title *"
                required
                errorMessage={Constants.Errors.title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <DropDown
                isSmall={true}
                label="Categories *"
                placeholder=""
                description="The categories help people use search criteria to find your challenge. Select no more than 3."
                options={
                  challengeReducer.challengeCategories &&
                  challengeReducer.challengeCategories.length
                    ? challengeReducer.challengeCategories.map((option) => {
                        return { value: option._id, label: option.name };
                      })
                    : []
                }
                value={categories}
                onChange={(val) => {
                  selectCategories(val);
                }}
                isInvalid={
                  !categories || (categories && categories.length === 0)
                }
                errorMessage={Constants.Errors.Categories}
              />
              <Input
                type="number"
                label="Prize *"
                description="NOTE: The payment of the prize value is the responsibility of you, the sponsor, to pay out at time of winners announcement"
                required
                errorMessage={Constants.Errors.prize}
                value={prize}
                onChange={(e) => {
                  setPrize(e.target.value);
                }}
              />
              <TextArea
                rows="4"
                label="Short Description"
                description="Describe the challenge in 140 characters or less. This will be displayed with the description on the Explore Page."
                value={shortDescription}
                onChange={(e) => {
                  setSortDescription(e.target.value);
                }}
              />
              <BannerInput
                label="Challenge Banner Image"
                description="The image should illustrate your challenge. Recommended size is 1280 by 720"
                value={bannerImage}
                onChange={(e) => {
                  setBannerImage(e.target.files[0]);
                }}
              />
              <Input
                type="text"
                label="Video URL"
                description="You can include a video describing your challenge. You must have the rights to display the video. You can link from YouTube or Vimeo."
                value={videoURL}
                onChange={(e) => {
                  setVideoURL(e.target.value);
                }}
                isInvalid={videoURL && !videoURL.match(Constants.isURL)}
                errorMessage={Constants.Errors.invalid_videoURL}
              />
            </Col>
          </Row>
          <Row className="right-content-container">
            <Col>You can always edit this information later</Col>
          </Row>
          <Row className="button-container">
            <Col className="center-component">
              <PrimaryButton
                variant="primary"
                text={"Continue"}
                type="submit"
              ></PrimaryButton>
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
};

export default React.memo(Step2);
