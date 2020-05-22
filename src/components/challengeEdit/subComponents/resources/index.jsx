import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import {
  CheckBox,
  Input,
  EditorInput,
  FileInput,
  RemoveButton,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Resources = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [resources, changeResources] = useState([
    { title: "", file: "", description: "", link: "" },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Create an Resources section that will be displayed on the
              Resources tab of your challenge page.
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
                    file: "",
                    description: "",
                    link: "",
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
                  <Row>
                    <Col lg={11} md={11} sm={10} xs={10}>
                      <Input
                        type="text"
                        label="Title"
                        value={each.title}
                        onChange={(e) => {
                          changeResources(
                            resources.map((data, i) => {
                              if (index === i) {
                                data["title"] = e.target.value;
                              }
                              return data;
                            })
                          );
                        }}
                      />
                      <Row className="align-items-center fileContainer">
                        <Col lg={4} md={6} sm={12} xs={12}>
                          <FileInput
                            placeholder="choose file"
                            label="Attachment"
                            buttonText="Upload File"
                            value={each.file}
                            onChange={(e) => {
                              changeResources(
                                resources.map((data, i) => {
                                  if (index === i) {
                                    data["file"] = e.target.files[0];
                                  }
                                  return data;
                                })
                              );
                            }}
                          ></FileInput>
                        </Col>
                        <Col
                          lg={4}
                          md={6}
                          sm={12}
                          xs={12}
                          style={{ marginTop: "25px" }}
                        >
                          <span className="info-text">
                            Allowed file types are: ......
                          </span>
                        </Col>
                      </Row>
                      <EditorInput
                        label="Description"
                        value={each.description}
                        onChange={(value) => {
                          changeResources(
                            resources.map((data, i) => {
                              if (index === i) {
                                data["description"] = value;
                              }
                              return data;
                            })
                          );
                        }}
                      ></EditorInput>
                      <Input
                        type="text"
                        label="Link"
                        value={each.link}
                        onChange={(e) => {
                          changeResources(
                            resources.map((data, i) => {
                              if (index === i) {
                                data["link"] = e.target.value;
                              }
                              return data;
                            })
                          );
                        }}
                      />
                    </Col>
                    <Col lg={1} md={1} sm={2} xs={2}>
                      <div className="float-right">
                        <RemoveButton
                          onClick={() => {
                            if (resources.length > 1) {
                              changeResources(
                                resources.filter((data, i) => {
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

export default Resources;
