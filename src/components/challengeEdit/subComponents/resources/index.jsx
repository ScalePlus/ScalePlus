import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import {
  Switch,
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
        <Row style={{ marginBottom: 25 }}>
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
            <Switch
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
              variant="primary"
              label="Enable Resources tab"
            ></Switch>
          </Col>
        </Row>
        <Row>
          <Col>
            {resources.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <div className="left-container">
                    <Row>
                      <Col>
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
                      </Col>
                    </Row>

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
                    <Row>
                      <Col>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col>
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
                    </Row>
                  </div>

                  <div className="right-container">
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
