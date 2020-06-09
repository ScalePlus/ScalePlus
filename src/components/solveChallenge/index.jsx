import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  PrimaryButton,
  RemoveButton,
  Tab,
  CheckBox,
} from "../common";
import TeamAgreement from "./teamAgreement";

const tabs = [
  {
    text: "Create My Team",
  },
  {
    text: "No, Solve Alone",
  },
];

const SolveChallenge = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].text);
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState([{}]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Solve Challenge"} icon={true}></Title>
            </Col>
          </Row>
          <div className="content-container">
            <Row className="description-container">
              <Col>
                <Description>
                  Would you like to compete as a team? *
                </Description>
              </Col>
            </Row>

            <Row className="justify-content-center tab-container">
              {tabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      setActiveTab(each.text);
                    }}
                  >
                    <Tab text={each.text} isActive={activeTab === each.text} />
                  </Col>
                );
              })}
            </Row>

            {activeTab === tabs[0].text && (
              <Row>
                <Col>
                  <div className="sub-description-container">
                    Type in their email addresses to invite people to your team:
                  </div>
                </Col>
              </Row>
            )}

            {activeTab === tabs[0].text ? (
              <Form
                noValidate
                validated={validated}
                onSubmit={() => {
                  setValidated(true);
                }}
              >
                <Row className="form-container">
                  <Col>
                    {members.map((each, index) => {
                      return (
                        <div key={index} className="email-container">
                          <Input
                            type="email"
                            placeholder="youremail@website.com"
                          ></Input>
                          {members.length > 1 && (
                            <div className="remove-button-container">
                              <RemoveButton
                                onClick={() => {
                                  setMembers((data) => {
                                    return data.filter((each, i) => {
                                      return index !== i;
                                    });
                                  });
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className="add-member"
                      onClick={() => {
                        setMembers((data) => data.concat({}));
                      }}
                    >
                      + Add Another Member
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="checkbox-container">
                      <CheckBox
                        id={`checkbox-1`}
                        checkBoxText={
                          <span className="bold-text">Team Agreement</span>
                        }
                        checked={check}
                        onChange={() => {
                          if (!check) {
                            setShow(true);
                          } else {
                            setCheck(!check);
                          }
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="right-container">
                      Leave fields blank if you don't want to invite anyone
                      right now.
                    </div>
                  </Col>
                </Row>
                <Row className="button-container">
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      text={"Enter Challenge"}
                      type="submit"
                    ></PrimaryButton>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Form
                noValidate
                validated={validated}
                onSubmit={() => {
                  setValidated(true);
                }}
              >
                <Row className="button-container">
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      text={"Enter Challenge"}
                      type="submit"
                    ></PrimaryButton>
                  </Col>
                </Row>
              </Form>
            )}
          </div>
        </Col>
      </Row>
      <TeamAgreement show={show} setShow={setShow} setCheck={setCheck} />
    </MainContainer>
  );
};

export default SolveChallenge;
