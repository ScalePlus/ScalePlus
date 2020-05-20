import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Guidelines = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [description, changeDescription] = useState(EditorState.createEmpty());
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock infoText="Use this section to describe what your challenge is about, why it is important, and what breakthrough you want to achieve. You may include images and videos" />
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
              titleText="Guidelines"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              checkBoxText="Enable Guidelines tab"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              editorState={description}
              onEditorStateChange={(editorState) => {
                changeDescription(editorState);
              }}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Guidelines;
