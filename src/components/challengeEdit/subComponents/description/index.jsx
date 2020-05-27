import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Input, DropDown, TextArea, BannerInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Constants } from "../../../../lib/constant";

const Description = () => {
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [selectedCategories, selectCategories] = useState([]);
  const [sortDesc, changeSortDesc] = useState("");
  const [problemStatment, changeProblemStatment] = useState("");
  const [currentSolution, changeCurrentSolution] = useState("");
  const [painPoint, changePainPoint] = useState("");
  const [bannerImage, changeBannerImage] = useState("");
  const [videoURL, changeVideoUrl] = useState("");
  const [selectedTag, selectTag] = useState([]);
  const [validated, setValidated] = useState(false);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock buttonText="Click Here">
            <span>
              Want to see some successful strategies from past crowdsourcing
              challenges on Scale+? See our template
            </span>
          </InfoBlock>
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
            alert();
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText="Description"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <div className="complete-task-dialogue">
          <div className="step">
            <div className="icon-container">
              <span style={{ marginLeft: 3 }}>></span>
            </div>
            <div style={{ marginLeft: 3 }}>
              <span className="title">
                Before we can publish your challenge live, you need to complete
                the following tasks:
              </span>
            </div>
          </div>
          <div className="step">
            <div className="icon-container">
              <img
                src={"/images/check-circle-active.svg"}
                height="15px"
                width="15px"
                alt=""
              ></img>
            </div>
            <div>
              <div className="title">
                <span>Short Description</span>
              </div>
              <div className="description">
                <span>Describe the challenge in 140 characters or less.</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="icon-container">
              <img
                src={"/images/check-circle-active.svg"}
                height="15px"
                width="15px"
                alt=""
              ></img>
            </div>
            <div>
              <div className="title">
                <span>Categories</span>
              </div>
              <div className="description">
                <span>Choose appropriate categories for your challenge.</span>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="icon-container">
              <img
                src={"/images/check-circle.svg"}
                height="15px"
                width="15px"
                alt=""
              ></img>
            </div>
            <div>
              <div className="title">
                <span>Add Image</span>
              </div>
              <div className="description">
                <span>
                  The image should illustrate your challenge. Recommended size
                  is 1280 by 720
                </span>
              </div>
            </div>
          </div>
        </div>
        <Row>
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
              options={[{ value: "1", label: "category1" }]}
              value={selectedCategories}
              onChange={(val) => {
                selectCategories(val);
              }}
              isInvalid={
                !selectedCategories ||
                (selectedCategories && selectedCategories.length === 0)
              }
              errorMessage={Constants.Errors.Categories}
            />
            <Input
              type="number"
              label="Prize"
              description="NOTE: The payment of the prize value is the responsibility of you, the sponsor, to pay out at time of winners announcement"
              required
              errorMessage={Constants.Errors.prize}
              value={prize}
              onChange={(e) => {
                setPrize(e.target.value);
              }}
            />
            <DropDown
              isSmall={true}
              label="Tags *"
              placeholder=""
              description="The categories help people use search criteria to find your challenge. Select no more than 3."
              options={[{ value: "1", label: "tag1" }]}
              value={selectedTag}
              onChange={(val) => {
                selectTag(val);
              }}
              isInvalid={
                !selectedTag || (selectedTag && selectedTag.length === 0)
              }
              errorMessage={Constants.Errors.Categories}
            />
            <TextArea
              rows="4"
              label="Short Description"
              description="Describe the challenge in 140 characters or less. This will be displayed with the description on the Explore Page."
              value={sortDesc}
              onChange={(e) => {
                changeSortDesc(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label="Problem Statement (optional)"
              description="What problem are you tackling?"
              value={problemStatment}
              onChange={(e) => {
                changeProblemStatment(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label="Current Solutions (optional)"
              description="What are the current solutions to this problem?"
              value={currentSolution}
              onChange={(e) => {
                changeCurrentSolution(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label="Pain Point (optional)"
              description="What are the current solutions missing?"
              value={painPoint}
              onChange={(e) => {
                changePainPoint(e.target.value);
              }}
            />
            <BannerInput
              label="Challenge Banner Image"
              description="The image should illustrate your challenge. Recommended size is 1280 by 720"
              value={bannerImage}
              onChange={(e) => {
                changeBannerImage(e.target.files[0]);
              }}
            />
            <Input
              type="text"
              label="Video URL"
              description="You can include a video describing your challenge. You must have the rights to display the video. You can link from YouTube or Vimeo."
              value={videoURL}
              onChange={(e) => {
                changeVideoUrl(e.target.value);
              }}
              isInvalid={videoURL && !videoURL.match(Constants.isURL)}
              errorMessage={Constants.Errors.invalid_videoURL}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default React.memo(Description);
