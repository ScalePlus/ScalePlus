import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Input,
  TextArea,
  RemoveButton,
  UpdateCountButton,
  DropDown,
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

const JudgingCriteria = () => {
  const [validated, setValidated] = useState(false);
  const [selectedRating, selectRating] = useState("");
  const [updates, changeUpdates] = useState([
    { id: "update-1", title: "", description: "", score: "" },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Enter each criteria for judging, its maximum score and its
              description here. Your judges will use these criteria to score the
              submissions.
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
              titleText="Judging criteria"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeUpdates((data) =>
                  data.concat({
                    id: `update-${data.length + 1}`,
                    title: "",
                    description: "",
                    score: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <DropDown
              isSmall={true}
              label="Rating Type"
              placeholder=""
              options={[
                { value: "1", label: "Starring System" },
                { value: "2", label: "Slider" },
                { value: "3", label: "written" },
                { value: "4", label: "Overall Rating" },
              ]}
              value={selectedRating}
              onChange={(val) => {
                selectRating(val);
              }}
              isSingle={true}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {updates && updates.length ? (
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) {
                    return;
                  }
                  changeUpdates((data) =>
                    reorder(data, result.source.index, result.destination.index)
                  );
                }}
              >
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {updates.map((each, index) => {
                        return (
                          <Draggable
                            key={each.id}
                            draggableId={each.id}
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
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                      <Input
                                        type="text"
                                        label="Section Title"
                                        value={each.title}
                                        onChange={(e) => {
                                          changeUpdates(
                                            updates.map((data, i) => {
                                              if (index === i) {
                                                data["title"] = e.target.value;
                                              }
                                              return data;
                                            })
                                          );
                                        }}
                                      />
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                      <Input
                                        type="number"
                                        label="Overall Weight"
                                        value={each.score}
                                        onChange={(e) => {
                                          changeUpdates(
                                            updates.map((data, i) => {
                                              if (index === i) {
                                                data["score"] = e.target.value;
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
                                        label="Description"
                                        rows="2"
                                        value={each.description}
                                        onChange={(e) => {
                                          changeUpdates(
                                            updates.map((data, i) => {
                                              if (index === i) {
                                                data["description"] =
                                                  e.target.value;
                                              }
                                              return data;
                                            })
                                          );
                                        }}
                                      ></TextArea>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="right-container">
                                  <div style={{ marginBottom: 10 }}>
                                    <RemoveButton
                                      onClick={() => {
                                        if (updates.length > 1) {
                                          changeUpdates(
                                            updates.filter((data, i) => {
                                              return index !== i;
                                            })
                                          );
                                        }
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
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="table-body-container">
                <span>!!!No updates added!!!</span>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default JudgingCriteria;
