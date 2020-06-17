import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachSubmissionformAction } from "./action";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Input,
  TextArea,
  RemoveButton,
  UpdateCountButton,
  AddButton,
  Switch,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SubmissionForm = ({ challengeId }) => {
  const dispatch = useDispatch();
  const attachSubmissionformMethod = (data) =>
    dispatch(attachSubmissionformAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeSubmissionformReducer = useSelector((state) => {
    return state.challengeSubmissionformReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [submissionForm, setForm] = useState([]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeSubmissionformReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeSubmissionformReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { submissionFormId } = challengeData;
      if (submissionFormId && submissionFormId.data) {
        setForm(submissionFormId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeSubmissionformReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
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
      {validated &&
      challengeSubmissionformReducer &&
      challengeSubmissionformReducer.success &&
      challengeSubmissionformReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeSubmissionformReducer.success.message}</div>
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
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            attachSubmissionformMethod({
              submissionForm,
            });
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
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Single-Field",
                        title: "",
                        isRequired: false,
                      })
                    );
                  },
                },
                {
                  title: "Rich Text Editor",
                  onClick: () => {
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Rich-Text-Editor",
                        title: "",
                        isRequired: false,
                      })
                    );
                  },
                },
                {
                  title: "Multiple Choice",
                  onClick: () => {
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Multiple-Choice",
                        title: "",
                        isRequired: false,
                        choices: [],
                      })
                    );
                  },
                },
                {
                  title: "Single Choice",
                  onClick: () => {
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Single-Choice",
                        title: "",
                        isRequired: false,
                        choices: [],
                      })
                    );
                  },
                },
                {
                  title: "Yes, No Question",
                  onClick: () => {
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Yes-No-Question",
                        title: "",
                        isRequired: false,
                      })
                    );
                  },
                },
                {
                  title: "Document Upload Box",
                  onClick: () => {
                    setValidated(false);
                    setForm((data) =>
                      data.concat({
                        _id: `feild-${data.length + 1}`,
                        field: "Document-Upload-Box",
                        title: "",
                        isRequired: false,
                      })
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
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) {
                    return;
                  }
                  setForm((data) =>
                    reorder(data, result.source.index, result.destination.index)
                  );
                }}
              >
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {submissionForm.map((each, index) => {
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
                                  {each.field === "Single-Field" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Single Field Title</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <Input
                                          required
                                          type="text"
                                          label="Field Title *"
                                          placeholder="e.g: How did you hear about us"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {each.field === "Rich-Text-Editor" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Rich Text Editor</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <Input
                                          required
                                          type="text"
                                          label="Field Title *"
                                          placeholder="e.g: How did you hear about us"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {each.field === "Document-Upload-Box" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Document Upload Box</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <Input
                                          required
                                          type="text"
                                          label="Field Title *"
                                          placeholder="e.g: How did you hear about us"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {each.field === "Yes-No-Question" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Yes No Question</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <TextArea
                                          required
                                          label="Enter your question below *"
                                          placeholder="e.g: How did you hear about us"
                                          rows="2"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {each.field === "Multiple-Choice" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Multiple Choice</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <TextArea
                                          required
                                          label="Enter your question below *"
                                          placeholder="e.g: How did you hear about us"
                                          rows="2"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                      <div className="add-button-container">
                                        <AddButton
                                          onClick={() => {
                                            setForm((data) =>
                                              data.map((each, i) => {
                                                if (index === i) {
                                                  each.choices.push({
                                                    _id: `choice-${
                                                      each.choices.length + 1
                                                    }`,
                                                    title: "",
                                                  });
                                                }
                                                return each;
                                              })
                                            );
                                          }}
                                        />
                                      </div>
                                      {each.choices && each.choices.length
                                        ? each.choices.map(
                                            (eachChoice, choiceIdex) => {
                                              return (
                                                <div
                                                  key={eachChoice._id}
                                                  className="choice-container"
                                                >
                                                  <div className="choice-left-container">
                                                    <div className="choice-text">
                                                      Choice {choiceIdex + 1}
                                                    </div>
                                                    <div className="choice-input">
                                                      <Input
                                                        required
                                                        type="text"
                                                        value={eachChoice.title}
                                                        onChange={(e) => {
                                                          let newArr = [
                                                            ...submissionForm,
                                                          ];
                                                          newArr[index][
                                                            "choices"
                                                          ][choiceIdex][
                                                            "title"
                                                          ] = e.target.value;
                                                          setForm(newArr);
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="choice-right-container">
                                                    <RemoveButton
                                                      onClick={() => {
                                                        let newArr = [
                                                          ...submissionForm,
                                                        ];
                                                        newArr[index][
                                                          "choices"
                                                        ] = each.choices.filter(
                                                          (choiceData) => {
                                                            return (
                                                              choiceData._id !==
                                                              eachChoice._id
                                                            );
                                                          }
                                                        );
                                                        setForm(newArr);
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                    </div>
                                  )}
                                  {each.field === "Single-Choice" && (
                                    <div>
                                      <div className="title-container">
                                        <div>Single Choice</div>
                                        <div>
                                          <Switch
                                            checked={each.isRequired}
                                            onChange={() => {
                                              let newArr = [...submissionForm];
                                              newArr[index][
                                                "isRequired"
                                              ] = !newArr[index]["isRequired"];
                                              setForm(newArr);
                                            }}
                                            variant="primary"
                                            label="Required"
                                          ></Switch>
                                        </div>
                                      </div>
                                      <div className="field-container">
                                        <TextArea
                                          required
                                          label="Enter your question below *"
                                          placeholder="e.g: How did you hear about us"
                                          rows="2"
                                          value={each.title}
                                          onChange={(e) => {
                                            let newArr = [...submissionForm];
                                            newArr[index]["title"] =
                                              e.target.value;
                                            setForm(newArr);
                                          }}
                                        />
                                      </div>
                                      <div className="add-button-container">
                                        <AddButton
                                          onClick={() => {
                                            setForm((data) =>
                                              data.map((each, i) => {
                                                if (index === i) {
                                                  each.choices.push({
                                                    _id: `choice-${
                                                      each.choices.length + 1
                                                    }`,
                                                    title: "",
                                                  });
                                                }
                                                return each;
                                              })
                                            );
                                          }}
                                        />
                                      </div>
                                      {each.choices && each.choices.length
                                        ? each.choices.map(
                                            (eachChoice, choiceIdex) => {
                                              return (
                                                <div
                                                  key={eachChoice._id}
                                                  className="choice-container"
                                                >
                                                  <div className="choice-left-container">
                                                    <div className="choice-text">
                                                      Choice {choiceIdex + 1}
                                                    </div>
                                                    <div className="choice-input">
                                                      <Input
                                                        required
                                                        type="text"
                                                        value={eachChoice.title}
                                                        onChange={(e) => {
                                                          let newArr = [
                                                            ...submissionForm,
                                                          ];
                                                          newArr[index][
                                                            "choices"
                                                          ][choiceIdex][
                                                            "title"
                                                          ] = e.target.value;
                                                          setForm(newArr);
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="choice-right-container">
                                                    <RemoveButton
                                                      onClick={() => {
                                                        let newArr = [
                                                          ...submissionForm,
                                                        ];
                                                        newArr[index][
                                                          "choices"
                                                        ] = each.choices.filter(
                                                          (choiceData) => {
                                                            return (
                                                              choiceData._id !==
                                                              eachChoice._id
                                                            );
                                                          }
                                                        );
                                                        setForm(newArr);
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                    </div>
                                  )}
                                </div>
                                <div className="right-container">
                                  <div style={{ marginBottom: 10 }}>
                                    <RemoveButton
                                      onClick={() => {
                                        let newArr = [...submissionForm];
                                        newArr = newArr.filter((data) => {
                                          return each._id !== data._id;
                                        });
                                        setForm(newArr);
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
