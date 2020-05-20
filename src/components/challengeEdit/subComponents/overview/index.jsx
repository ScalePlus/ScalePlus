import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Overview = () => {
  const [validated, setValidated] = useState(false);
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
              titleText="Overview"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              description="The overview provides the full description of the challenge."
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

export default Overview;
