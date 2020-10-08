import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { attachSummaryAction } from "./action";
import {
  Input,
  EditorInput,
  RemoveButton,
  Loading,
  BannerInput,
  UpdateCountButton,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { Constants } from "../../../../lib/constant";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Summary = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachSummaryMethod = (data) =>
    dispatch(attachSummaryAction(data, challengeId));

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeSummaryReducer = useSelector((state) => {
    return state.challengeSummaryReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [shortDescription, changeShortDescription] = useState("");
  const [bannerImage, changeBannerImage] = useState("");
  const [cropedBannerImage, setCropedBannerImage] = useState("");
  const [blocks, changeBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  useEffect(() => {
    const { error } = challengeSummaryReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeSummaryReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { summaryId } = challengeData;
      if (summaryId) {
        if (summaryId.shortDescription) {
          changeShortDescription(summaryId.shortDescription);
        }
        if (summaryId.bannerImage) {
          changeBannerImage(summaryId.bannerImage);
        }
        if (summaryId.data) {
          changeBlocks(summaryId.data);
        }
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeSummaryReducer.loading ||
        challengeReducer.loading ||
        loading) && <Loading uploadPercentage={uploadPercentage} />}

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
        challengeSummaryReducer &&
        challengeSummaryReducer.success &&
        challengeSummaryReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeSummaryReducer.success.message}</div>
            </Alert>
          </Col>
        </Row>
      ) : null}
      <MainContainer>
        {challengeReducer.loading && <Loading />}

        <Form
          noValidate
          validated={validated}
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity() && shortDescription) {
              let obj = { blocks, shortDescription, bannerImage };
              if (
                (bannerImage && bannerImage.name) ||
                (cropedBannerImage && cropedBannerImage.name)
              ) {
                setLoading(true);
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
                  obj["bannerImage"] = fileResult.data.result.imageKey;
                  setUploadPercentage({
                    message: t("Upload is successful and saved"),
                  });
                }

                setLoading(false);
              }
              attachSummaryMethod(obj);
            }
            setValidated(true);
          }}
        >
          <Row style={{ marginBottom: 25 }}>
            <Col>
              <HeaderComponent
                titleText={t("Summary")}
                buttonText={t("Save")}
                buttonVariant="success"
                buttonType="submit"
                infoButtonText={t("Add Item")}
                infoButtonVariant="info"
                infoButtonType="button"
                infoButtonClick={() => {
                  changeBlocks((data) =>
                    data.concat({
                      _id: `block-${data.length + 1}`,
                      title: "",
                      description: "",
                    })
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <EditorInput
                label={t("Short Description")}
                value={shortDescription}
                onChange={(value) => {
                  if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
                    //textarea is still empty
                    changeShortDescription("");
                  } else {
                    changeShortDescription(value);
                  }
                }}
                isInvalid={validated && !shortDescription}
                errorMessage={t("Short_desscription_error")}
              ></EditorInput>
              <BannerInput
                t={t}
                label={t("Summary Banner Image")}
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
              {blocks && blocks.length ? (
                <DragDropContext
                  onDragEnd={(result) => {
                    if (!result.destination) {
                      return;
                    }
                    changeBlocks((data) =>
                      reorder(
                        data,
                        result.source.index,
                        result.destination.index
                      )
                    );
                  }}
                >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {blocks.map((each, index) => {
                          return (
                            <Draggable
                              key={each._id}
                              draggableId={each._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className="box-container"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div className="left-container">
                                    <Input
                                      required
                                      errorMessage={t("title_error")}
                                      type="text"
                                      label={t("Section Title") + " *"}
                                      value={each.title}
                                      onChange={(e) => {
                                        let newArr = [...blocks];
                                        newArr[index]["title"] = e.target.value;
                                        newArr[index]["date"] = new Date();
                                        changeBlocks(newArr);
                                      }}
                                    />
                                    <EditorInput
                                      label={t("Description")}
                                      value={each.description}
                                      onChange={(value) => {
                                        if (
                                          value
                                            .replace(/<(.|\n)*?>/g, "")
                                            .trim().length === 0
                                        ) {
                                          //textarea is still empty
                                          let newArr = [...blocks];
                                          newArr[index]["description"] = "";
                                          newArr[index]["date"] = new Date();
                                          changeBlocks(newArr);
                                        } else {
                                          let newArr = [...blocks];
                                          newArr[index]["description"] = value;
                                          newArr[index]["date"] = new Date();
                                          changeBlocks(newArr);
                                        }
                                      }}
                                      isInvalid={validated && !each.description}
                                      errorMessage={t("Desscription_error")}
                                    ></EditorInput>
                                  </div>
                                  <div className="right-container">
                                    <div style={{ marginBottom: 10 }}>
                                      <RemoveButton
                                        onClick={() => {
                                          let newArr = [...blocks];
                                          newArr = newArr.filter((data) => {
                                            return each._id !== data._id;
                                          });
                                          changeBlocks(newArr);
                                        }}
                                      />
                                    </div>
                                    <div {...provided.dragHandleProps}>
                                      <UpdateCountButton />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : null}
            </Col>
          </Row>
        </Form>
      </MainContainer>
    </MainContainer>
  );
};

export default Summary;
