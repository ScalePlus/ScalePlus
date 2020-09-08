import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import queryString from "query-string";
import moment from "moment";
import { Link } from "react-router-dom";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Api from "../../../challengeMaster/api";
import {
  fillSubmissionformAction,
  getSubmissionsListAction,
  disqualifySubmissionAction,
  judgeSubmissionformAction,
} from "./action";
import { MainContainer } from "./style";
import {
  PrimaryButton,
  CheckBox,
  // CommonTable,
  Input,
  EditorInput,
  FileInput,
  RadioButton,
  // DropDown,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../common";
import EvaluateModal from "./evaluateModal";
import DisqualifyModal from "./disqualifyModal";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Submissions = ({
  t,
  is_startup_Individual,
  is_mentor_judge,
  is_organisation,
  organisationTeamMember,
  challengeData,
  fromPreview,
  submissionVisibility,
  judgingStarted,
  judgingClosed,
  submissionClosed,
  memberAsParticipant,
}) => {
  const dispatch = useDispatch();
  const fillSubmissionformMethod = (data) =>
    dispatch(fillSubmissionformAction(data, challengeData._id));
  const disqualifySubmissionMethod = (id, submissionId) =>
    dispatch(disqualifySubmissionAction(id, submissionId));
  const judgeSubmissionformMethod = (id, submissionId, data, isEvaluation) =>
    dispatch(judgeSubmissionformAction(id, submissionId, data, isEvaluation));
  const getSubmissionsListMethod = useCallback(
    (id, searchCriteria) =>
      dispatch(getSubmissionsListAction(id, searchCriteria)),
    [dispatch]
  );

  const submissionListReducer = useSelector((state) => {
    return state.submissionListReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [showDisqualify, setDisqualifyShow] = useState(false);
  const [selectedRow, selectRow] = useState(null);
  const [submissionForm, changeSubmissionForm] = useState([]);
  const [progress, setProgress] = useState(0);
  const [formFilled, setFormFilled] = useState(false);
  const [submissions, changeSubmissions] = useState(null);
  const [
    searchText,
    // setSearchText
  ] = useState("");
  const [
    selectedFilter,
    // selectFilter
  ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  useEffect(() => {
    if (challengeData && challengeData._id && localStorage.getItem("token")) {
      getSubmissionsListMethod(challengeData._id, {
        selectedFilter: selectedFilter ? selectedFilter.value : "",
        searchText,
      });
    }
  }, [getSubmissionsListMethod, challengeData, selectedFilter, searchText]);

  useEffect(() => {
    const { disqualifySuccess, judgeSuccess } = submissionListReducer;
    if (disqualifySuccess && showDisqualify) {
      setDisqualifyShow(false);
      if (challengeData && challengeData._id && localStorage.getItem("token")) {
        getSubmissionsListMethod(challengeData._id, {
          selectedFilter: selectedFilter ? selectedFilter.value : "",
          searchText,
        });
      }
      selectRow(null);
      if (queryString.parse(window.location.search).submissionId) {
        history.push(`/challenge/${challengeData._id}/preview/Submissions`);
      }
    }

    if (judgeSuccess && show) {
      setShow(false);
      if (challengeData && challengeData._id && localStorage.getItem("token")) {
        getSubmissionsListMethod(challengeData._id, {
          selectedFilter: selectedFilter ? selectedFilter.value : "",
          searchText,
        });
      }
      selectRow(null);
      if (queryString.parse(window.location.search).submissionId) {
        history.push(`/challenge/${challengeData._id}/preview/Submissions`);
      }
    }
  }, [
    submissionListReducer,
    selectedRow,
    showDisqualify,
    show,
    getSubmissionsListMethod,
    challengeData,
    selectedFilter,
    searchText,
  ]);

  useEffect(() => {
    const { error, success, submissionsListSuccess } = submissionListReducer;

    if (submissionsListSuccess) {
      if (
        submissionsListSuccess.result &&
        submissionsListSuccess.result.length &&
        localStorage.getItem("userId")
      ) {
        let record = submissionsListSuccess.result.find(
          (each) =>
            each.userId._id.toString() === localStorage.getItem("userId")
        );
        setFormFilled(record ? true : false);
        changeSubmissions(submissionsListSuccess.result);
        if (queryString.parse(window.location.search).submissionId) {
          let record = submissionsListSuccess.result.find(
            (each) =>
              each._id.toString() ===
              queryString.parse(window.location.search).submissionId.toString()
          );
          selectRow(record);
        }
      } else {
        changeSubmissions(null);
      }
    }

    if (success) {
      setFormFilled(true);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [submissionListReducer]);

  useEffect(() => {
    if (challengeData && challengeData.submissionFormId) {
      const { submissionFormId } = challengeData;
      if (submissionFormId && submissionFormId.data) {
        let newData = submissionFormId.data.map((each) => {
          if (each.choices && each.choices.length) {
            each["choices"] = each.choices.map((choice) => {
              choice["checked"] = false;
              return choice;
            });
          } else {
            delete each.choices;
            each["value"] = "";
          }
          return each;
        });
        changeSubmissionForm(newData);
      }
    }
  }, [challengeData]);

  useEffect(() => {
    if (submissionForm.length) {
      const perFieldPer = 100 / parseInt(submissionForm.length, 10);
      const per = submissionForm.filter((each) => each.value).length
        ? submissionForm.filter((each) => {
            if (each.choices && each.choices.length) {
              return each.choices.find((choice) => choice.checked)
                ? each
                : null;
            } else {
              return each.value ? each : null;
            }
          }).length * perFieldPer
        : 0;
      setProgress(Math.round(per));
    }
  }, [submissionForm]);

  const onDisqualify = () => {
    disqualifySubmissionMethod(selectedRow.challengeId._id, selectedRow._id);
  };

  const onSaveDraft = (data) => {
    judgeSubmissionformMethod(
      selectedRow.challengeId._id,
      selectedRow._id,
      data,
      false
    );
  };

  const onSubmitEvaluation = (data) => {
    judgeSubmissionformMethod(
      selectedRow.challengeId._id,
      selectedRow._id,
      data,
      true
    );
  };

  const fileUpload = async (file, index) => {
    //file upload
    let formData = new FormData();

    formData.append("file", file);

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
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        let newArr = [...submissionForm];
        newArr[index]["progress"] = parseInt(uploadPercentage, 10);
        changeSubmissionForm(newArr);
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
      let newArr = [...submissionForm];
      delete newArr[index]["progress"];
      newArr[index]["value"] = fileResult.data.result.imageKey;
      changeSubmissionForm(newArr);
    }
  };

  return submissionListReducer.loading || loading ? (
    <Loading uploadPercentage={uploadPercentage} />
  ) : is_startup_Individual &&
    memberAsParticipant &&
    !organisationTeamMember ? (
    <MainContainer>
      {errors && errors.length ? (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : null}
      {formFilled ? (
        <div>
          <Row className="justify-content-center center-alignment header-container">
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent titleText={t("Submissions")} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={10} xs={10}>
              <div className="thankyou-text">
                {t("thank_submission_text")}{" "}
                <Link to="/all/challenges">{t("Other Challenges")}</Link>
              </div>
            </Col>
          </Row>
        </div>
      ) : !submissionVisibility ? (
        <div>
          <Row className="justify-content-center center-alignment header-container">
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent titleText={t("Submissions")} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={10} xs={10}>
              <div className="thankyou-text">
                {submissionClosed
                  ? t("submission_closed")
                  : t("submission_not_started")}{" "}
                <Link to="/all/challenges">{t("Other Challenges")}</Link>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Form
          noValidate
          validated={validated}
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (
              submissionForm &&
              submissionForm.length &&
              submissionForm.find(
                (each) =>
                  (each.isRequired && !each.choices && !each.value) ||
                  (each.isRequired &&
                    each.choices &&
                    each.choices.length &&
                    !each.choices.find((choice) => choice.checked))
              )
            ) {
              setValidated(true);
              setErrors([t("submission_validation_error")]);
            } else if (submissionForm.find((each) => each.progress)) {
              setValidated(true);
              setErrors([t("File upload in progress")]);
            } else {
              setErrors([]);
              let newArr = [...submissionForm];

              for (let i = 0; i < newArr.length; i++) {
                const record = newArr[i];
                if (
                  record.field &&
                  record.field === "Document-Upload-Box" &&
                  record.value &&
                  record.value.name
                ) {
                  // let fileResult = await Api.uploadFile({
                  //   file: record.value,
                  // });
                  // if (
                  //   fileResult &&
                  //   fileResult.result &&
                  //   fileResult.result.imageKey
                  // ) {
                  //   record.value = fileResult.result.imageKey;
                  // }
                  setLoading(true);

                  let formData = new FormData();

                  formData.append("file", record.value);

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
                        name: record.value.name,
                        message: t("Uploading file to submission"),
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
                    record.value = fileResult.data.result.imageKey;
                    setUploadPercentage({
                      message: t("Upload is successful and saved"),
                    });
                  }
                  setLoading(false);
                }
              }
              fillSubmissionformMethod(submissionForm);
            }
          }}
        >
          <Row className="justify-content-center center-alignment header-container">
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent
                titleText={t("Submissions")}
                buttonText={t("Submit")}
                buttonVariant="primary"
                buttonType="submit"
                haveProgressBar={true}
                progress={progress}
              />
            </Col>
          </Row>
          <Row
            className="justify-content-center text-left"
            style={{ marginBottom: 40 }}
          >
            <Col lg={10} md={10} sm={10} xs={10}>
              {submissionForm && submissionForm.length
                ? submissionForm.map((each, index) => {
                    return each.field === "Single-Field" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <Input
                          type="text"
                          label={each.title}
                          value={each.value}
                          onChange={(e) => {
                            let newArr = [...submissionForm];
                            newArr[index]["value"] = e.target.value;
                            changeSubmissionForm(newArr);
                          }}
                        />
                      </div>
                    ) : each.field === "Rich-Text-Editor" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <EditorInput
                          label={each.title}
                          value={each.value}
                          onChange={(value) => {
                            if (
                              value.replace(/<(.|\n)*?>/g, "").trim().length ===
                              0
                            ) {
                              //textarea is still empty
                              let newArr = [...submissionForm];
                              newArr[index]["value"] = "";
                              changeSubmissionForm(newArr);
                            } else {
                              let newArr = [...submissionForm];
                              newArr[index]["value"] = value;
                              changeSubmissionForm(newArr);
                            }
                          }}
                        />
                      </div>
                    ) : each.field === "Multiple-Choice" ? (
                      <div
                        className={
                          each.isRequired &&
                          !each.choices.find((choice) => choice.checked)
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="checkbox-container">
                          {each.choices && each.choices.length
                            ? each.choices.map((choice, choiceIndex) => {
                                return (
                                  <CheckBox
                                    key={choice._id}
                                    id={choice._id}
                                    checkBoxText={choice.title}
                                    checked={choice.checked}
                                    onChange={(e) => {
                                      let { checked } = e.target;
                                      let newArr = [...submissionForm];
                                      newArr[index]["choices"][choiceIndex][
                                        "checked"
                                      ] = checked;

                                      changeSubmissionForm(newArr);
                                    }}
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : each.field === "Single-Choice" ? (
                      <div
                        className={
                          each.isRequired &&
                          !each.choices.find((choice) => choice.checked)
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="checkbox-container">
                          {each.choices && each.choices.length
                            ? each.choices.map((choice, choiceIndex) => {
                                return (
                                  <RadioButton
                                    key={choice._id}
                                    id={choice._id}
                                    checkBoxText={choice.title}
                                    name="radioButton"
                                    checked={choice.checked}
                                    onChange={(e) => {
                                      let { checked } = e.target;
                                      let newArr = [...submissionForm];
                                      newArr[index][
                                        "choices"
                                      ] = each.choices.map(
                                        (record, recordIndex) => {
                                          if (choiceIndex === recordIndex) {
                                            record["checked"] = checked;
                                          } else {
                                            record["checked"] = false;
                                          }
                                          return record;
                                        }
                                      );

                                      changeSubmissionForm(newArr);
                                    }}
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : each.field === "Yes-No-Question" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="question-button-container">
                          <PrimaryButton
                            text={t("Yes")}
                            variant={each.value === "Yes" ? "primary" : "light"}
                            onClick={() => {
                              let newArr = [...submissionForm];
                              newArr[index]["value"] = "Yes";
                              changeSubmissionForm(newArr);
                            }}
                          />
                          <PrimaryButton
                            text={t("No")}
                            variant={each.value === "No" ? "primary" : "light"}
                            onClick={() => {
                              let newArr = [...submissionForm];
                              newArr[index]["value"] = "No";
                              changeSubmissionForm(newArr);
                            }}
                          />
                        </div>
                      </div>
                    ) : each.field === "Document-Upload-Box" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <FileInput
                          label={each.title}
                          prependButtonText={t("Browse")}
                          value={each.value}
                          progress={each.progress}
                          onChange={async (e) => {
                            let newArr = [...submissionForm];
                            newArr[index]["value"] = e.target.files[0];
                            changeSubmissionForm(newArr);
                            await fileUpload(e.target.files[0], index);
                          }}
                          maxMB={10}
                          aspectRatio={16 / 9}
                          onCropDone={async (file) => {
                            let newArr = [...submissionForm];
                            newArr[index]["value"] = file;
                            changeSubmissionForm(newArr);
                            await fileUpload(file, index);
                          }}
                          acceptTypes={
                            each.allowed_types &&
                            each.allowed_types.length &&
                            each.allowed_types.indexOf("*") < 0
                              ? each.allowed_types.join(",")
                              : "*"
                          }
                          description={`${t("Allowed file types are")}: ${
                            each.allowed_types && each.allowed_types.length
                              ? each.allowed_types.join(" , ")
                              : ""
                          }`}
                        ></FileInput>
                      </div>
                    ) : null;
                  })
                : null}
            </Col>
          </Row>
          <Row
            className="justify-content-center center-alignment header-container"
            style={{ marginBottom: 80 }}
          >
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent
                buttonText={t("Submit")}
                buttonVariant="primary"
                buttonType="submit"
                haveProgressBar={true}
                progress={progress}
              />
            </Col>
          </Row>
        </Form>
      )}
    </MainContainer>
  ) : is_mentor_judge ||
    is_organisation ||
    (organisationTeamMember &&
      organisationTeamMember.permission === Constants.TEAM_PERMISSION.ADMIN) ? (
    !judgingStarted ? (
      <MainContainer>
        <Row className="justify-content-center center-alignment header-container">
          <Col lg={10} md={10} sm={10} xs={10}>
            <HeaderComponent titleText={t("Submissions")} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <div className="thankyou-text">
              {t("judgement_not_started")}{" "}
              <Link to="/all/challenges">{t("Other Challenges")}</Link>
            </div>
          </Col>
        </Row>
      </MainContainer>
    ) : (
      <MainContainer>
        <Row className="justify-content-center center-alignment header-container">
          <Col
            lg={fromPreview ? 11 : 12}
            md={fromPreview ? 11 : 12}
            sm={fromPreview ? 11 : 12}
            xs={fromPreview ? 11 : 12}
          >
            {selectedRow ? (
              selectedRow.isDisqualified ? (
                <HeaderComponent
                  titleText={t("Submissions (DISQUALIFIED)")}
                  backButton={true}
                  onBackButtonClick={() => {
                    selectRow(null);
                    if (
                      queryString.parse(window.location.search).submissionId
                    ) {
                      history.push(
                        `/challenge/${challengeData._id}/preview/Submissions`
                      );
                    }
                  }}
                />
              ) : selectedRow.isEvaluated ? (
                <HeaderComponent
                  titleText={t("Submissions")}
                  backButton={true}
                  onBackButtonClick={() => {
                    selectRow(null);
                    if (
                      queryString.parse(window.location.search).submissionId
                    ) {
                      history.push(
                        `/challenge/${challengeData._id}/preview/Submissions`
                      );
                    }
                  }}
                />
              ) : judgingClosed ? (
                <HeaderComponent
                  titleText={t("Submissions")}
                  backButton={true}
                  onBackButtonClick={() => {
                    selectRow(null);
                    if (
                      queryString.parse(window.location.search).submissionId
                    ) {
                      history.push(
                        `/challenge/${challengeData._id}/preview/Submissions`
                      );
                    }
                  }}
                />
              ) : (
                <HeaderComponent
                  titleText={t("Submission")}
                  buttonText={t("Evaluate Submission")}
                  buttonVariant="primary"
                  buttonClick={() => {
                    setShow(true);
                  }}
                  infoButtonText={t("Disqualify")}
                  infoButtonVariant="danger_light"
                  infoButtonClick={() => {
                    setDisqualifyShow(true);
                  }}
                  backButton={true}
                  onBackButtonClick={() => {
                    selectRow(null);
                    if (
                      queryString.parse(window.location.search).submissionId
                    ) {
                      history.push(
                        `/challenge/${challengeData._id}/preview/Submissions`
                      );
                    }
                  }}
                />
              )
            ) : is_mentor_judge ? (
              <HeaderComponent titleText={t("Submissions")} />
            ) : fromPreview && challengeData && !challengeData.isPublished ? (
              <HeaderComponent
                titleText={t("Submissions")}
                buttonText={t("Edit Form")}
                buttonVariant="info"
                buttonClick={() => {
                  history.push(
                    `/challenge/${challengeData._id}/edit/Submission%20form`
                  );
                }}
              />
            ) : (
              <HeaderComponent titleText={t("Submissions")} />
            )}
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginBottom: 80 }}>
          <Col
            lg={fromPreview ? 11 : 12}
            md={fromPreview ? 11 : 12}
            sm={fromPreview ? 11 : 12}
            xs={fromPreview ? 11 : 12}
            style={{ padding: !selectedRow && "0" }}
          >
            {selectedRow ? (
              <div className="selected-row-container text-left">
                <div className="inline-block">
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">{t("Startup Name")}</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId &&
                        selectedRow.userId.details &&
                        selectedRow.userId.details.name}
                    </div>
                  </div>
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">{t("Owner Name")}</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId
                        ? selectedRow.userId.firstName &&
                          selectedRow.userId.lastName
                          ? selectedRow.userId.firstName +
                            " " +
                            selectedRow.userId.lastName
                          : selectedRow.userId.details &&
                            selectedRow.userId.details.name
                          ? selectedRow.userId.details.name
                          : selectedRow.userId.email
                        : selectedRow.userId.email}
                    </div>
                  </div>
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">{t("Location")}</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId &&
                        selectedRow.userId.details &&
                        selectedRow.userId.details.locationData}
                    </div>
                  </div>
                  {selectedRow.judgingPer && (
                    <div style={{ flex: 0.2 }}>
                      <div className="regular-text">
                        {t("Judging criteria")}
                      </div>
                      <div className="bold-semi-large-text">
                        {selectedRow.judgingPer}
                      </div>
                    </div>
                  )}
                </div>
                {selectedRow.form && selectedRow.form.length
                  ? selectedRow.form.map((each) => {
                      return each.field === "Single-Field" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div>{each.value}</div>
                        </div>
                      ) : each.field === "Rich-Text-Editor" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: each.value,
                            }}
                          />
                        </div>
                      ) : each.field === "Multiple-Choice" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div>
                            {each.choices &&
                              each.choices.length &&
                              each.choices
                                .filter((choice) => choice.checked)
                                .map((choice) => choice.title)
                                .join()}
                          </div>
                        </div>
                      ) : each.field === "Single-Choice" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div>
                            {each.choices &&
                              each.choices.length &&
                              each.choices
                                .filter((choice) => choice.checked)
                                .map((choice) => choice.title)
                                .join()}
                          </div>
                        </div>
                      ) : each.field === "Yes-No-Question" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div>
                            <PrimaryButton
                              text={each.value}
                              variant="primary"
                            />
                          </div>
                        </div>
                      ) : each.field === "Document-Upload-Box" ? (
                        <div className="block" key={each._id}>
                          <div className="regular-bold">{each.title}</div>
                          <div className="download-block">
                            <div className="icon-container">
                              <img
                                src="/images/attach.png"
                                alt=""
                                height="25px"
                                width="25px"
                              />
                            </div>
                            <div className="name">{each.value}</div>
                            <div className="button-container">
                              <PrimaryButton
                                variant="success_light"
                                text={t("Download attachment")}
                                onClick={() => {
                                  if (each && each.URL) {
                                    window.open(each.URL);
                                  } else {
                                    alert("No_file_found");
                                  }
                                }}
                              ></PrimaryButton>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  : null}
              </div>
            ) : (
              <Row>
                {submissions && submissions.length
                  ? submissions.map((each, index) => {
                      return (
                        <Col lg={6} md={6} sm={12} key={index}>
                          <div
                            className={`new-block ${
                              each.userId &&
                              each.userId.status === Constants.STATUS.INACTIVE
                                ? "disable"
                                : ""
                            }`}
                            onClick={() => {
                              if (
                                each.userId &&
                                each.userId.status === Constants.STATUS.ACTIVE
                              ) {
                                selectRow(each);
                              }
                            }}
                          >
                            <div>
                              {challengeData &&
                                challengeData.descriptionId &&
                                challengeData.descriptionId.title && (
                                  <div className="challenge-name">
                                    {challengeData.descriptionId.title}
                                  </div>
                                )}
                              <div className="basic-information">
                                <div className="user-name">
                                  {each.userId
                                    ? each.userId.details &&
                                      each.userId.details.name
                                      ? each.userId.details.name
                                      : each.userId.firstName &&
                                        each.userId.lastName
                                      ? each.userId.firstName +
                                        " " +
                                        each.userId.lastName
                                      : each.userId.email
                                    : null}
                                </div>
                                <div>Submitted Application</div>
                              </div>
                            </div>
                            <div>
                              <div
                                className="status-container"
                                style={
                                  each.isEvaluated
                                    ? {
                                        backgroundColor: "#e0f9ea",
                                        color: "#66e397",
                                        borderColor: "#66e397",
                                      }
                                    : each.isDisqualified
                                    ? {
                                        backgroundColor: "#fce7e7",
                                        color: "#f18989",
                                        borderColor: "#f18989",
                                      }
                                    : {
                                        backgroundColor: "#fdf1ce",
                                        color: "#f4ba09",
                                        borderColor: "#f4ba09",
                                      }
                                }
                              >
                                {each.isDisqualified
                                  ? "Disqualified"
                                  : each.isEvaluated
                                  ? "Approved"
                                  : "pending"}
                              </div>
                              <div>
                                {moment(each.createdDate).format("DD.MM.YYYY")}
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  : null}
              </Row>

              // <CommonTable
              //   filters={
              //     <div className="filter-container">
              //       <div className="controll-container">
              //         <DropDown
              //           isSmall={true}
              //           isSingle={true}
              //           isSelectOnly={true}
              //           placeholder={t("Filter Results")}
              //           options={[
              //             { label: t("All"), value: "all" },
              //             {
              //               label: t("Startup Name"),
              //               value: "startup_name",
              //             },
              //             {
              //               label: t("Owner Name"),
              //               value: "owner_name",
              //             },
              //             {
              //               label: t("Location"),
              //               value: "location",
              //             },
              //             {
              //               label: t("Industry"),
              //               value: "industry",
              //             },
              //             {
              //               label: t("Technology"),
              //               value: "technology",
              //             },
              //           ]}
              //           value={selectedFilter}
              //           onChange={(val) => {
              //             selectFilter(val);
              //           }}
              //         />
              //         <Input
              //           type="text"
              //           placeholder={t("Search")}
              //           value={searchText}
              //           onChange={(e) => {
              //             setSearchText(e.target.value);
              //           }}
              //         />
              //       </div>
              //     </div>
              //   }
              //   columns={[
              //     {
              //       Header: "",
              //       accessor: "active",
              //       width: "2.5%",
              //       standAlone: true,
              //       HeaderCell: () => {
              //         return (
              //           <div>
              //             <CheckBox
              //               id={`checkbox-${Math.random()}`}
              //               checkBoxText=""
              //               onChange={(e) => {
              //                 let { checked } = e.target;
              //                 changeSubmissions((data) => {
              //                   return data.filter((each) => {
              //                     each.active = checked;
              //                     return each;
              //                   });
              //                 });
              //               }}
              //             />
              //           </div>
              //         );
              //       },
              //       Cell: (checked, record) => {
              //         return (
              //           <div>
              //             <CheckBox
              //               id={`checkbox-${Math.random()}`}
              //               checkBoxText=""
              //               checked={checked}
              //               onChange={(e) => {
              //                 let { checked } = e.target;
              //                 changeSubmissions((data) => {
              //                   return data.filter((each) => {
              //                     if (each.id === record.id) {
              //                       each.active = checked;
              //                     }
              //                     return each;
              //                   });
              //                 });
              //               }}
              //             />
              //           </div>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Startup Name"),
              //       accessor: "userId",
              //       width: "19%",
              //       Cell: (data) => {
              //         return (
              //           <span>{data && data.details && data.details.name}</span>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Owner Name"),
              //       accessor: "userId",
              //       width: "19%",
              //       Cell: (data) => {
              //         return (
              //           <span>
              //             {data && data.firstName} {data && data.lastName}
              //           </span>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Location"),
              //       accessor: "userId",
              //       width: "19%",
              //       Cell: (data) => {
              //         return (
              //           <span>
              //             {data && data.details && data.details.locationData}
              //           </span>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Industry"),
              //       accessor: "userId",
              //       width: "19%",
              //       Cell: (data) => {
              //         return (
              //           <span>
              //             {data &&
              //               data.businessTags &&
              //               data.businessTags.industry &&
              //               data.businessTags.industry
              //                 .map((each) => {
              //                   return each.name;
              //                 })
              //                 .join()}
              //           </span>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Technology"),
              //       accessor: "userId",
              //       width: "19%",
              //       Cell: (data) => {
              //         return (
              //           <span>
              //             {data &&
              //               data.businessTags &&
              //               data.businessTags.technology &&
              //               data.businessTags.technology
              //                 .map((each) => {
              //                   return each.name;
              //                 })
              //                 .join()}
              //           </span>
              //         );
              //       },
              //     },
              //     {
              //       Header: t("Elegiable"),
              //       accessor: "Elegiable",
              //       width: "2.5%",
              //       Cell: (data) => {
              //         return (
              //           <div className="circle-container">
              //             <div className="elegiable-circle"></div>
              //           </div>
              //         );
              //       },
              //     },
              //   ]}
              //   data={submissions}
              //   showPagination={false}
              //   onRowClick={(val) => {
              //     selectRow(val);
              //   }}
              // />
            )}
          </Col>
        </Row>
        <EvaluateModal
          t={t}
          show={show}
          setShow={setShow}
          selectedRow={selectedRow}
          challengeData={challengeData}
          onSaveDraft={onSaveDraft}
          onSubmitEvaluation={onSubmitEvaluation}
        />
        <DisqualifyModal
          t={t}
          show={showDisqualify}
          setShow={setDisqualifyShow}
          errors={errors}
          onDisqualify={onDisqualify}
        />
      </MainContainer>
    )
  ) : (
    <Row className="justify-content-center">
      <Col lg={11} md={11} sm={11} xs={11}>
        <div className="no-data-text">
          {t("Invitation is expired or Permission denied")}{" "}
          <Link to="/dashboard">{t("explore other challenges")}</Link>
        </div>
      </Col>
    </Row>
  );
};

export default Submissions;
