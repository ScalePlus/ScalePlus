import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import {
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  isSameDay,
} from "date-fns";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import Api from "../challengeMaster/api";
import { getTimelineStateAction } from "../challengeEdit/subComponents/timeline/action";
import {
  DateInput,
  DropDown,
  TextArea,
  RemoveButton,
  AddButton,
  // Input,
  FileInput,
  PageTitle,
  PrimaryButton,
  Loading,
} from "../common";
import Stepper from "../stepper";
import { MainContainer } from "../challengeEdit/subComponents/timeline/style";
import theme from "../../theme";
import { Constants } from "../../lib/constant";

const Step4 = ({ t, timeline, changeTimeline, createChallenge }) => {
  const dispatch = useDispatch();
  const getTimelineStateMethod = useCallback(
    () => dispatch(getTimelineStateAction()),
    [dispatch]
  );

  const challengeTimelineReducer = useSelector((state) => {
    return state.challengeTimelineReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [stateList, changeStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  useEffect(() => {
    getTimelineStateMethod();
  }, [getTimelineStateMethod]);

  useEffect(() => {
    const { error, timelineStatesSuccess } = challengeTimelineReducer;
    if (timelineStatesSuccess && timelineStatesSuccess.result) {
      if (timelineStatesSuccess.result.length) {
        changeStateList(
          timelineStatesSuccess.result.map((each) => {
            return {
              value: each._id,
              label: each.name,
            };
          })
        );
      } else {
        changeStateList([]);
      }
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeTimelineReducer]);

  const checkTimeline = () => {
    let localErrors = [];
    for (let i = 0; i < timeline.length; i++) {
      const record = timeline[i];
      if (
        !record.startDate ||
        (record.startDate && new Date(record.startDate) < new Date()) ||
        !record.endDate ||
        !record.state ||
        (i > 0 &&
          (new Date(record.startDate) < new Date(timeline[i - 1].endDate) ||
            new Date(record.startDate) < new Date(timeline[i - 1].startDate)))
      ) {
        if (errors.indexOf(t("There is some issue with dates")) < 0) {
          localErrors.push(t("There is some issue with dates"));
        }
        setErrors(localErrors);
        return false;
      } else if (
        record.adminAttachments &&
        record.adminAttachments.length &&
        record.adminAttachments.find((each) => each.progress)
      ) {
        if (errors.indexOf(t("File uploading is in progress")) < 0) {
          localErrors.push(t("File uploading is in progress"));
          setErrors(localErrors);
        }
        return false;
      }
    }
    return true;
  };

  return (
    <Row className="sub-container">
      <Col>
        {loading && <Loading uploadPercentage={uploadPercentage} />}

        <Row className="sub-title">
          <Col>{t("STEP4_title")}</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <div className="flex-container">
              <PageTitle text={t("STEP4_pagetitle")} />

              <PrimaryButton
                text={t("Add")}
                variant="info"
                type="button"
                onClick={() => {
                  changeTimeline((data) =>
                    data.concat({
                      _id: `timeline-${data.length + 1}`,
                      startDate: "",
                      endDate: "",
                      state: "",
                      description: "",
                      adminAttachments: [],
                    })
                  );
                }}
              ></PrimaryButton>
            </div>
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>{t("STEP4_subtitle")}</Col>
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
        ) : null}

        <Form
          noValidate
          validated={validated}
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity() && checkTimeline()) {
              setLoading(true);
              let newArr = [...timeline];
              for (let i = 0; i < newArr.length; i++) {
                const record = newArr[i];
                if (
                  record &&
                  record.adminAttachments &&
                  record.adminAttachments.length
                ) {
                  for (let j = 0; j < record.adminAttachments.length; j++) {
                    const attachmentRecord = record.adminAttachments[j];
                    if (attachmentRecord.file && attachmentRecord.file.name) {
                      // let fileResult = await Api.uploadFile({
                      //   file: attachmentRecord.file,
                      // });
                      // if (
                      //   fileResult &&
                      //   fileResult.result &&
                      //   fileResult.result.imageKey
                      // ) {
                      //   attachmentRecord.file = fileResult.result.imageKey;
                      // }
                      let formData = new FormData();

                      formData.append("file", attachmentRecord.file);

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
                            name: attachmentRecord.file.name,
                            message: t("Uploading file to timeline"),
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
                        attachmentRecord.file = fileResult.data.result.imageKey;
                        setUploadPercentage({
                          message: t("Upload is successful and saved"),
                        });
                      }
                    }
                  }
                }
              }
              setLoading(false);
              changeTimeline(newArr);
              createChallenge();
            } else {
              window.scrollTo(0, 0);
              setValidated(true);
            }
          }}
          style={{ marginBottom: 30 }}
        >
          <MainContainer style={{ marginTop: 35 }}>
            {timeline && timeline.length && timeline.length > 1 ? (
              <Row style={{ marginBottom: 45 }}>
                <Col>
                  <div className="timeline">
                    <Stepper
                      steps={timeline.map((each) => {
                        return {
                          title: moment(each.startDate).format("MMMM DD, YYYY"),
                        };
                      })}
                      activeColor={theme.colors.black}
                      defaultColor={theme.colors.black}
                      completeColor={theme.colors.black}
                      defaultBarColor={theme.colors.black}
                      completeBarColor={theme.colors.black}
                      activeTitleColor={theme.colors.black}
                      defaultTitleColor={theme.colors.black}
                      borderTopWidth={2}
                      circleTop={25}
                      size={25}
                      barStyle="dashed"
                      showNumber={false}
                      showStartEndLabel={true}
                      titleFontSize={theme.fontSize.small}
                      isLeftAligned={true}
                    />
                  </div>
                </Col>
              </Row>
            ) : null}

            <Row>
              <Col>
                {timeline && timeline.length
                  ? timeline.map((each, index) => {
                      return (
                        <div className="box-container" key={each._id}>
                          <div className="left-container">
                            <Row>
                              <Col lg={4} md={4} sm={12} xs={12}>
                                <DateInput
                                  isSmall={true}
                                  showTime={true}
                                  openToDate={
                                    each.startDate
                                      ? new Date(each.startDate)
                                      : index > 0 &&
                                        timeline &&
                                        timeline.length &&
                                        timeline[index - 1] &&
                                        timeline[index - 1].endDate
                                      ? new Date(timeline[index - 1].endDate)
                                      : new Date()
                                  }
                                  minDate={
                                    index > 0 &&
                                    timeline &&
                                    timeline.length &&
                                    timeline[index - 1] &&
                                    timeline[index - 1].endDate
                                      ? new Date(timeline[index - 1].endDate)
                                      : new Date()
                                  }
                                  minTime={
                                    index > 0 &&
                                    timeline &&
                                    timeline.length &&
                                    timeline[index - 1] &&
                                    timeline[index - 1].endDate
                                      ? each.startDate &&
                                        !isSameDay(
                                          new Date(each.startDate),
                                          new Date(timeline[index - 1].endDate)
                                        )
                                        ? setHours(setMinutes(new Date(), 0), 0)
                                        : setHours(
                                            setMinutes(
                                              new Date(
                                                timeline[index - 1].endDate
                                              ),
                                              getMinutes(
                                                new Date(
                                                  timeline[index - 1].endDate
                                                )
                                              )
                                            ),
                                            getHours(
                                              new Date(
                                                timeline[index - 1].endDate
                                              )
                                            )
                                          )
                                      : each.startDate &&
                                        !isSameDay(
                                          new Date(each.startDate),
                                          new Date()
                                        )
                                      ? setHours(setMinutes(new Date(), 0), 0)
                                      : setHours(
                                          setMinutes(
                                            new Date(),
                                            getMinutes(new Date())
                                          ),
                                          getHours(new Date())
                                        )
                                  }
                                  maxTime={setHours(
                                    setMinutes(new Date(), 45),
                                    23
                                  )}
                                  value={
                                    each.startDate
                                      ? new Date(each.startDate)
                                      : null
                                  }
                                  onChange={(startDate) => {
                                    let newArr = [...timeline];
                                    newArr[index]["startDate"] = startDate;
                                    newArr[index]["endDate"] = "";
                                    changeTimeline(newArr);
                                  }}
                                  placeholder={t("Start Date")}
                                  required
                                  isInvalid={
                                    new Date(each.startDate) < new Date() ||
                                    timeline.find(
                                      (record, recordIndex) =>
                                        recordIndex < index &&
                                        (new Date(record.startDate) >
                                          new Date(each.startDate) ||
                                          new Date(record.endDate) >
                                            new Date(each.startDate))
                                    )
                                  }
                                  errorMessage={
                                    each.startDate
                                      ? t("invalid_startDate_error")
                                      : t("startDate_error")
                                  }
                                />
                              </Col>
                              <Col lg={4} md={4} sm={12} xs={12}>
                                <DateInput
                                  isSmall={true}
                                  showTime={true}
                                  openToDate={
                                    each.startDate
                                      ? new Date(each.startDate)
                                      : new Date()
                                  }
                                  minDate={
                                    each.startDate
                                      ? new Date(each.startDate)
                                      : new Date()
                                  }
                                  minTime={
                                    each.startDate
                                      ? each.endDate &&
                                        !isSameDay(
                                          new Date(each.startDate),
                                          new Date(each.endDate)
                                        )
                                        ? setHours(setMinutes(new Date(), 0), 0)
                                        : setHours(
                                            setMinutes(
                                              new Date(),
                                              getMinutes(
                                                new Date(each.startDate)
                                              )
                                            ),
                                            getHours(new Date(each.startDate)) +
                                              1
                                          )
                                      : setHours(
                                          setMinutes(
                                            new Date(),
                                            getMinutes(new Date())
                                          ),
                                          getHours(new Date()) + 1
                                        )
                                  }
                                  maxTime={setHours(
                                    setMinutes(new Date(), 45),
                                    23
                                  )}
                                  value={
                                    each.endDate ? new Date(each.endDate) : null
                                  }
                                  onChange={(endDate) => {
                                    let newArr = [...timeline];
                                    newArr[index]["endDate"] = endDate;
                                    changeTimeline(newArr);
                                  }}
                                  placeholder={t("End Date")}
                                  required
                                  isInvalid={
                                    new Date(each.endDate) <
                                    new Date(each.startDate)
                                  }
                                  errorMessage={
                                    each.startDate
                                      ? t("invalid_endDate_error")
                                      : t("endDate_error")
                                  }
                                />
                              </Col>
                              <Col lg={4} md={4} sm={12} xs={12}>
                                <DropDown
                                  isSmall={true}
                                  inBox={true}
                                  isSingle={true}
                                  placeholder={t("Select_state")}
                                  options={stateList}
                                  value={stateList.find((option) =>
                                    each.state._id
                                      ? option.value === each.state._id
                                      : option.value === each.state
                                  )}
                                  onChange={(val) => {
                                    let newArr = [...timeline];
                                    newArr[index]["state"] = val;
                                    changeTimeline(newArr);
                                  }}
                                  isInvalid={validated && !each.state}
                                  errorMessage={t("dropdown_error")}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <TextArea
                                  rows="2"
                                  value={each.description}
                                  placeholder={t("Description")}
                                  onChange={(e) => {
                                    let newArr = [...timeline];
                                    newArr[index]["description"] =
                                      e.target.value;
                                    changeTimeline(newArr);
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row className="file-document-container">
                              <Col lg={7} md={12} sm={12} xs={12}>
                                <div className="header-container">
                                  <div className="icon-container">
                                    <img
                                      src="/images/attach.png"
                                      alt=""
                                      height="25px"
                                      width="25px"
                                    />
                                  </div>
                                  <div className="name">
                                    {t(
                                      "ADMIN | Attach required Forms/documents"
                                    )}
                                  </div>
                                  <div className="button-container">
                                    <AddButton
                                      onClick={() => {
                                        changeTimeline(
                                          timeline.map((data, i) => {
                                            if (index === i) {
                                              data.adminAttachments.push({
                                                _id: `attachment-${
                                                  data.adminAttachments.length +
                                                  1
                                                }`,
                                                label: "",
                                                file: "",
                                              });
                                            }
                                            return data;
                                          })
                                        );
                                      }}
                                    ></AddButton>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            {each.adminAttachments &&
                            each.adminAttachments.length
                              ? each.adminAttachments.map(
                                  (attach, attachIndex) => {
                                    return (
                                      <div
                                        className="attachment-container"
                                        key={attach._id}
                                      >
                                        <Row>
                                          {/* <Col lg={6} md={12} sm={12} xs={12}>
                                            <div className="label-title-container">
                                              <div className="title">
                                                {t("Field Label")}
                                              </div>
                                              <Input
                                                type="text"
                                                placeholder={t(
                                                  "Default_value_File_name"
                                                )}
                                                value={attach.label}
                                                onChange={(e) => {
                                                  let newArr = [...timeline];
                                                  newArr[index][
                                                    "adminAttachments"
                                                  ][attachIndex]["label"] =
                                                    e.target.value;
                                                  changeTimeline(newArr);
                                                }}
                                                required
                                                errorMessage={t(
                                                  "file_name_error"
                                                )}
                                              ></Input>
                                            </div>
                                          </Col> */}
                                          <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className="file-container">
                                              <FileInput
                                                placeholder={t(
                                                  "file name……word"
                                                )}
                                                prependButtonText="Browse"
                                                value={attach.file}
                                                progress={attach.progress}
                                                maxMB={10}
                                                onChange={async (e) => {
                                                  let newArr = [...timeline];
                                                  newArr[index][
                                                    "adminAttachments"
                                                  ][attachIndex]["file"] =
                                                    e.target.files[0];
                                                  changeTimeline(newArr);

                                                  // file upload
                                                  const attachmentRecord = {
                                                    file: e.target.files[0],
                                                  };
                                                  if (
                                                    attachmentRecord.file &&
                                                    attachmentRecord.file.name
                                                  ) {
                                                    let formData = new FormData();

                                                    formData.append(
                                                      "file",
                                                      attachmentRecord.file
                                                    );

                                                    let fileResult = await Axios(
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `JWT ${localStorage.getItem(
                                                            "token"
                                                          )}`,
                                                        },
                                                        method: "POST",
                                                        data: formData,
                                                        url: "/uploadFile", // route name
                                                        baseURL:
                                                          Constants.BASE_URL, //local url
                                                        onUploadProgress: (
                                                          progress
                                                        ) => {
                                                          const {
                                                            total,
                                                            loaded,
                                                          } = progress;
                                                          const totalSizeInMB =
                                                            total / 1000000;
                                                          const loadedSizeInMB =
                                                            loaded / 1000000;
                                                          const uploadPercentage =
                                                            (loadedSizeInMB /
                                                              totalSizeInMB) *
                                                            100;
                                                          let newArr = [
                                                            ...timeline,
                                                          ];
                                                          newArr[index][
                                                            "adminAttachments"
                                                          ][attachIndex][
                                                            "progress"
                                                          ] = parseInt(
                                                            uploadPercentage,
                                                            10
                                                          );
                                                          changeTimeline(
                                                            newArr
                                                          );
                                                        },
                                                        encType:
                                                          "multipart/form-data",
                                                      }
                                                    );

                                                    if (
                                                      fileResult &&
                                                      fileResult.status ===
                                                        200 &&
                                                      fileResult.data &&
                                                      fileResult.data.result &&
                                                      fileResult.data.result
                                                        .imageKey
                                                    ) {
                                                      let newArr = [
                                                        ...timeline,
                                                      ];
                                                      delete newArr[index][
                                                        "adminAttachments"
                                                      ][attachIndex][
                                                        "progress"
                                                      ];
                                                      newArr[index][
                                                        "adminAttachments"
                                                      ][attachIndex]["file"] =
                                                        fileResult.data.result.imageKey;
                                                      changeTimeline(newArr);
                                                    }
                                                  }
                                                }}
                                                required
                                                errorMessage={t("file_error")}
                                                acceptTypes="*"
                                              ></FileInput>
                                              <div className="remove-container">
                                                <RemoveButton
                                                  onClick={() => {
                                                    let newArr = [...timeline];
                                                    newArr[index][
                                                      "adminAttachments"
                                                    ] = each.adminAttachments.filter(
                                                      (data) => {
                                                        return (
                                                          attach._id !==
                                                          data._id
                                                        );
                                                      }
                                                    );
                                                    changeTimeline(newArr);
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    );
                                  }
                                )
                              : null}
                          </div>
                          {timeline &&
                          timeline.length &&
                          timeline.length > 1 ? (
                            <div className="right-container">
                              <RemoveButton
                                onClick={() => {
                                  let newArr = [...timeline];
                                  newArr = newArr.filter((data) => {
                                    return each._id !== data._id;
                                  });
                                  changeTimeline(newArr);
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </Col>
            </Row>
          </MainContainer>
          <Row className="right-content-container">
            <Col>{t("You can always edit this information later")}</Col>
          </Row>
          <Row className="button-container">
            <Col className="center-component">
              <PrimaryButton
                variant="primary"
                text={t("Continue")}
                type="submit"
              ></PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Step4;
