import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const JudgesNDA = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [description, changeDescription] = useState(EditorState.createEmpty());
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Review and customize the Non-Disclosure Agreement (NDA) for your
              judges here. All judges must agree to the NDA before they can be
              confirmed.
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
              titleText="Judges NDA"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              checkBoxText="Enable Judges NDA"
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
              description="The judges NDA agreement that applies to this challenge."
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default JudgesNDA;
