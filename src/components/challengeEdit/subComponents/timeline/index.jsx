import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { getChallengeAction } from "../../../challengeMaster/action";
import Api from "../../../challengeMaster/api";
import { attachTimelineAction, getTimelineStateAction } from "./action";
import {
  DateInput,
  DropDown,
  TextArea,
  RemoveButton,
  AddButton,
  Input,
  FileInput,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import Stepper from "../../../stepper";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import theme from "../../../../theme";

const Timeline = ({ challengeId }) => {
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

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    getTimelineStateMethod();
  }, [getTimelineStateMethod]);

  useEffect(() => {
    const { error, timelineStatesSuccess } = challengeTimelineReducer;
    if (
      timelineStatesSuccess &&
      timelineStatesSuccess.result &&
      timelineStatesSuccess.result.length
    ) {
      changeStateList(
        timelineStatesSuccess.result.map((each) => {
          return {
            value: each._id,
            label: each.name,
          };
        })
      );
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
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeTimelineReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock buttonText="Click Here">
            <span>
              Thinking about extending your submission deadline? Check out our
              guide and recommended next steps here.
            </span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
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
          if (form.checkValidity()) {
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
                    let fileResult = await Api.uploadFile({
                      file: attachmentRecord.file,
                    });
                    if (
                      fileResult &&
                      fileResult.result &&
                      fileResult.result.imageKey
                    ) {
                      attachmentRecord.file = fileResult.result.imageKey;
                    }
                  }
                }
              }
            }

            attachTimelineMethod({
              timeline: newArr,
            });
          }
          setValidated(true);
        }}
        style={{ marginBottom: 30 }}
      >
        <Row style={{ marginBottom: 65 }}>
          <Col>
            <HeaderComponent
              titleText="Timeline"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                if (
                  timeline &&
                  (!timeline.length || (timeline.length && timeline.length < 5))
                ) {
                  changeTimeline((data) =>
                    data.concat({
                      _id: `timeline-${data.length + 1}`,
                      date: "",
                      state: "",
                      description: "",
                      adminAttachments: [],
                    })
                  );
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
                    return { title: moment(each.date).format("MMMM DD, YYYY") };
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
            {timeline.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <DateInput
                          isSmall={true}
                          minDate={new Date().setDate(new Date().getDate() + 1)}
                          value={each.date ? new Date(each.date) : null}
                          onChange={(date) => {
                            let newArr = [...timeline];
                            newArr[index]["date"] = date;
                            changeTimeline(newArr);
                          }}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <DropDown
                          isSmall={true}
                          inBox={true}
                          isSingle={true}
                          placeholder=""
                          options={stateList}
                          value={stateList.find((option) =>
                            each.state._id
                              ? option.value === each.state._id
                              : option.value === each.state
                          )}
                          onChange={(val) => {
                            let newArr = [...timeline];
                            newArr[index]["state"] = val.value;
                            changeStateList((data) =>
                              data.filter((each) => each.value !== val.value)
                            );
                            changeTimeline(newArr);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextArea
                          rows="2"
                          value={each.description}
                          onChange={(e) => {
                            let newArr = [...timeline];
                            newArr[index]["description"] = e.target.value;
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
                            ADMIN | Attach required Forms/documents
                          </div>
                          <div className="button-container">
                            <AddButton
                              onClick={() => {
                                changeTimeline(
                                  timeline.map((data, i) => {
                                    if (index === i) {
                                      data.adminAttachments.push({
                                        _id: `attachment-${
                                          data.adminAttachments.length + 1
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
                    {each.adminAttachments && each.adminAttachments.length
                      ? each.adminAttachments.map((attach, attachIndex) => {
                          return (
                            <div
                              className="attachment-container"
                              key={attach._id}
                            >
                              <Row>
                                <Col lg={6} md={12} sm={12} xs={12}>
                                  <div className="title-container">
                                    <div className="title">Field Label</div>
                                    <Input
                                      type="text"
                                      placeholder="*Default value: File name"
                                      value={attach.label}
                                      onChange={(e) => {
                                        let newArr = [...timeline];
                                        newArr[index]["adminAttachments"][
                                          attachIndex
                                        ]["label"] = e.target.value;
                                        changeTimeline(newArr);
                                      }}
                                    ></Input>
                                    <div className="remove-container">
                                      <RemoveButton
                                        onClick={() => {
                                          let newArr = [...timeline];
                                          newArr[index][
                                            "adminAttachments"
                                          ] = each.adminAttachments.filter(
                                            (data) => {
                                              return attach._id !== data._id;
                                            }
                                          );
                                          changeTimeline(newArr);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col
                                  lg={{
                                    span: 5,
                                    offset: 1,
                                  }}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                >
                                  <div className="file-container">
                                    <FileInput
                                      placeholder="file name……word"
                                      prependButtonText="Browse"
                                      value={attach.file}
                                      onChange={(e) => {
                                        let newArr = [...timeline];
                                        newArr[index]["adminAttachments"][
                                          attachIndex
                                        ]["file"] = e.target.files[0];
                                        changeTimeline(newArr);
                                      }}
                                    ></FileInput>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          );
                        })
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
                                  <div className="title-container">
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
                </div>
              );
            })}
          </Col>
        </Row>
      </Form>

      <Row>
        <Col className="bottom-block">
          <InfoBlock>
            <span>
              Adding a timeline to your challenge page not only allows visitors
              to see your important dates, it enables your challenge to move
              seamlessly from one stage to the next. For example, when you add
              the Enter stage to your timeline, the Scale+ platform will
              automatically change the buttons on your challenge page to begin
              accepting registrations at the date and time you set. Start
              building your timeline now by clicking the Add Event button.
            </span>
          </InfoBlock>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Timeline;
