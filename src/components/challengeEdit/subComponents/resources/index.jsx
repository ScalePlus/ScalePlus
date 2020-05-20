import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { CheckBox, Input, EditorInput, FileInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Resources = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [resources, changeResources] = useState([
    { title: "", description: EditorState.createEmpty() },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock infoText="Create an Resources section that will be displayed on the Resources tab of your challenge page." />
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
              titleText="Resources"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeResources(
                  resources.concat({
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
              checkBoxText="Enable Resources tab"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {resources.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <div>
                    <Input type="text" label="Title" />
                    <Row className="align-items-center fileContainer">
                      <Col lg={4} md={4} sm={4} xs={4}>
                        <FileInput
                          placeholder="choose file"
                          label="Attachment"
                          buttonText="Upload File"
                        ></FileInput>
                      </Col>
                      <Col
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}
                        style={{ marginTop: "25px" }}
                      >
                        <span className="info-text">
                          Allowed file types are: ......
                        </span>
                      </Col>
                    </Row>
                    <EditorInput label="Description"></EditorInput>
                    <Input type="text" label="Link" />
                  </div>
                  <div
                    className="remove-container"
                    onClick={() => {
                      if (resources.length > 1) {
                        changeResources(
                          resources.filter((data, i) => {
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

export default Resources;
