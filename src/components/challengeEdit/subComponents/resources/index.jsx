import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
// import Api from "../../../challengeMaster/api";
import { attachResourcesAction } from "./action";
import {
  Switch,
  Input,
  EditorInput,
  FileInput,
  RemoveButton,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Constants } from "../../../../lib/constant";

const Resources = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachResourcesMethod = (data) =>
    dispatch(attachResourcesAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeResourceReducer = useSelector((state) => {
    return state.challengeResourceReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [resources, changeResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeResourceReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeResourceReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { resourceId } = challengeData;
      if (resourceId && resourceId.data) {
        changeResources(resourceId.data);
      }
      if (resourceId && resourceId.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeResourceReducer.loading ||
        challengeReducer.loading ||
        loading) && <Loading uploadPercentage={uploadPercentage} />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("Resources_info_text")}</span>
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
      ) : // validated &&
      challengeResourceReducer &&
        challengeResourceReducer.success &&
        challengeResourceReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeResourceReducer.success.message}</div>
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
            !resources.find(
              (each) => each.link && !each.link.match(Constants.isURL)
            )
          ) {
            if (resources.find((each) => each.progress)) {
              if (errors.indexOf(t("File uploading is in progress")) < 0) {
                setErrors([t("File uploading is in progress")]);
              }
              setValidated(true);
            } else {
              let newArr = [...resources];

              for (let i = 0; i < newArr.length; i++) {
                const resource = newArr[i];
                if (resource.attachment && resource.attachment.name) {
                  setLoading(true);
                  // let fileResult = await Api.uploadFile({
                  //   file: resource.attachment,
                  // });
                  // if (
                  //   fileResult &&
                  //   fileResult.result &&
                  //   fileResult.result.imageKey
                  // ) {
                  //   resource.attachment = fileResult.result.imageKey;
                  // }

                  let formData = new FormData();

                  formData.append("file", resource.attachment);

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
                        name: resource.attachment.name,
                        message: t("Uploading attachment to resources"),
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
                    resource.attachment = fileResult.data.result.imageKey;
                    setUploadPercentage({
                      message: t("Upload is successful and saved"),
                    });
                  }

                  setLoading(false);
                }
              }

              attachResourcesMethod({
                isActive,
                resources: newArr,
              });
            }
          } else {
            setValidated(true);
          }
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText={t("Resources")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
              infoButtonText={t("Add Item")}
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeResources((data) =>
                  data.concat({
                    _id: `resource-${data.length + 1}`,
                    title: "",
                    attachment: "",
                    description: "",
                    link: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        {resources && resources.length ? (
          <Row style={{ marginBottom: 25 }}>
            <Col>
              <Switch
                checked={isActive}
                onChange={() => {
                  setActivity(!isActive);
                }}
                variant="primary"
                label={t("Enable Resources tab")}
              ></Switch>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            {resources.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Row>
                      <Col>
                        <Input
                          required
                          errorMessage={t("title_error")}
                          type="text"
                          label={t("Title") + " *"}
                          value={each.title}
                          onChange={(e) => {
                            let newArr = [...resources];
                            newArr[index]["title"] = e.target.value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="align-items-center fileContainer">
                      <Col lg={12} md={12} sm={12} xs={12}>
                        <FileInput
                          placeholder={t("choose file")}
                          label={t("Attachment")}
                          prependButtonText={t("Upload File")}
                          value={each.attachment}
                          progress={each.progress}
                          onChange={async (e) => {
                            let newArr = [...resources];
                            newArr[index]["attachment"] = e.target.files[0];
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);

                            //upload file
                            if (e.target.files[0] && e.target.files[0].name) {
                              let formData = new FormData();

                              formData.append("file", e.target.files[0]);

                              let fileResult = await Axios({
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                  Authorization: `JWT ${localStorage.getItem(
                                    "token"
                                  )}`,
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
                                  let newArr = [...resources];
                                  newArr[index]["progress"] = parseInt(
                                    uploadPercentage,
                                    10
                                  );
                                  newArr[index]["date"] = new Date();
                                  changeResources(newArr);
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
                                let newArr = [...resources];
                                delete newArr[index]["progress"];
                                newArr[index]["attachment"] =
                                  fileResult.data.result.imageKey;
                                newArr[index]["date"] = new Date();
                                changeResources(newArr);
                              }
                            }
                          }}
                          acceptTypes="*"
                        ></FileInput>
                      </Col>
                      {/* <Col
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        style={{ marginTop: "25px" }}
                      >
                        <span className="info-text">
                          {t("Allowed file types are")}: ....
                        </span>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col>
                        <EditorInput
                          label={t("Description")}
                          value={each.description}
                          onChange={(value) => {
                            let newArr = [...resources];
                            newArr[index]["description"] = value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        ></EditorInput>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Input
                          type="text"
                          label={t("Link")}
                          value={each.link}
                          onChange={(e) => {
                            let newArr = [...resources];
                            newArr[index]["link"] = e.target.value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                          isInvalid={
                            validated &&
                            each.link &&
                            !each.link.match(Constants.isURL)
                          }
                          errorMessage={t("invalid_URL_error")}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...resources];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeResources(newArr);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Resources;
