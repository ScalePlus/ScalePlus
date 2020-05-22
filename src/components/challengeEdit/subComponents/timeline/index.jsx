import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { DateInput, DropDown, TextArea, RemoveButton } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import Stepper from "../../../stepper";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import theme from "../../../../theme";

const Timeline = () => {
  const [validated, setValidated] = useState(false);
  const [timeline, changeTimeline] = useState([
    { date: "", dropDown: "", description: "" },
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
        <Row style={{ marginBottom: 45 }}>
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
                  timeline.concat({ date: "", dropDown: "", description: "" })
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
              />
            </div>
          </Col>
        </Row>

        {timeline.map((each, index) => {
          return (
            <div className="box-container" key={index}>
              <Row>
                <Col lg={11} md={11} sm={10} xs={10}>
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
                <Col lg={1} md={1} sm={2} xs={2}>
                  <div className="float-right">
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
                </Col>
              </Row>
            </div>
          );
        })}
      </Form>

      <Row>
        <Col>
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
