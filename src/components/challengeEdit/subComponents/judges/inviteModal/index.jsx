import React, { useState, useEffect, useCallback } from "react";
import { Modal, Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { attachJudgesAction } from "../action";
import { getChallengeAction } from "../../../../challengeMaster/action";
import { Input, TextArea, PrimaryButton, Loading } from "../../../../common";
import { Constants } from "../../../../../lib/constant";
import { ContentContainer } from "./style";

const InviteModal = ({ t, show, setShow, challengeId }) => {
  const dispatch = useDispatch();
  const getChallengeMethod = useCallback(
    (id) => dispatch(getChallengeAction(id)),
    [dispatch]
  );
  const attachJudgesMethod = (data) =>
    dispatch(attachJudgesAction(data, challengeId));

  const challengeJudgesReducer = useSelector((state) => {
    return state.challengeJudgesReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");

  useEffect(() => {
    const { error, success } = challengeJudgesReducer;

    if (success && validated) {
      setEmail("");
      setLinkedin("");
      setAdditionalMessage("");
      setShow(false);
      setValidated(false);
      getChallengeMethod(challengeId);
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
    getChallengeMethod,
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
      <Modal.Body>
        {challengeJudgesReducer.loading && <Loading />}
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (form.checkValidity()) {
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
                        !linkedin ||
                        (linkedin && !linkedin.match(Constants.isURL))
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
                          setEmail("");
                          setLinkedin("");
                          setAdditionalMessage("");
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
export default React.memo(InviteModal);
