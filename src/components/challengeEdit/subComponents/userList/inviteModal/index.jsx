import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Alert } from "react-bootstrap";
import { attachJudgesAction } from "../../judges/action";
import { attachTeamAction } from "../../team/action";
import { inviteParticipantsAction } from "./action";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  TextArea,
  Switch,
  PrimaryButton,
  Tab,
  Loading,
} from "../../../../common";
import { ContentContainer } from "./style";
import { Constants } from "../../../../../lib/constant";

const UserInviteModal = ({ t, show, setShow, challengeId }) => {
  const dispatch = useDispatch();
  const attachJudgesMethod = (data) =>
    dispatch(attachJudgesAction(data, challengeId));
  const attachTeamMethod = (data) =>
    dispatch(attachTeamAction(data, challengeId));
  const inviteParticipantsMethod = (data) =>
    dispatch(inviteParticipantsAction(data, challengeId));

  const challengeJudgesReducer = useSelector((state) => {
    return state.challengeJudgesReducer;
  });
  const challengeTeamReducer = useSelector((state) => {
    return state.challengeTeamReducer;
  });
  const challengeInviteParticipantsReducer = useSelector((state) => {
    return state.challengeInviteParticipantsReducer;
  });

  const tabs = [
    { label: t("Admins"), value: "Admins" },
    { label: t("Participants"), value: "Participants" },
    { label: t("Judges"), value: "Judges" },
  ];
  const [selectedTab, selectTab] = useState(tabs[0]);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const { error, success } = challengeJudgesReducer;

    if (success && validated) {
      setEmail("");
      setLinkedin("");
      setAdditionalMessage("");
      setCheck(false);
      setShow(false);
      setValidated(false);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [
    challengeJudgesReducer,
    setShow,
    setEmail,
    setLinkedin,
    setAdditionalMessage,
    validated,
    challengeId,
  ]);

  useEffect(() => {
    const { error, success } = challengeTeamReducer;

    if (success && validated) {
      setEmail("");
      setLinkedin("");
      setAdditionalMessage("");
      setCheck(false);
      setShow(false);
      setValidated(false);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [
    challengeTeamReducer,
    setShow,
    setEmail,
    setLinkedin,
    setAdditionalMessage,
    validated,
    challengeId,
  ]);

  useEffect(() => {
    const { error, success } = challengeInviteParticipantsReducer;

    if (success && validated) {
      setEmail("");
      setLinkedin("");
      setAdditionalMessage("");
      setCheck(false);
      setShow(false);
      setValidated(false);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [
    challengeInviteParticipantsReducer,
    setShow,
    setEmail,
    setLinkedin,
    setAdditionalMessage,
    validated,
    challengeId,
  ]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      dialogClassName="invite-modal"
      centered
    >
      {(challengeJudgesReducer.loading ||
        challengeTeamReducer.loading ||
        challengeInviteParticipantsReducer.loading) && <Loading />}
      <Modal.Body>
        <Form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (
              form.checkValidity() &&
              (!linkedin || (linkedin && linkedin.match(Constants.isURL))) &&
              selectedTab.value === tabs[0].value
            ) {
              attachTeamMethod({
                email,
                linkedin,
                additionalMessage,
                permission: check
                  ? Constants.TEAM_PERMISSION.VIEW
                  : Constants.TEAM_PERMISSION.ADMIN,
                mode: "update",
              });
            } else if (
              form.checkValidity() &&
              (!linkedin || (linkedin && linkedin.match(Constants.isURL))) &&
              selectedTab.value === tabs[1].value
            ) {
              inviteParticipantsMethod({
                email,
                linkedin,
                additionalMessage,
                isIndividual: !check,
              });
            } else if (
              form.checkValidity() &&
              (!linkedin || (linkedin && linkedin.match(Constants.isURL))) &&
              selectedTab.value === tabs[2].value
            ) {
              attachJudgesMethod({
                email,
                linkedin,
                additionalMessage,
              });
            }
            setValidated(true);
          }}
        >
          {errors && errors.length ? (
            <Row>
              <Col>
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              </Col>
            </Row>
          ) : null}
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
                          <Switch
                            variant="primary"
                            label=""
                            checked={check}
                            onChange={() => {
                              setCheck(!check);
                            }}
                          ></Switch>
                        </div>
                        <div className={"right-text"}>
                          <span>{t("View Only")}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
                {selectedTab.value === tabs[1].value && (
                  <Row>
                    <Col>
                      <div className="switch-container">
                        <div className={"left-text"}>
                          <span>{t("Startup")}</span>
                        </div>
                        <div>
                          <Switch
                            variant="primary"
                            label=""
                            checked={check}
                            onChange={() => {
                              setCheck(!check);
                            }}
                          ></Switch>
                        </div>
                        <div className={"right-text"}>
                          <span>{t("Individual")}</span>
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
                    <Input
                      type="email"
                      label={t("Email Address")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                      errorMessage={
                        email ? t("invalid_email_error") : t("email_error")
                      }
                    ></Input>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Input
                      type="text"
                      label={t("Linkedin")}
                      value={linkedin}
                      onChange={(e) => {
                        setLinkedin(e.target.value);
                      }}
                      isInvalid={
                        validated &&
                        (!linkedin ||
                          (linkedin && !linkedin.match(Constants.isURL)))
                      }
                      errorMessage={
                        linkedin
                          ? t("invalid_linkedin_url_error")
                          : t("linkedin_url_error")
                      }
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextArea
                      rows="4"
                      label={t("Additional Message (Optional)")}
                      value={additionalMessage}
                      onChange={(e) => {
                        setAdditionalMessage(e.target.value);
                      }}
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
