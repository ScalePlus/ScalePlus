import React, { useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import {
  Input,
  TextArea,
  Switch,
  PrimaryButton,
  Tab,
} from "../../../../common";
import { ContentContainer } from "./style";

const UserInviteModal = ({ t, show, setShow }) => {
  const tabs = [
    { label: t("Admins"), value: "Admins" },
    { label: t("Startups"), value: "Startups" },
    { label: t("Individuals"), value: "Individuals" },
    { label: t("Judges"), value: "Judges" },
  ];
  const [selectedTab, selectTab] = useState(tabs[0]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      dialogClassName="invite-modal"
      centered
    >
      <Modal.Body>
        <Form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShow(false);
          }}
        >
          <Row>
            <Col>
              <ContentContainer>
                <Row>
                  {tabs.map((each, index) => {
                    return (
                      <Col
                        key={index}
                        lg={3}
                        md={6}
                        sm={6}
                        xs={12}
                        onClick={() => {
                          selectTab(each);
                        }}
                      >
                        <Tab
                          text={each.label}
                          isActive={each.value === selectedTab.value}
                        />
                      </Col>
                    );
                  })}
                </Row>
                {selectedTab.value === tabs[0].value && (
                  <Row>
                    <Col>
                      <div className="switch-container">
                        <div className={"left-text"}>
                          <span>{t("Admin")}</span>
                        </div>
                        <div>
                          <Switch variant="primary" label=""></Switch>
                        </div>
                        <div className={"right-text"}>
                          <span>{t("View Only")}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <div className="border-container"></div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Input type="email" label={t("Email Address")}></Input>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Input type="text" label={t("Linkedin")}></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextArea
                      rows="4"
                      label={t("Additional Message (Optional)")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="bottom-button-container">
                      <PrimaryButton
                        variant="secondary"
                        text={t("Cancel")}
                        onClick={() => {
                          setShow(false);
                        }}
                      ></PrimaryButton>
                      <PrimaryButton
                        variant="success"
                        text={t("Send")}
                        type="submit"
                      ></PrimaryButton>
                    </div>
                  </Col>
                </Row>
              </ContentContainer>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(UserInviteModal);
