import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CheckBox, Input, EditorInput, RemoveButton } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Updates = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [updates, changeUpdates] = useState([{ title: "", description: "" }]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Create updates that will be posted to the Updates tab of your
              challenge page.
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
                    description: "",
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
                  <div className="left-container">
                    <Input
                      type="text"
                      label="Title"
                      value={each.title}
                      onChange={(e) => {
                        changeUpdates(
                          updates.map((data, i) => {
                            if (index === i) {
                              data["title"] = e.target.value;
                            }
                            return data;
                          })
                        );
                      }}
                    />
                    <EditorInput
                      label="Description"
                      value={each.description}
                      onChange={(value) => {
                        changeUpdates(
                          updates.map((data, i) => {
                            if (index === i) {
                              data["description"] = value;
                            }
                            return data;
                          })
                        );
                      }}
                    ></EditorInput>
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        if (updates.length > 1) {
                          changeUpdates(
                            updates.filter((data, i) => {
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

export default Updates;
