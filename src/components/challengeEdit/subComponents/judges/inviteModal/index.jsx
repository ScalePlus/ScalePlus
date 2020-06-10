import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Input, TextArea, PrimaryButton } from "../../../../common";
import { ContentContainer } from "./style";

const InviteModal = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      dialogClassName="invite-modal"
      centered
    >
      <Modal.Body>
        <Row>
          <Col>
            <ContentContainer>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Input
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Input
                    type="text"
                    label="Linkedin"
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                    }}
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextArea
                    rows="4"
                    label="Additional Message (Optional)"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="bottom-button-container">
                    <PrimaryButton
                      variant="secondary"
                      text={"Cancel"}
                      onClick={() => {
                        setEmail("");
                        setLinkedin("");
                        setDescription("");
                        setShow(false);
                      }}
                    ></PrimaryButton>
                    <PrimaryButton
                      variant="success"
                      text={"Send"}
                      onClick={() => {
                        setEmail("");
                        setLinkedin("");
                        setDescription("");
                        setShow(false);
                      }}
                    ></PrimaryButton>
                  </div>
                </Col>
              </Row>
            </ContentContainer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(InviteModal);
