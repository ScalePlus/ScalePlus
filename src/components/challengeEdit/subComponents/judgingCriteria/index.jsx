import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  Input,
  TextArea,
  RemoveButton,
  UpdateCountButton,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Constants } from "../../../../lib/constant";

const JudgingCriteria = () => {
  const [validated, setValidated] = useState(false);
  const [updates, changeUpdates] = useState([
    { title: "", description: "", score: "" },
  ]);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Enter each criteria for judging, its maximum score and its
              description here. Your judges will use these criteria to score the
              submissions.
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
              titleText="Judging criteria"
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
                    score: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {updates.map((each, index) => {
              return (
                <div className="box-container" key={index}>
                  <Row>
                    <Col lg={11} md={11} sm={10} xs={10}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Input type="text" label="Title" />
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Input
                            type="number"
                            label="Max score *"
                            value={each.score}
                            onChange={(e) => {
                              changeUpdates(
                                updates.map((data, i) => {
                                  if (index === i) {
                                    data["score"] = e.target.value;
                                  }
                                  return data;
                                })
                              );
                            }}
                            required
                            errorMessage={Constants.Errors.score}
                          />
                        </Col>
                      </Row>
                      <TextArea label="Description" rows="2"></TextArea>
                    </Col>
                    <Col lg={1} md={1} sm={2} xs={2}>
                      <div className="float-right" style={{ marginBottom: 10 }}>
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
                      <UpdateCountButton onClick={() => {}} />
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

export default JudgingCriteria;
