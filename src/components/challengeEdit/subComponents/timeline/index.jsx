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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { getChallengeAction } from "../../../challengeMaster/action";
// import Api from "../../../challengeMaster/api";
import { attachTimelineAction, getTimelineStateAction } from "./action";
import {
  DateInput,
  DropDown,
  TextArea,
  RemoveButton,
  UpdateCountButton,
  AddButton,
  // Input,
  FileInput,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import Stepper from "../../../stepper";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import theme from "../../../../theme";
import { Constants } from "../../../../lib/constant";
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Timeline = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachTimelineMethod = (data) =>
    dispatch(attachTimelineAction(data, challengeId));
  const getTimelineStateMethod = useCallback(
    () => dispatch(getTimelineStateAction()),
    [dispatch]
  );
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeTimelineReducer = useSelector((state) => {
    return state.challengeTimelineReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [timeline, changeTimeline] = useState([]);
  const [stateList, changeStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(null);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

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

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { timelineId } = challengeData;
      if (timelineId && timelineId.data) {
        changeTimeline(timelineId.data);
      } else {
        const { timelineStatesSuccess } = challengeTimelineReducer;
        if (timelineStatesSuccess && timelineStatesSuccess.result) {
          if (timelineStatesSuccess.result.length) {
            const listOrder = [
              "Start",
              "Presentation",
              "Workshop",
              "Submission",
              "Judging",
              "Announcement",
              "Closing",
            ];
            changeTimeline([]);
            for (let i = 0; i < listOrder.length; i++) {
              const each = listOrder[i];
              if (timelineStatesSuccess.result.find((rec) => rec.name === each))
                changeTimeline((data) =>
                  data.concat({
                    _id: `timeline-${data.length + 1}`,
                    startDate: "",
                    endDate: "",
                    state: timelineStatesSuccess.result.find(
                      (rec) => rec.name === each
                    ),
                    description: "",
                    adminAttachments: [],
                    isCustom: false,
                  })
                );
            }
          }
        }
      }
    }
  }, [challengeReducer, challengeTimelineReducer]);

  const checkTimeline = () => {
    for (let i = 0; i < timeline.length; i++) {
      const record = timeline[i];
      if (
        !record.startDate ||
        // (record.startDate && new Date(record.startDate) < new Date()) ||
        !record.endDate ||
        !record.state ||
        (i > 0 &&
          (new Date(record.startDate) < new Date(timeline[i - 1].endDate) ||
            new Date(record.startDate) <
              new Date(timeline[i - 1].startDate))) ||
        (record.adminAttachments &&
          record.adminAttachments.length &&
          record.adminAttachments.find((each) => each.progress))
      ) {
        return false;
      }
    }
    return true;
  };

  const fileUpload = async (file, index, attachIndex) => {
    // file upload
    const attachmentRecord = {
      file,
    };
    if (attachmentRecord.file && attachmentRecord.file.name) {
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
          const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
          let newArr = [...timeline];
          newArr[index]["adminAttachments"][attachIndex]["progress"] = parseInt(
            uploadPercentage,
            10
          );
          changeTimeline(newArr);
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
        let newArr = [...timeline];
        delete newArr[index]["adminAttachments"][attachIndex]["progress"];
        newArr[index]["adminAttachments"][attachIndex]["file"] =
          fileResult.data.result.imageKey;
        changeTimeline(newArr);
      }
    }
  };

  const isPositionAvailable = (sourceIndex, destinationIndex) => {
    let sourceRecord = timeline.find((rec, index) => index === sourceIndex),
      destinationRecord = timeline.find(
        (rec, index) => index === destinationIndex
      );

    if (sourceRecord && sourceRecord.state && sourceRecord.state.name) {
      if (
        sourceRecord.state.name === "Presentation" ||
        sourceRecord.state.name === "Submission"
      ) {
        return true;
      } else if (sourceRecord.state.name === "Workshop") {
        if (
          sourceIndex !== destinationIndex &&
          destinationRecord &&
          destinationRecord.state &&
          (destinationRecord.state.name !== "Presentation" ||
            (destinationRecord.state.name === "Presentation" &&
              timeline.find(
                (rec, index) =>
                  index < destinationIndex && rec.state.name === "Presentation"
              )))
        ) {
          return true;
        } else {
          return false;
        }
      } else if (sourceRecord.state.name === "Judging") {
        if (
          sourceIndex !== destinationIndex &&
          destinationRecord &&
          destinationRecord.state &&
          (destinationRecord.state.name !== "Submission" ||
            (destinationRecord.state.name === "Submission" &&
              timeline.find(
                (rec, index) =>
                  index < destinationIndex && rec.state.name === "Submission"
              )))
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const isPositionAvailableForNew = (newState, index) => {
    if (newState === "Presentation" || newState === "Submission") {
      return true;
    } else if (
      newState === "Workshop" &&
      timeline &&
      timeline.length &&
      timeline.find(
        (rec, ind) => ind <= index && rec.state.name === "Presentation"
      )
    ) {
      return true;
    } else if (
      newState === "Judging" &&
      timeline &&
      timeline.length &&
      timeline.find(
        (rec, ind) => ind <= index && rec.state.name === "Submission"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <MainContainer>
      {(challengeTimelineReducer.loading ||
        challengeReducer.loading ||
        loading) && <Loading uploadPercentage={uploadPercentage} />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock buttonText={t("Click Here")}>
            <span>{t("Timeline_info_text")}</span>
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
      //   checkTimeline() &&
      challengeTimelineReducer &&
        challengeTimelineReducer.success &&
        challengeTimelineReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeTimelineReducer.success.message}</div>
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
            let newArr = [...timeline];
            setLoading(true);

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
            attachTimelineMethod({
              timeline: newArr,
            });
          } else if (
            timeline &&
            timeline.length &&
            timeline.find(
              (record) =>
                record.adminAttachments &&
                record.adminAttachments.length &&
                record.adminAttachments.find((each) => each.progress)
            )
          ) {
            if (errors.indexOf(t("File upload in progress")) < 0) {
              setErrors([t("File upload in progress")]);
            }
            setValidated(true);
          } else {
            setValidated(true);
          }
        }}
        style={{ marginBottom: 30 }}
      >
        <Row style={{ marginBottom: 65 }}>
          <Col>
            <HeaderComponent
              titleText={t("Timeline")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
              infoButtonText={t("Add Item")}
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                if (
                  timeline &&
                  timeline.length &&
                  timeline.find(
                    (record) =>
                      record.adminAttachments &&
                      record.adminAttachments.length &&
                      record.adminAttachments.find((each) => each.progress)
                  )
                ) {
                  if (errors.indexOf(t("File upload in progress")) < 0) {
                    setErrors([t("File upload in progress")]);
                  }
                } else {
                  let newArr = [...timeline];

                  newArr.splice(newArr.length - 2, 0, {
                    _id: `timeline-${newArr.length + 1}`,
                    startDate: "",
                    endDate: "",
                    state: "",
                    description: "",
                    adminAttachments: [],
                    isCustom: true,
                  });

                  changeTimeline(newArr);
                }
              }}
            />
          </Col>
        </Row>

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
            {timeline && timeline.length ? (
              <DragDropContext
                onDragEnd={(result) => {
                  if (
                    !result.source ||
                    !result.source.index ||
                    !result.destination ||
                    (result.destination &&
                      (!result.destination.index ||
                        (result.destination.index &&
                          (result.destination.index === timeline.length - 1 ||
                            result.destination.index ===
                              timeline.length - 2)))) ||
                    !isPositionAvailable(
                      result.source.index,
                      result.destination.index
                    )
                  ) {
                    alert(t("This position is not available"));
                    return;
                  }
                  changeTimeline((data) =>
                    reorder(data, result.source.index, result.destination.index)
                  );
                }}
              >
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {timeline.map((each, index) => {
                        return (
                          <Draggable
                            key={each._id}
                            draggableId={each._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="box-container"
                              >
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
                                            ? new Date(
                                                timeline[index - 1].endDate
                                              )
                                            : new Date()
                                        }
                                        minDate={
                                          index > 0 &&
                                          timeline &&
                                          timeline.length &&
                                          timeline[index - 1] &&
                                          timeline[index - 1].endDate
                                            ? new Date(
                                                timeline[index - 1].endDate
                                              )
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
                                                new Date(
                                                  timeline[index - 1].endDate
                                                )
                                              )
                                              ? setHours(
                                                  setMinutes(new Date(), 0),
                                                  0
                                                )
                                              : setHours(
                                                  setMinutes(
                                                    new Date(
                                                      timeline[
                                                        index - 1
                                                      ].endDate
                                                    ),
                                                    getMinutes(
                                                      new Date(
                                                        timeline[
                                                          index - 1
                                                        ].endDate
                                                      )
                                                    )
                                                  ),
                                                  getHours(
                                                    new Date(
                                                      timeline[
                                                        index - 1
                                                      ].endDate
                                                    )
                                                  )
                                                )
                                            : each.startDate &&
                                              !isSameDay(
                                                new Date(each.startDate),
                                                new Date()
                                              )
                                            ? setHours(
                                                setMinutes(new Date(), 0),
                                                0
                                              )
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
                                          newArr[index][
                                            "startDate"
                                          ] = startDate;
                                          newArr[index]["endDate"] = "";
                                          changeTimeline(newArr);
                                        }}
                                        placeholder={t("Start Date")}
                                        required
                                        isInvalid={
                                          // (index &&
                                          //   new Date(each.startDate) <
                                          //     new Date()) ||
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
                                              ? setHours(
                                                  setMinutes(new Date(), 0),
                                                  0
                                                )
                                              : setHours(
                                                  setMinutes(
                                                    new Date(),
                                                    getMinutes(
                                                      new Date(each.startDate)
                                                    ) + 15
                                                  ),
                                                  getHours(
                                                    new Date(each.startDate)
                                                  )
                                                )
                                            : setHours(
                                                setMinutes(
                                                  new Date(),
                                                  getMinutes(new Date()) + 15
                                                ),
                                                getHours(new Date())
                                              )
                                        }
                                        maxTime={setHours(
                                          setMinutes(new Date(), 45),
                                          23
                                        )}
                                        value={
                                          each.endDate
                                            ? new Date(each.endDate)
                                            : null
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
                                        isDisabled={!each.isCustom}
                                        isSelectOnly={true}
                                        isSmall={true}
                                        inBox={true}
                                        isSingle={true}
                                        placeholder={t("Select_state")}
                                        options={
                                          !each.isCustom
                                            ? stateList
                                            : stateList.filter(
                                                (each) =>
                                                  each.label !== "Start" &&
                                                  each.label !==
                                                    "Announcement" &&
                                                  each.label !== "Closing"
                                              )
                                        }
                                        value={stateList.find((option) =>
                                          each.state
                                            ? each.state._id
                                              ? option.value === each.state._id
                                              : option.value === each.state
                                            : ""
                                        )}
                                        onChange={(val) => {
                                          if (
                                            isPositionAvailableForNew(
                                              val.label,
                                              index
                                            )
                                          ) {
                                            let newArr = [...timeline];
                                            newArr[index][
                                              "state"
                                            ] = challengeTimelineReducer.timelineStatesSuccess.result.find(
                                              (each) =>
                                                each._id.toString() ===
                                                val.value.toString()
                                            );
                                            changeTimeline(newArr);
                                          } else {
                                            let newArr = [...timeline];
                                            newArr[index]["state"] = "";
                                            changeTimeline(newArr);
                                            alert(
                                              t(
                                                "This position is not available"
                                              )
                                            );
                                          }
                                        }}
                                        // onChange={(val) => {
                                        //   let newArr = [...timeline];
                                        //   newArr[index]["state"] = val;
                                        //   changeTimeline(newArr);
                                        // }}
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
                                    <Col lg={6} md={12} sm={12} xs={12}>
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
                                                        data.adminAttachments
                                                          .length + 1
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
                                      placeholder={t("Default_value_File_name")}
                                      value={attach.label}
                                      onChange={(e) => {
                                        let newArr = [...timeline];
                                        newArr[index]["adminAttachments"][
                                          attachIndex
                                        ]["label"] = e.target.value;
                                        changeTimeline(newArr);
                                      }}
                                      required
                                      errorMessage={t("file_name_error")}
                                    ></Input>
                                  </div>
                                </Col> */}
                                                <Col
                                                  lg={12}
                                                  md={12}
                                                  sm={12}
                                                  xs={12}
                                                >
                                                  <div className="file-container">
                                                    <FileInput
                                                      placeholder={t(
                                                        "file name……word"
                                                      )}
                                                      prependButtonText={t(
                                                        "Browse"
                                                      )}
                                                      value={attach.file}
                                                      progress={attach.progress}
                                                      onChange={async (e) => {
                                                        let newArr = [
                                                          ...timeline,
                                                        ];
                                                        newArr[index][
                                                          "adminAttachments"
                                                        ][attachIndex]["file"] =
                                                          e.target.files[0];
                                                        changeTimeline(newArr);
                                                        await fileUpload(
                                                          e.target.files[0],
                                                          index,
                                                          attachIndex
                                                        );
                                                      }}
                                                      maxMB={10}
                                                      aspectRatio={16 / 9}
                                                      onCropDone={async (
                                                        file
                                                      ) => {
                                                        let newArr = [
                                                          ...timeline,
                                                        ];
                                                        newArr[index][
                                                          "adminAttachments"
                                                        ][attachIndex][
                                                          "file"
                                                        ] = file;
                                                        changeTimeline(newArr);
                                                        await fileUpload(
                                                          file,
                                                          index,
                                                          attachIndex
                                                        );
                                                      }}
                                                      required
                                                      errorMessage={t(
                                                        "file_error"
                                                      )}
                                                      acceptTypes="*"
                                                    ></FileInput>
                                                    <div className="remove-container">
                                                      <RemoveButton
                                                        onClick={() => {
                                                          let newArr = [
                                                            ...timeline,
                                                          ];
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
                                                          changeTimeline(
                                                            newArr
                                                          );
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
                                  {/* <Row className="file-document-container">
                      <Col lg={6} md={12} sm={12} xs={12}>
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
                            USER | Enable Documents Submission
                          </div>
                          <div className="button-container">
                            <AddButton
                              onClick={() => {
                                changeTimeline(
                                  timeline.map((data, i) => {
                                    if (index === i) {
                                      data.userAttachments.push({});
                                    }
                                    return data;
                                  })
                                );
                              }}
                            ></AddButton>
                          </div>
                        </div>
                      </Col>
                    </Row> */}
                                  {/* {each.userAttachments && each.userAttachments.length
                      ? each.userAttachments.map((attach, attachIndex) => {
                          return (
                            <div
                              className="attachment-container"
                              key={attachIndex}
                            >
                              <Row>
                                <Col lg={6} md={12} sm={12} xs={12}>
                                  <div className="label-title-container">
                                    <div className="field-title">
                                      Field Label
                                    </div>
                                    <Input
                                      type="text"
                                      placeholder="*Default value: File name"
                                    ></Input>
                                    <div className="remove-container">
                                      <RemoveButton
                                        onClick={() => {
                                          changeTimeline(
                                            timeline.filter((data, i) => {
                                              if (index === i) {
                                                data.userAttachments = data.userAttachments.filter(
                                                  (record, recordIndex) => {
                                                    return (
                                                      recordIndex !==
                                                      attachIndex
                                                    );
                                                  }
                                                );
                                              }
                                              return data;
                                            })
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          );
                        })
                      : null} */}
                                </div>
                                <div
                                  className="right-container"
                                  style={{
                                    display:
                                      each.isCustom ||
                                      (each.state && each.state.name
                                        ? each.state.name !== "Start" &&
                                          each.state.name !== "Announcement" &&
                                          each.state.name !== "Closing"
                                        : false)
                                        ? ""
                                        : "none",
                                  }}
                                >
                                  <RemoveButton
                                    onClick={() => {
                                      if (
                                        timeline &&
                                        timeline.length &&
                                        timeline.find(
                                          (record) =>
                                            record.adminAttachments &&
                                            record.adminAttachments.length &&
                                            record.adminAttachments.find(
                                              (each) => each.progress
                                            )
                                        )
                                      ) {
                                        if (
                                          errors.indexOf(
                                            t("File upload in progress")
                                          ) < 0
                                        ) {
                                          setErrors([
                                            t("File upload in progress"),
                                          ]);
                                        }
                                      } else {
                                        let newArr = [...timeline];
                                        newArr = newArr.filter((data) => {
                                          return each._id !== data._id;
                                        });
                                        changeTimeline(newArr);
                                      }
                                    }}
                                  />
                                  <div
                                    style={{ marginTop: "0.5rem" }}
                                    {...provided.dragHandleProps}
                                  >
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

      <Row>
        <Col className="bottom-block">
          <InfoBlock>
            <span>{t("Timeline_info_bottom_text")}</span>
          </InfoBlock>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Timeline;
