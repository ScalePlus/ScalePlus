import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  // getChallengeAction,
  challengeCategoriesListAction,
} from "../../../challengeMaster/action";
import { updateDescriptionAction } from "./action";
import {
  Input,
  DropDown,
  TextArea,
  BannerInput,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Constants } from "../../../../lib/constant";
let tagsList = [
  { value: "1", label: "tag1" },
  { value: "2", label: "tag2" },
  { value: "3", label: "tag3" },
];

const Description = ({ challengeId }) => {
  const dispatch = useDispatch();
  const updateDescriptionMethod = (data) =>
    dispatch(updateDescriptionAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );
  const challengeCategoriesListMethod = useCallback(
    () => dispatch(challengeCategoriesListAction()),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeDescriptionReducer = useSelector((state) => {
    return state.challengeDescriptionReducer;
  });

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [categories, selectCategories] = useState([]);
  const [shortDescription, changeShortDesc] = useState("");
  const [problemStatement, changeProblemStatment] = useState("");
  const [currentSolution, changeCurrentSolution] = useState("");
  const [painPoint, changePainPoint] = useState("");
  const [bannerImage, changeBannerImage] = useState("");
  const [videoURL, changeVideoUrl] = useState("");
  const [tags, selectTag] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    challengeCategoriesListMethod();
  }, [challengeCategoriesListMethod]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeDescriptionReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeDescriptionReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { descriptionId } = challengeData;

      if (descriptionId) {
        if (descriptionId.title) {
          setTitle(descriptionId.title);
        }
        if (descriptionId.prize) {
          setPrize(descriptionId.prize);
        }
        if (descriptionId.categories && descriptionId.categories.length) {
          let selectedData = [];
          descriptionId.categories.map((each) => {
            selectedData.push({
              value: each._id,
              label: each.name,
            });
            return each;
          });
          selectCategories(selectedData);
        }
        if (descriptionId.shortDescription) {
          changeShortDesc(descriptionId.shortDescription);
        }
        if (descriptionId.problemStatement) {
          changeProblemStatment(descriptionId.problemStatement);
        }
        if (descriptionId.currentSolution) {
          changeCurrentSolution(descriptionId.currentSolution);
        }
        if (descriptionId.painPoint) {
          changePainPoint(descriptionId.painPoint);
        }
        if (descriptionId.bannerImage) {
          changeBannerImage(descriptionId.bannerImage);
        }
        if (descriptionId.videoURL) {
          changeVideoUrl(descriptionId.videoURL);
        }
        if (descriptionId.tags && descriptionId.tags.length) {
          let selectedData = [];
          descriptionId.tags.map((each) => {
            let record = tagsList.find((category) => category.value === each);
            if (record) {
              selectedData.push(record);
            }
            return each;
          });
          selectTag(selectedData);
        }
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeDescriptionReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
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
      {validated &&
      challengeDescriptionReducer &&
      challengeDescriptionReducer.success &&
      challengeDescriptionReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeDescriptionReducer.success.message}</div>
            </Alert>
          </Col>
        </Row>
      ) : null}
      {errors && errors.length ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : null}
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
            updateDescriptionMethod({
              title,
              prize,
              categories: categories.map((each) => each.value),
              shortDescription,
              problemStatement,
              currentSolution,
              painPoint,
              bannerImage: bannerImage && bannerImage.name ? bannerImage : "",
              videoURL,
              tags: tags.map((each) => each.value),
            });
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
              isInvalid={!categories || (categories && categories.length === 0)}
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
              options={tagsList}
              value={tags}
              onChange={(val) => {
                selectTag(val);
              }}
              isInvalid={!tags || (tags && tags.length === 0)}
              errorMessage={Constants.Errors.Categories}
            />
            <TextArea
              rows="4"
              label="Short Description"
              description="Describe the challenge in 140 characters or less. This will be displayed with the description on the Explore Page."
              value={shortDescription}
              onChange={(e) => {
                changeShortDesc(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label="Problem Statement (optional)"
              description="What problem are you tackling?"
              value={problemStatement}
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
