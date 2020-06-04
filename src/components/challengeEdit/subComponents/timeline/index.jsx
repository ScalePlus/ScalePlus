import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  DateInput,
  DropDown,
  TextArea,
  RemoveButton,
  AddButton,
  Input,
  FileInput,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import Stepper from "../../../stepper";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import theme from "../../../../theme";

const Timeline = () => {
  const [validated, setValidated] = useState(false);
  const [timeline, changeTimeline] = useState([
    {
      date: "",
      dropDown: "",
      description: "",
      adminAttachments: [],
      userAttachments: [],
    },
  ]);
  return (
    <MainContainer>
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
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            alert();
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
                changeTimeline(
                  timeline.concat({
                    date: "",
                    dropDown: "",
                    description: "",
                    adminAttachments: [],
                    userAttachments: [],
                  })
                );
              }}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: 45 }}>
          <Col>
            <div className="timeline">
              <Stepper
                steps={[
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                  { title: "April 9, 2020" },
                ]}
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

        <Row>
          <Col>
            {timeline.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <div className="left-container">
                    <Row>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <DateInput
                          isSmall={true}
                          maxDate={new Date()}
                          value={each.date}
                          onChange={(date) => {
                            changeTimeline(
                              timeline.map((data, i) => {
                                if (index === i) {
                                  data["date"] = date;
                                }
                                return data;
                              })
                            );
                          }}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <DropDown
                          isSmall={true}
                          inBox={true}
                          placeholder=""
                          options={[
                            { value: "1", label: "Start" },
                            { value: "2", label: "Submission Deadline" },
                            { value: "3", label: "Judging" },
                            { value: "5", label: "Judging Closed" },
                            { value: "5", label: "Won" },
                          ]}
                          value={each.dropDown}
                          onChange={(val) => {
                            changeTimeline(
                              timeline.map((data, i) => {
                                if (index === i) {
                                  data["dropDown"] = val;
                                }
                                return data;
                              })
                            );
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
                            changeTimeline(
                              timeline.map((data, i) => {
                                if (index === i) {
                                  data["description"] = e.target.value;
                                }
                                return data;
                              })
                            );
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
                                      data.adminAttachments.push({});
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
                              key={attachIndex}
                            >
                              <Row>
                                <Col lg={5} md={12} sm={12} xs={12}>
                                  <div className="file-container">
                                    <FileInput
                                      placeholder="file name……word"
                                      prependButtonText="Browse"
                                    ></FileInput>
                                  </div>
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                  <div className="title-container">
                                    <div className="title">Title</div>
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
                                                data.adminAttachments = data.adminAttachments.filter(
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
                      : null}
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
                    </Row>
                    {each.userAttachments && each.userAttachments.length
                      ? each.userAttachments.map((attach, attachIndex) => {
                          return (
                            <div
                              className="attachment-container"
                              key={attachIndex}
                            >
                              <Row>
                                <Col lg={7} md={12} sm={12} xs={12}>
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
                      : null}
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        if (timeline.length > 1) {
                          changeTimeline(
                            timeline.filter((data, i) => {
                              return index !== i;
                            })
                          );
                        }
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
