import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachJudgingCriteriaAction, getRatingTypesAction } from "./action";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Input,
  TextArea,
  RemoveButton,
  UpdateCountButton,
  DropDown,
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

const JudgingCriteria = ({ challengeId }) => {
  const dispatch = useDispatch();
  const attachJudgingCriteriaMethod = (data) =>
    dispatch(attachJudgingCriteriaAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );
  const getRatingTypesMethod = useCallback(
    () => dispatch(getRatingTypesAction()),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeJudgingCriteriaReducer = useSelector((state) => {
    return state.challengeJudgingCriteriaReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [ratingType, selectRating] = useState("");
  const [judgingCriteria, changeJudgingCriteria] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    getRatingTypesMethod();
  }, [getRatingTypesMethod]);

  useEffect(() => {
    const { error } = challengeJudgingCriteriaReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeJudgingCriteriaReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { judgingCriteriaId } = challengeData;
      if (judgingCriteriaId && judgingCriteriaId.data) {
        changeJudgingCriteria(judgingCriteriaId.data);
      }
      if (judgingCriteriaId && judgingCriteriaId.ratingType) {
        selectRating({
          value: judgingCriteriaId.ratingType._id,
          label: judgingCriteriaId.ratingType.name,
        });
      }
    }
  }, [challengeReducer]);

  useEffect(() => {
    let totalWeight = 0;
    if (judgingCriteria && judgingCriteria.length) {
      for (let i = 0; i < judgingCriteria.length; i++) {
        const element = judgingCriteria[i];
        totalWeight += parseInt(element.weight, 10);
      }
      setTotalWeight(totalWeight);
    }
  }, [judgingCriteria]);

  return (
    <MainContainer>
      {(challengeJudgingCriteriaReducer.loading ||
        challengeReducer.loading) && <Loading />}
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
      {validated &&
      challengeJudgingCriteriaReducer &&
      challengeJudgingCriteriaReducer.success &&
      challengeJudgingCriteriaReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeJudgingCriteriaReducer.success.message}</div>
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
          if (form.checkValidity() && ratingType) {
            if (totalWeight !== 100) {
              alert("Total weight should be 100.");
            } else {
              attachJudgingCriteriaMethod({
                judgingCriteria,
                ratingType: ratingType.value,
              });
            }
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
                changeJudgingCriteria((data) =>
                  data.concat({
                    _id: `judgingCriteria-${data.length + 1}`,
                    title: "",
                    description: "",
                    weight: "",
                  })
                );
                setValidated(false);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <DropDown
              isSmall={true}
              isSelectOnly={true}
              label="Rating Type *"
              placeholder=""
              options={
                challengeJudgingCriteriaReducer.ratingTypes.result &&
                challengeJudgingCriteriaReducer.ratingTypes.result.length
                  ? challengeJudgingCriteriaReducer.ratingTypes.result.map(
                      (option) => {
                        return { value: option._id, label: option.name };
                      }
                    )
                  : []
              }
              value={ratingType}
              onChange={(val) => {
                selectRating(val);
              }}
              isSingle={true}
              isInvalid={!ratingType}
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Input
              type="number"
              label="Total Weight"
              value={totalWeight}
              readOnly
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {judgingCriteria && judgingCriteria.length ? (
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) {
                    return;
                  }
                  changeJudgingCriteria((data) =>
                    reorder(data, result.source.index, result.destination.index)
                  );
                }}
              >
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {judgingCriteria.map((each, index) => {
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
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                      <Input
                                        required
                                        type="text"
                                        label="Section Title *"
                                        value={each.title}
                                        onChange={(e) => {
                                          let newArr = [...judgingCriteria];
                                          newArr[index]["title"] =
                                            e.target.value;
                                          changeJudgingCriteria(newArr);
                                        }}
                                      />
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                      <Input
                                        required
                                        type="number"
                                        label="Overall Weight *"
                                        value={each.weight}
                                        onChange={(e) => {
                                          let newArr = [...judgingCriteria];
                                          newArr[index]["weight"] =
                                            e.target.value;
                                          changeJudgingCriteria(newArr);
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
                                          let newArr = [...judgingCriteria];
                                          newArr[index]["description"] =
                                            e.target.value;
                                          changeJudgingCriteria(newArr);
                                        }}
                                      ></TextArea>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="right-container">
                                  <div style={{ marginBottom: 10 }}>
                                    <RemoveButton
                                      onClick={() => {
                                        let newArr = [...judgingCriteria];
                                        newArr = newArr.filter((data) => {
                                          return each._id !== data._id;
                                        });
                                        changeJudgingCriteria(newArr);
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
            ) : null}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default JudgingCriteria;
