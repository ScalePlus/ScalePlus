import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const LegalAgreement = () => {
  const [validated, setValidated] = useState(false);
  const [description, changeDescription] = useState("");
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Review and customize your legal agreement here. Every user who
              registers to compete in your challenge will need to accept this
              agreement. The Legal Agreement cannot be revised once the
              challenge goes into the Enter stage. <br /> Not sure which legal
              agreement to use?
              <span className="bold-text">
                You can view our breakdown of each one here.
              </span>
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
              titleText="Legal agreement"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              editorState={description}
              onChange={(value) => {
                changeDescription(value);
              }}
              description="The judges NDA agreement that applies to this challenge."
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default LegalAgreement;
