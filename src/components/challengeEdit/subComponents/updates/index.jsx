import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, Input, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Updates = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [updates, changeUpdates] = useState([
    { title: "", description: EditorState.createEmpty() },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock infoText="Create updates that will be posted to the Updates tab of your challenge page. " />
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
              titleText="Updates"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeUpdates(
                  updates.concat({
                    title: "",
                    description: EditorState.createEmpty(),
                  })
                );
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              checkBoxText="Enable Updates tab"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {updates.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <div>
                    <Input type="text" label="Title" />
                    <EditorInput label="Description"></EditorInput>
                  </div>
                  <div
                    className="remove-container"
                    onClick={() => {
                      if (updates.length > 1) {
                        changeUpdates(
                          updates.filter((data, i) => {
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

export default Updates;
