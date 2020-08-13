import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import {
  PrimaryButton,
  CheckBox,
  Input,
  EditorInput,
  FileInput,
  RadioButton,
} from "../../../../common";
import { MainContainer } from "../../../../challengePreview/subComponents/submissions/style";

function FormPreviewModal({ t, show, setShow, submissionForm }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="form-preview"
    >
      <Modal.Body>
        <MainContainer>
          <Row className="justify-content-center text-left">
            <Col lg={12} md={12} sm={12} xs={12}>
              {submissionForm && submissionForm.length
                ? submissionForm.map((each, index) => {
                    return each.field === "Single-Field" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <Input type="text" label={each.title} />
                      </div>
                    ) : each.field === "Rich-Text-Editor" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <EditorInput label={each.title} />
                      </div>
                    ) : each.field === "Multiple-Choice" ? (
                      <div
                        className={
                          each.isRequired &&
                          !each.choices.find((choice) => choice.checked)
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="checkbox-container">
                          {each.choices && each.choices.length
                            ? each.choices.map((choice, choiceIndex) => {
                                return (
                                  <CheckBox
                                    key={choice._id}
                                    id={choice._id}
                                    checkBoxText={choice.title}
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : each.field === "Single-Choice" ? (
                      <div
                        className={
                          each.isRequired &&
                          !each.choices.find((choice) => choice.checked)
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="checkbox-container">
                          {each.choices && each.choices.length
                            ? each.choices.map((choice, choiceIndex) => {
                                return (
                                  <RadioButton
                                    key={choice._id}
                                    id={choice._id}
                                    checkBoxText={choice.title}
                                    name="radioButton"
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : each.field === "Yes-No-Question" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <label className="text-label form-label">
                          {each.title}
                        </label>
                        <div className="question-button-container">
                          <PrimaryButton text={t("Yes")} variant={"light"} />
                          <PrimaryButton text={t("No")} variant={"light"} />
                        </div>
                      </div>
                    ) : each.field === "Document-Upload-Box" ? (
                      <div
                        className={
                          each.isRequired && !each.value
                            ? "box-container not-valid"
                            : "box-container"
                        }
                        key={each._id}
                      >
                        <FileInput
                          label={each.title}
                          prependButtonText={t("Browse")}
                          acceptTypes={
                            each.allowed_types &&
                            each.allowed_types.length &&
                            each.allowed_types.indexOf("*") < 0
                              ? each.allowed_types.join(",")
                              : "*"
                          }
                          description={`${t("Allowed file types are")}: ${
                            each.allowed_types && each.allowed_types.length
                              ? each.allowed_types.join(" , ")
                              : ""
                          }`}
                        ></FileInput>
                      </div>
                    ) : null;
                  })
                : null}
            </Col>
          </Row>
        </MainContainer>
      </Modal.Body>
    </Modal>
  );
}

export default FormPreviewModal;
