import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const SubmissionForm = () => {
  const [validated, setValidated] = useState(false);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Competitors will fill out this form and judges will use the
              responses to select the winners of the challenge. Add as many
              fields as are necessary. Be clear and concise and be sure to ask
              for all the relevant information. In addition to the fields you
              add, there are three fields that will be automatically included in
              your form: The Submission Title, a Short Description of the
              submission (140 characters), and an Image that illustrates the
              submission. Be as clear as possible with your questions. This will
              be the information that you will use to select the winners.
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
              titleText="Submission Form"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="table-body-container">
              <span>!!!Add Form Builder Here!!!</span>
            </div>
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default SubmissionForm;
