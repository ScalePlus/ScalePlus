import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Alert } from "react-bootstrap";
import { Input, TextArea, PrimaryButton } from "../../../../common";
import { MainContainer } from "./style";

const EvaluateModal = ({
  t,
  show,
  setShow,
  selectedRow,
  challengeData,
  onSaveDraft,
  onSubmitEvaluation,
  errors,
}) => {
  const [data, changeData] = useState(null);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    if (
      selectedRow &&
      selectedRow.judgingCriteria &&
      selectedRow.judgingCriteria.length
    ) {
      changeData(selectedRow.judgingCriteria);
    } else {
      if (challengeData) {
        const { judgingCriteriaId } = challengeData;
        if (
          judgingCriteriaId &&
          judgingCriteriaId.data &&
          judgingCriteriaId.data.length
        ) {
          let newData = judgingCriteriaId.data.map((each) => {
            each["value"] = "";
            each["descriptionValue"] = "";
            return each;
          });
          changeData(newData);
        }
      }
    }
  }, [challengeData, selectedRow]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="evaluate-modal"
    >
      <Modal.Body>
        <MainContainer>
          <Form
            noValidate
            validated={validated}
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              if (!form.checkValidity()) {
                setValidated(true);
              }
            }}
          >
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
            <Row className="justify-content-center">
              <Col lg={11} md={11} sm={11} xs={11}>
                {data && data.length
                  ? data.map((each, index) => {
                      return (
                        <div className="block" key={each._id}>
                          <Row>
                            <Col lg={7} md={7} sm={12} xs={12}>
                              <div className="left-container">
                                <div className="title">{each.title}</div>
                                <div className="description">
                                  {each.description}
                                </div>
                              </div>
                            </Col>
                            <Col lg={5} md={5} sm={12} xs={12}>
                              <div className="right-container">
                                <Input
                                  type="number"
                                  label={
                                    <span className="label-bold">
                                      {t("Overall Weight")}{" "}
                                      <span className="label-regular">
                                        {t("Out of")} {each.weight}
                                      </span>
                                    </span>
                                  }
                                  value={each.value}
                                  onChange={(e) => {
                                    let newArr = [...data];
                                    newArr[index]["value"] = e.target.value;
                                    changeData(newArr);
                                  }}
                                  minNumber={1}
                                  maxNumber={each.weight}
                                  required
                                  errorMessage={t("weight_error")}
                                />
                                <TextArea
                                  label={
                                    <span className="label-bold">
                                      {t("Description")}
                                    </span>
                                  }
                                  rows="2"
                                  value={each.descriptionValue}
                                  onChange={(e) => {
                                    let newArr = [...data];
                                    newArr[index]["descriptionValue"] =
                                      e.target.value;
                                    changeData(newArr);
                                  }}
                                ></TextArea>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })
                  : null}
                <Row>
                  <Col>
                    <div className="button-container">
                      <div className="save-button">
                        <PrimaryButton
                          variant="secondary"
                          text={t("Save Draft")}
                          type="submit"
                          onClick={() => {
                            const record = data.find(
                              (each) =>
                                !each.value || (each.value && each.value > 100)
                            );
                            if (!record) {
                              onSaveDraft(data);
                            }
                          }}
                        ></PrimaryButton>
                      </div>
                      <div className="submit-button">
                        <PrimaryButton
                          variant="primary"
                          text={t("Submit Evaluation")}
                          type="submit"
                          onClick={() => {
                            const record = data.find(
                              (each) =>
                                !each.value || (each.value && each.value > 100)
                            );
                            if (!record) {
                              onSubmitEvaluation(data);
                            }
                          }}
                        ></PrimaryButton>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </MainContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(EvaluateModal);
