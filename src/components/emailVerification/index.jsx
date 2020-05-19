import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAction, resendVerificationAction } from "./action";
import { getUser } from "../signin/action";
import { MainContainer } from "./style";
import { Title, Input, IconButton, Loading } from "../common";
import { Constants } from "../../lib/constant";

const EmailVerification = ({ history, match }) => {
  const dispatch = useDispatch();
  const verifyEmailMethod = (data) => dispatch(verifyEmailAction(data));
  const resendVerificationMethod = () =>
    dispatch(resendVerificationAction({ id: match.params.id }));
  const getUserMethod = useCallback((id) => dispatch(getUser(id)), [dispatch]);

  const emailVerificationReducer = useSelector((state) => {
    return state.emailVerificationReducer;
  });

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [forth, setForth] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getUserMethod(match.params.id);
  }, [getUserMethod, match]);

  useEffect(() => {
    const { error, resendSuccess } = emailVerificationReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
    setSuccess(null);
    if (resendSuccess) {
      setErrors([]);
      setSuccess(resendSuccess);
    }
  }, [emailVerificationReducer]);

  const onVerify = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (
      first &&
      second &&
      third &&
      forth &&
      match.params.id &&
      form.checkValidity()
    ) {
      verifyEmailMethod({
        id: match.params.id,
        verificationCode: first + second + third + forth,
      });
    }
    setValidated(true);
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={6} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title
                text={
                  emailVerificationReducer.success ||
                  (signinReducer &&
                    signinReducer.userData &&
                    signinReducer.userData.emailVerification)
                    ? localStorage.getItem("userRole") +
                      " " +
                      `Account Verified`
                    : "Email Verification"
                }
              />
            </Col>
          </Row>

          <Form
            noValidate
            validated={validated}
            id="verify-email-form"
            onSubmit={onVerify}
          >
            {emailVerificationReducer.success ||
            (signinReducer &&
              signinReducer.userData &&
              signinReducer.userData.emailVerification) ? null : (
              <Row className="justify-content-center">
                <Col lg={7} md={10} sm={10}>
                  <div className="form-container">
                    {errors && errors.length ? (
                      <Alert variant={"danger"} className="text-left">
                        {errors.map((each, index) => {
                          return <div key={index}>{each}</div>;
                        })}
                      </Alert>
                    ) : null}
                    {success ? (
                      <Alert variant={"success"} className="text-left">
                        <div>{success}</div>
                      </Alert>
                    ) : null}
                    <Row className="justify-content-center ">
                      <Col md={3} sm={3} xs={3}>
                        <Input
                          type="text"
                          max={1}
                          value={first}
                          onChange={(e) => {
                            setFirst(e.target.value);
                          }}
                          required
                        />
                      </Col>
                      <Col md={3} sm={3} xs={3}>
                        <Input
                          type="text"
                          max={1}
                          value={second}
                          onChange={(e) => {
                            setSecond(e.target.value);
                          }}
                          required
                        />
                      </Col>
                      <Col md={3} sm={3} xs={3}>
                        <Input
                          type="text"
                          max={1}
                          value={third}
                          onChange={(e) => {
                            setThird(e.target.value);
                          }}
                          required
                        />
                      </Col>
                      <Col md={3} sm={3} xs={3}>
                        <Input
                          type="text"
                          max={1}
                          value={forth}
                          onChange={(e) => {
                            setForth(e.target.value);
                          }}
                          required
                        />
                      </Col>
                    </Row>
                    <Row
                      className="justify-content-center"
                      style={{ marginTop: "-0.8rem" }}
                    >
                      <Col>
                        <Form.Control
                          style={{ display: "none" }}
                          isInvalid={!first || !second || !third || !forth}
                        />
                        <Form.Control.Feedback type="invalid">
                          {Constants.Errors.verificationCode}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            )}

            <Row
              className={
                emailVerificationReducer.success ||
                (signinReducer &&
                  signinReducer.userData &&
                  signinReducer.userData.emailVerification)
                  ? "verified-description-container"
                  : "description-container"
              }
            >
              {emailVerificationReducer.success ||
              (signinReducer &&
                signinReducer.userData &&
                signinReducer.userData.emailVerification) ? (
                <Col>
                  Thank you for verifying your email, you can login to manage
                  your account in order to be able to create challenges
                </Col>
              ) : (
                <Col>
                  Please enter the verification code that was sent to your email
                  address.{" "}
                  {signinReducer &&
                    signinReducer.userData &&
                    signinReducer.userData.email}
                  <span className="seprator">|</span>
                  <span
                    className="resend-link"
                    onClick={resendVerificationMethod}
                  >
                    Resend Email
                  </span>
                </Col>
              )}
            </Row>

            <Row className="button-container">
              {emailVerificationReducer.success ||
              (signinReducer &&
                signinReducer.userData &&
                signinReducer.userData.emailVerification) ? (
                <Col>
                  <IconButton
                    text={"Login"}
                    onClick={() => {
                      history.push("/login");
                    }}
                    type="button"
                  />
                </Col>
              ) : (
                <Col>
                  <IconButton text={"Verify"} type="submit" />
                </Col>
              )}
            </Row>
          </Form>
          {emailVerificationReducer.success ||
          (signinReducer &&
            signinReducer.userData &&
            signinReducer.userData.emailVerification) ? null : (
            <Row className="bottom-container">
              <Col>
                Have an Account?{" "}
                <Link className="link" to="/login">
                  Login
                </Link>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      {emailVerificationReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default EmailVerification;
