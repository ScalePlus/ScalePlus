import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Switch, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Guidelines = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [description, changeDescription] = useState("");
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Use this section to describe what your challenge is about, why it
              is important, and what breakthrough you want to achieve. You may
              include images and videos
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
        <Row style={{ marginBottom: 25 }}>
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
            <Switch
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
              variant="primary"
              label="Enable Guidelines tab"
            ></Switch>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              value={description}
              onChange={(value) => {
                changeDescription(value);
              }}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Guidelines;
