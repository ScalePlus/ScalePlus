import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, Input, EditorInput, RemoveButton } from "../../../common";
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
          <InfoBlock>
            <span>
              Create an FAQ section that will be displayed on the FAQ tab of
              your challenge page.
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
                  <Row>
                    <Col lg={11} md={11} sm={10} xs={10}>
                      <Input type="text" label="Question" />
                      <EditorInput label="Answer"></EditorInput>
                    </Col>
                    <Col lg={1} md={1} sm={2} xs={2}>
                      <div className="float-right">
                        <RemoveButton
                          onClick={() => {
                            if (FAQS.length > 1) {
                              changeFAQS(
                                FAQS.filter((data, i) => {
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
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default FAQ;
