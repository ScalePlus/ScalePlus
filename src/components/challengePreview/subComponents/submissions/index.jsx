import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../challengeMaster/api";
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
  CommonTable,
  Input,
  EditorInput,
  FileInput,
  RadioButton,
  DropDown,
} from "../../../common";
import { HeaderComponent } from "../common";
import EvaluateModal from "./evaluateModal";
import DisqualifyModal from "./disqualifyModal";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const Submissions = ({
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
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, selectFilter] = useState(null);

  useEffect(() => {
    if (challengeData && challengeData._id && localStorage.getItem("token")) {
      getSubmissionsListMethod(challengeData._id, {
        selectedFilter: selectedFilter ? selectedFilter.value : "",
        searchText,
      });
    }
  }, [getSubmissionsListMethod, challengeData, selectedFilter, searchText]);

  useEffect(() => {
    const { disqualifySuccess } = submissionListReducer;
    if (disqualifySuccess) {
      setDisqualifyShow(false);
      changeSubmissions((data) => {
        let filterData = data.filter(
          (each) => selectedRow && each._id.toString() !== selectedRow._id
        );
        return filterData && filterData.length ? filterData : null;
      });
      selectRow(null);
    }
  }, [submissionListReducer, selectedRow]);

  useEffect(() => {
    const {
      error,
      success,
      submissionsListSuccess,
      judgeSuccess,
    } = submissionListReducer;

    if (judgeSuccess) {
      setShow(false);
    }

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
    disqualifySubmissionMethod(selectedRow.challengeId, selectedRow._id);
  };

  const onSaveDraft = (data) => {
    judgeSubmissionformMethod(
      selectedRow.challengeId,
      selectedRow._id,
      data,
      false
    );
  };

  const onSubmitEvaluation = (data) => {
    judgeSubmissionformMethod(
      selectedRow.challengeId,
      selectedRow._id,
      data,
      true
    );
  };

  return is_startup_Individual && !organisationTeamMember ? (
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
              <HeaderComponent titleText="Submissions" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={10} xs={10}>
              <div className="thankyou-text">
                Thank you, your successuflly submission, you will hear from us
                soon, You can explore{" "}
                <Link to="/all/challenges">Other Challenges</Link>
              </div>
            </Col>
          </Row>
        </div>
      ) : !submissionVisibility ? (
        <div>
          <Row className="justify-content-center center-alignment header-container">
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent titleText="Submissions" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={10} xs={10}>
              <div className="thankyou-text">
                {`Submission is ${
                  submissionClosed ? "closed" : "not started yet"
                }, You can explore`}{" "}
                <Link to="/all/challenges">Other Challenges</Link>
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
              setErrors([
                `Submission form is not complete. Please fill all the required
          fields.`,
              ]);
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
                  let fileResult = await Api.uploadFile({
                    file: record.value,
                  });
                  if (
                    fileResult &&
                    fileResult.result &&
                    fileResult.result.imageKey
                  ) {
                    record.value = fileResult.result.imageKey;
                  }
                }
              }
              fillSubmissionformMethod(submissionForm);
            }
          }}
        >
          <Row className="justify-content-center center-alignment header-container">
            <Col lg={10} md={10} sm={10} xs={10}>
              <HeaderComponent
                titleText="Submissions"
                buttonText="Submit"
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
                            let newArr = [...submissionForm];
                            newArr[index]["value"] = value;
                            changeSubmissionForm(newArr);
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
                            text="Yes"
                            variant={each.value === "Yes" ? "primary" : "light"}
                            onClick={() => {
                              let newArr = [...submissionForm];
                              newArr[index]["value"] = "Yes";
                              changeSubmissionForm(newArr);
                            }}
                          />
                          <PrimaryButton
                            text="No"
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
                          prependButtonText="Browse"
                          value={each.value}
                          onChange={(e) => {
                            let newArr = [...submissionForm];
                            newArr[index]["value"] = e.target.files[0];
                            changeSubmissionForm(newArr);
                          }}
                          description="Allowed file types: word, pdf"
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
                buttonText="Submit"
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
            <HeaderComponent titleText="Submissions" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <div className="thankyou-text">
              {`Judging is not started yet, You can explore`}{" "}
              <Link to="/all/challenges">Other Challenges</Link>
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
                <HeaderComponent titleText="Submissions (DISQUALIFIED)" />
              ) : selectedRow.isEvaluated ? (
                <HeaderComponent titleText="Submissions" />
              ) : judgingClosed ? (
                <HeaderComponent titleText="Submissions" />
              ) : (
                <HeaderComponent
                  titleText="Submission"
                  buttonText="Evaluate Submission"
                  buttonVariant="primary"
                  buttonClick={() => {
                    setShow(true);
                  }}
                  infoButtonText="Disqualify"
                  infoButtonVariant="danger_light"
                  infoButtonClick={() => {
                    setDisqualifyShow(true);
                  }}
                  backButton={true}
                  onBackButtonClick={() => {
                    selectRow(null);
                  }}
                />
              )
            ) : is_mentor_judge ? (
              <HeaderComponent titleText="Submissions" />
            ) : fromPreview && challengeData && !challengeData.isPublished ? (
              <HeaderComponent
                titleText="Submissions"
                buttonText="Edit Form"
                buttonVariant="info"
                buttonClick={() => {
                  history.push(
                    `/challenge/${challengeData._id}/edit/Submission%20form`
                  );
                }}
              />
            ) : null}
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginBottom: 80 }}>
          <Col
            lg={fromPreview ? 11 : 12}
            md={fromPreview ? 11 : 12}
            sm={fromPreview ? 11 : 12}
            xs={fromPreview ? 11 : 12}
          >
            {selectedRow ? (
              <div className="selected-row-container text-left">
                <div className="inline-block">
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">Startup Name</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId &&
                        selectedRow.userId.details &&
                        selectedRow.userId.details.name}
                    </div>
                  </div>
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">Owner Name</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId && selectedRow.userId.firstName}{" "}
                      {selectedRow.userId && selectedRow.userId.lastName}
                    </div>
                  </div>
                  <div style={{ flex: 0.2 }}>
                    <div className="regular-text">Location</div>
                    <div className="bold-semi-large-text">
                      {selectedRow.userId &&
                        selectedRow.userId.details &&
                        selectedRow.userId.details.locationData}
                    </div>
                  </div>
                  {selectedRow.judgingPer && (
                    <div style={{ flex: 0.2 }}>
                      <div className="regular-text">Judging Criteria</div>
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
                                text={"Download attachment"}
                                onClick={() => {
                                  if (each && each.URL) {
                                    window.open(each.URL);
                                  } else {
                                    alert("No file found.");
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
              <CommonTable
                filters={
                  <div className="filter-container">
                    <div className="controll-container">
                      <DropDown
                        isSmall={true}
                        isSingle={true}
                        isSelectOnly={true}
                        placeholder="Filter Results"
                        options={[
                          { label: "All", value: "all" },
                          {
                            label: "Startup Name",
                            value: "startup_name",
                          },
                          {
                            label: "Owner Name",
                            value: "owner_name",
                          },
                          {
                            label: "Location",
                            value: "location",
                          },
                          {
                            label: "Industry",
                            value: "industry",
                          },
                          {
                            label: "Technology",
                            value: "technology",
                          },
                        ]}
                        value={selectedFilter}
                        onChange={(val) => {
                          selectFilter(val);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                        }}
                      />
                      {/* <div className="text">Search</div> */}
                    </div>
                  </div>
                }
                columns={[
                  {
                    Header: "",
                    accessor: "active",
                    width: "2.5%",
                    standAlone: true,
                    HeaderCell: () => {
                      return (
                        <div>
                          <CheckBox
                            id={`checkbox-${Math.random()}`}
                            checkBoxText=""
                            onChange={(e) => {
                              let { checked } = e.target;
                              changeSubmissions((data) => {
                                return data.filter((each) => {
                                  each.active = checked;
                                  return each;
                                });
                              });
                            }}
                          />
                        </div>
                      );
                    },
                    Cell: (checked, record) => {
                      return (
                        <div>
                          <CheckBox
                            id={`checkbox-${Math.random()}`}
                            checkBoxText=""
                            checked={checked}
                            onChange={(e) => {
                              let { checked } = e.target;
                              changeSubmissions((data) => {
                                return data.filter((each) => {
                                  if (each.id === record.id) {
                                    each.active = checked;
                                  }
                                  return each;
                                });
                              });
                            }}
                          />
                        </div>
                      );
                    },
                  },
                  {
                    Header: "Startup Name",
                    accessor: "userId",
                    width: "19%",
                    Cell: (data) => {
                      return (
                        <span>{data && data.details && data.details.name}</span>
                      );
                    },
                  },
                  {
                    Header: "Owner Name",
                    accessor: "userId",
                    width: "19%",
                    Cell: (data) => {
                      return (
                        <span>
                          {data && data.firstName} {data && data.lastName}
                        </span>
                      );
                    },
                  },
                  {
                    Header: "Location",
                    accessor: "userId",
                    width: "19%",
                    Cell: (data) => {
                      return (
                        <span>
                          {data && data.details && data.details.locationData}
                        </span>
                      );
                    },
                  },
                  {
                    Header: "Industry",
                    accessor: "userId",
                    width: "19%",
                    Cell: (data) => {
                      return (
                        <span>
                          {data &&
                            data.businessTags &&
                            data.businessTags.industry &&
                            data.businessTags.industry
                              .map((each) => {
                                return each.name;
                              })
                              .join()}
                        </span>
                      );
                    },
                  },
                  {
                    Header: "Technology",
                    accessor: "userId",
                    width: "19%",
                    Cell: (data) => {
                      return (
                        <span>
                          {data &&
                            data.businessTags &&
                            data.businessTags.technology &&
                            data.businessTags.technology
                              .map((each) => {
                                return each.name;
                              })
                              .join()}
                        </span>
                      );
                    },
                  },
                  {
                    Header: "Elegiable",
                    accessor: "Elegiable",
                    width: "2.5%",
                    Cell: (data) => {
                      return (
                        <div className="circle-container">
                          <div className="elegiable-circle"></div>
                        </div>
                      );
                    },
                  },
                ]}
                data={submissions}
                showPagination={false}
                onRowClick={(val) => {
                  selectRow(val);
                }}
              />
            )}
          </Col>
        </Row>
        <EvaluateModal
          show={show}
          setShow={setShow}
          selectedRow={selectedRow}
          challengeData={challengeData}
          onSaveDraft={onSaveDraft}
          onSubmitEvaluation={onSubmitEvaluation}
        />
        <DisqualifyModal
          show={showDisqualify}
          setShow={setDisqualifyShow}
          errors={errors}
          onDisqualify={onDisqualify}
        />
      </MainContainer>
    )
  ) : null;
};

export default Submissions;
