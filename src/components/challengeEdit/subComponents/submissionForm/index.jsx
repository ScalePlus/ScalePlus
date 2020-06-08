import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  Input,
  TextArea,
  RemoveButton,
  UpdateCountButton,
  AddButton,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const SubmissionForm = () => {
  const [validated, setValidated] = useState(false);
  const [submissionForm, setForm] = useState([]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Competitors will fill out this form and judges will use the
              responses to select the winners of the challenge. Add as many
              fields as are necessary. Be clear and concise and be sure to ask
              for all the relevant information. In addition to the fields you
              add, there are three fields that will be automatically included in
              your form: The Submission Title, a Short Description of the
              submission (140 characters), and an Image that illustrates the
              submission. Be as clear as possible with your questions. This will
              be the information that you will use to select the winners.
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
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText="Submission Form"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              menuButtonText="Add Item"
              menuButtonVariant="info"
              menuList={[
                {
                  title: "Single Text Field",
                  onClick: () => {
                    setForm((data) => data.concat({ field: "Single-Field" }));
                  },
                },
                {
                  title: "Rich Text Editor",
                  onClick: () => {
                    setForm((data) =>
                      data.concat({ field: "Rich-Text-Editor" })
                    );
                  },
                },
                {
                  title: "Multiple Choice",
                  onClick: () => {
                    setForm((data) =>
                      data.concat({
                        field: "Multiple-Choice",
                        choices: [],
                      })
                    );
                  },
                },
                {
                  title: "Single Choice",
                  onClick: () => {
                    setForm((data) =>
                      data.concat({ field: "Single-Choice", choices: [] })
                    );
                  },
                },
                {
                  title: "Yes, No Question",
                  onClick: () => {
                    setForm((data) =>
                      data.concat({ field: "Yes-No-Question" })
                    );
                  },
                },
                {
                  title: "Document Upload Box",
                  onClick: () => {
                    setForm((data) =>
                      data.concat({ field: "Document-Upload-Box" })
                    );
                  },
                },
              ]}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 80 }}>
          <Col>
            {submissionForm && submissionForm.length ? (
              <div>
                {submissionForm.map((each, index) => {
                  return (
                    <div className="box-container" key={index}>
                      <div className="left-container">
                        {each.field === "Single-Field" && (
                          <div>
                            <div className="title">Single Field Title</div>
                            <div className="field-container">
                              <Input
                                type="text"
                                label="Field Title"
                                placeholder="e.g: How did you hear about us"
                              />
                            </div>
                          </div>
                        )}
                        {each.field === "Rich-Text-Editor" && (
                          <div>
                            <div className="title">Rich Text Editor</div>
                            <div className="field-container">
                              <Input
                                type="text"
                                label="Field Title"
                                placeholder="e.g: How did you hear about us"
                              />
                            </div>
                          </div>
                        )}
                        {each.field === "Document-Upload-Box" && (
                          <div>
                            <div className="title">Document Upload Box</div>
                            <div className="field-container">
                              <Input
                                type="text"
                                label="Field Title"
                                placeholder="e.g: How did you hear about us"
                              />
                            </div>
                          </div>
                        )}
                        {each.field === "Yes-No-Question" && (
                          <div>
                            <div className="title">Yes No Question</div>
                            <div className="field-container">
                              <TextArea
                                label="Enter your question below"
                                placeholder="e.g: How did you hear about us"
                                rows="2"
                              />
                            </div>
                          </div>
                        )}
                        {each.field === "Multiple-Choice" && (
                          <div>
                            <div className="title">Multiple Choice</div>
                            <div className="field-container">
                              <TextArea
                                label="Enter your question below"
                                placeholder="e.g: How did you hear about us"
                                rows="2"
                              />
                            </div>
                            <div className="add-button-container">
                              <AddButton
                                onClick={() => {
                                  setForm((data) =>
                                    data.map((each, i) => {
                                      if (index === i) {
                                        each.choices.push({});
                                      }
                                      return each;
                                    })
                                  );
                                }}
                              />
                            </div>
                            {each.choices && each.choices.length
                              ? each.choices.map((eachCHoice, choiceIdex) => {
                                  return (
                                    <div
                                      key={choiceIdex}
                                      className="choice-container"
                                    >
                                      <div className="choice-left-container">
                                        <div className="choice-text">
                                          Choice {choiceIdex + 1}
                                        </div>
                                        <div className="choice-input">
                                          <Input type="text" />
                                        </div>
                                      </div>
                                      <div className="choice-right-container">
                                        <RemoveButton
                                          onClick={() => {
                                            setForm((data) =>
                                              data.map((each, i) => {
                                                if (index === i) {
                                                  each.choices = each.choices.filter(
                                                    (choiceData, i) => {
                                                      return choiceIdex !== i;
                                                    }
                                                  );
                                                }
                                                return each;
                                              })
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        )}
                        {each.field === "Single-Choice" && (
                          <div>
                            <div className="title">SINGLE Choice</div>
                            <div className="field-container">
                              <TextArea
                                label="Enter your question below"
                                placeholder="e.g: How did you hear about us"
                                rows="2"
                              />
                            </div>
                            <div className="add-button-container">
                              <AddButton
                                onClick={() => {
                                  setForm((data) =>
                                    data.map((each, i) => {
                                      if (index === i) {
                                        each.choices.push({});
                                      }
                                      return each;
                                    })
                                  );
                                }}
                              />
                            </div>
                            {each.choices && each.choices.length
                              ? each.choices.map((eachCHoice, choiceIdex) => {
                                  return (
                                    <div
                                      key={choiceIdex}
                                      className="choice-container"
                                    >
                                      <div className="choice-left-container">
                                        <div className="choice-text">
                                          Choice {choiceIdex + 1}
                                        </div>
                                        <div className="choice-input">
                                          <Input type="text" />
                                        </div>
                                      </div>
                                      <div className="choice-right-container">
                                        <RemoveButton
                                          onClick={() => {
                                            setForm((data) =>
                                              data.map((each, i) => {
                                                if (index === i) {
                                                  each.choices = each.choices.filter(
                                                    (choiceData, i) => {
                                                      return choiceIdex !== i;
                                                    }
                                                  );
                                                }
                                                return each;
                                              })
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        )}
                      </div>
                      <div className="right-container">
                        <div style={{ marginBottom: 10 }}>
                          <RemoveButton
                            onClick={() => {
                              setForm((data) =>
                                data.filter((each, i) => {
                                  return index !== i;
                                })
                              );
                            }}
                          />
                        </div>
                        <UpdateCountButton onClick={() => {}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="table-body-container">
                <span>!!!Add Form Builder Here!!!</span>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default SubmissionForm;
