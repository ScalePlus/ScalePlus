import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { TextArea, PrimaryButton } from "../../../common";
import { MainContainer } from "./style";

const Settings = () => {
  const [validated, setValidated] = useState(false);
  const [cancelreason, changeReason] = useState(
    "This will remove it from the Scaleplus.co website and delete all the associated comments, updates and submissions. Are you absolutely sure this is what you want to do?"
  );
  return (
    <MainContainer>
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
              titleText="Settings"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextArea
              rows="4"
              label="Cancel challenge"
              value={cancelreason}
              onChange={(e) => changeReason(e.target.value)}
            />
            <div className="danger-button-container">
              <PrimaryButton
                variant="danger"
                text={"Delete challenge"}
                onClick={() => {}}
              ></PrimaryButton>
            </div>
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Settings;
