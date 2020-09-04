import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  // getChallengeAction,
  challengeCategoriesListAction,
  challengeTagsListAction,
} from "../../../challengeMaster/action";
// import Api from "../../../challengeMaster/api";
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
import ValidationBlock from "./validationBlock";

const Description = ({ t, challengeId }) => {
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
  const challengeTagsListMethod = useCallback(
    () => dispatch(challengeTagsListAction()),
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
  const [cropedBannerImage, setCropedBannerImage] = useState("");
  const [videoURL, changeVideoUrl] = useState("");
  const [tags, selectTag] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  useEffect(() => {
    challengeCategoriesListMethod();
  }, [challengeCategoriesListMethod]);

  useEffect(() => {
    challengeTagsListMethod();
  }, [challengeTagsListMethod]);

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
          let selectedData = [],
            records = descriptionId.categories.filter(
              (each) => each._id && each.name
            );
          records.map((each) => {
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
          let selectedData = [],
            records = descriptionId.tags.filter(
              (each) => each._id && each.name
            );
          records.map((each) => {
            selectedData.push({
              value: each._id,
              label: each.name,
            });
            return each;
          });
          selectTag(selectedData);
        }
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeDescriptionReducer.loading ||
        challengeReducer.loading ||
        loading) && <Loading uploadPercentage={uploadPercentage} />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock buttonText={t("Click Here")}>
            <span>{t("Description_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>

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
      ) : validated &&
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

      <Form
        noValidate
        validated={validated}
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (
            form.checkValidity() &&
            (!videoURL || (videoURL && videoURL.match(Constants.isURL))) &&
            categories &&
            categories.length &&
            shortDescription &&
            shortDescription.length <= 140 &&
            tags &&
            tags.length
          ) {
            let updateObj = {
              title,
              prize,
              categories,
              shortDescription,
              problemStatement,
              currentSolution,
              painPoint,
              videoURL,
              tags,
            };

            if (
              (bannerImage && bannerImage.name) ||
              (cropedBannerImage && cropedBannerImage.name)
            ) {
              setLoading(true);
              // let fileResult = await Api.uploadFile({
              //   file:
              //     cropedBannerImage && cropedBannerImage.name
              //       ? cropedBannerImage
              //       : bannerImage,
              // });
              // if (
              //   fileResult &&
              //   fileResult.result &&
              //   fileResult.result.imageKey
              // ) {
              //   updateObj["bannerImage"] = fileResult.result.imageKey;
              // }

              let formData = new FormData();

              formData.append(
                "file",
                cropedBannerImage && cropedBannerImage.name
                  ? cropedBannerImage
                  : bannerImage
              );

              let fileResult = await Axios({
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `JWT ${localStorage.getItem("token")}`,
                },
                method: "POST",
                data: formData,
                url: "/uploadFile", // route name
                baseURL: Constants.BASE_URL, //local url
                onUploadProgress: (progress) => {
                  const { total, loaded } = progress;
                  const totalSizeInMB = total / 1000000;
                  const loadedSizeInMB = loaded / 1000000;
                  const uploadPercentage =
                    (loadedSizeInMB / totalSizeInMB) * 100;
                  setUploadPercentage({
                    name:
                      cropedBannerImage && cropedBannerImage.name
                        ? cropedBannerImage.name
                        : bannerImage && bannerImage.name
                        ? bannerImage.name
                        : "",
                    message: t("Uploading banner image"),
                    progress: parseInt(uploadPercentage, 10),
                  });
                },
                encType: "multipart/form-data",
              });

              if (
                fileResult &&
                fileResult.status === 200 &&
                fileResult.data &&
                fileResult.data.result &&
                fileResult.data.result.imageKey
              ) {
                updateObj["bannerImage"] = fileResult.data.result.imageKey;
                setUploadPercentage({
                  message: t("Upload is successful and saved"),
                });
              }

              setLoading(false);
            }

            updateDescriptionMethod(updateObj);
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText={t("Description")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        {validated &&
        (!shortDescription ||
          !categories ||
          (categories && categories.length === 0) ||
          !bannerImage) ? (
          <ValidationBlock
            descError={validated && !shortDescription}
            catError={
              validated &&
              (!categories || (categories && categories.length === 0))
            }
            imgError={validated && !bannerImage}
            t={t}
          />
        ) : null}
        <Row>
          <Col>
            <Input
              type="text"
              label={t("Title") + " *"}
              required
              errorMessage={t("title_error")}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <BannerInput
              t={t}
              label={t("Challenge Banner Image")}
              description={t("Banner_Image_desscription")}
              value={bannerImage}
              cropedBannerImage={cropedBannerImage}
              onChange={(e) => {
                changeBannerImage(e.target.files[0]);
              }}
              onCropDone={(file) => {
                setCropedBannerImage(file);
              }}
            />
            <Input
              type="text"
              label={t("Video URL")}
              description={t("video_url_description")}
              value={videoURL}
              onChange={(e) => {
                changeVideoUrl(e.target.value);
              }}
              isInvalid={
                validated && videoURL && !videoURL.match(Constants.isURL)
              }
              errorMessage={t("invalid_videoURL_error")}
            />
            <DropDown
              isSmall={true}
              label={t("Categories") + " *"}
              placeholder=""
              description={t("Categories_description")}
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
                validated &&
                (!categories || (categories && categories.length === 0))
              }
              errorMessage={t("Categories_error")}
            />
            <Input
              type="number"
              label={t("Prize")}
              description={t("Prize_desscription")}
              required
              errorMessage={t("prize_error")}
              value={prize}
              onChange={(e) => {
                setPrize(e.target.value);
              }}
            />
            <DropDown
              isSmall={true}
              label={t("Tags") + " *"}
              placeholder=""
              description={t("Categories_description")}
              options={
                challengeReducer.challengeTags &&
                challengeReducer.challengeTags.length
                  ? challengeReducer.challengeTags.map((option) => {
                      return { value: option._id, label: option.name };
                    })
                  : []
              }
              value={tags}
              onChange={(val) => {
                selectTag(val);
              }}
              isInvalid={validated && (!tags || (tags && tags.length === 0))}
              errorMessage={t("Categories_error")}
            />
            <TextArea
              rows="3"
              label={t("Short Description") + " *"}
              description={t("Short_desscription")}
              showCount={140}
              value={shortDescription}
              onChange={(e) => {
                changeShortDesc(e.target.value);
              }}
              isInvalid={
                validated &&
                (!shortDescription ||
                  (shortDescription && shortDescription.length > 140))
              }
              errorMessage={
                shortDescription
                  ? t("Short_desscription_invalid_error")
                  : t("Short_desscription_error")
              }
            />
            <TextArea
              rows="4"
              label={t("Problem Statement (optional)")}
              description={t("problem_statement_description")}
              value={problemStatement}
              onChange={(e) => {
                changeProblemStatment(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label={t("Current Solutions (optional)")}
              description={t("current_solution_description")}
              value={currentSolution}
              onChange={(e) => {
                changeCurrentSolution(e.target.value);
              }}
            />
            <TextArea
              rows="4"
              label={t("Pain Point (optional)")}
              description={t("pain_point_description")}
              value={painPoint}
              onChange={(e) => {
                changePainPoint(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default React.memo(Description);
