import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, Input, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const FAQ = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [FAQS, changeFAQS] = useState([
    { question: "", answer: EditorState.createEmpty() },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock infoText="Create an FAQ section that will be displayed on the FAQ tab of your challenge page." />
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
              titleText="FAQ"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeFAQS(
                  FAQS.concat({
                    question: "",
                    answer: EditorState.createEmpty(),
                  })
                );
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              checkBoxText="Enable FAQ tab"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {FAQS.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <div>
                    <Input type="text" label="Question" />
                    <EditorInput label="Answer"></EditorInput>
                  </div>
                  <div
                    className="remove-container"
                    onClick={() => {
                      if (FAQS.length > 1) {
                        changeFAQS(
                          FAQS.filter((data, i) => {
                            return index !== i;
                          })
                        );
                      }
                    }}
                  >
                    <img
                      src={"/images/trash.svg"}
                      height="20px"
                      width="20px"
                      alt=""
                    ></img>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default FAQ;
