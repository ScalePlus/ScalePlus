import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAction, resendVerificationAction } from "./action";
import { getUser } from "../signin/action";
import { MainContainer } from "./style";
import { Title, Input, PrimaryButton, Loading } from "../common";
import { Constants } from "../../lib/constant";

const EmailVerification = ({ history, mode, setActiveModal, match }) => {
  const userId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : match.params.id;
  const dispatch = useDispatch();
  const verifyEmailMethod = (data) => dispatch(verifyEmailAction(data));
  const resendVerificationMethod = () =>
    dispatch(resendVerificationAction({ id: userId }));
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
  const isVerified =
    emailVerificationReducer.success ||
    (signinReducer &&
      signinReducer.userData &&
      signinReducer.userData.emailVerification);

  useEffect(() => {
    getUserMethod(userId);
  }, [getUserMethod, userId]);

  useEffect(() => {
    const { userData } = signinReducer;

    if (
      userData &&
      userData.verificationCode &&
      userData.verificationCode.length === 4
    ) {
      setFirst(userData.verificationCode.slice(0, 1));
      setSecond(userData.verificationCode.slice(1, 2));
      setThird(userData.verificationCode.slice(2, 3));
      setForth(userData.verificationCode.slice(3, 4));
    }
  }, [signinReducer]);

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

    if (first && second && third && forth && userId && form.checkValidity()) {
      verifyEmailMethod({
        id: userId,
        verificationCode: first + second + third + forth,
      });
    }
    setValidated(true);
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col
          lg={mode === "modal" ? 12 : 5}
          md={mode === "modal" ? 12 : 10}
          sm={12}
        >
          <Row className="title-container">
            <Col>
              <Title
                text={
                  isVerified
                    ? // localStorage.getItem("userRole") +
                      //   " " +
                      `Account Verified`
                    : "Verification"
                }
                icon={false}
              />
            </Col>
          </Row>
          <div className="content-container">
            <Form
              noValidate
              validated={validated}
              id="verify-email-form"
              onSubmit={onVerify}
            >
              {isVerified ? null : (
                <Row className="justify-content-center">
                  <Col lg={8} md={10} sm={10}>
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
                          {!first || !second || !third || !forth ? (
                            <Form.Text className="invalid-text text-center">
                              {Constants.Errors.verificationCode}
                            </Form.Text>
                          ) : null}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              )}

              <Row
                className={
                  isVerified
                    ? "verified-description-container"
                    : "description-container"
                }
              >
                {isVerified ? (
                  <Col>
                    <div className="thanks-text">
                      <span>Thank you for verifying your email,</span>
                    </div>
                    <div>
                      <span>
                        you can login to manage your account in order to be able
                        to create challenges
                      </span>
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <div>
                      <span>
                        Please enter the verification code that was sent to your
                        email address.
                      </span>
                    </div>
                    <div>
                      <span>
                        {signinReducer &&
                          signinReducer.userData &&
                          signinReducer.userData.email}
                      </span>
                      <span className="seprator">|</span>
                      <span
                        className="resend-link"
                        onClick={resendVerificationMethod}
                      >
                        Resend Email
                      </span>
                    </div>
                  </Col>
                )}
              </Row>

              <Row
                className="button-container"
                style={{ marginBottom: isVerified ? "0px" : "20px" }}
              >
                {isVerified ? (
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      text="Login"
                      onClick={() => {
                        if (mode === "modal") {
                          setActiveModal("SignIn");
                        } else {
                          history.push("/login");
                        }
                      }}
                    ></PrimaryButton>
                  </Col>
                ) : (
                  <Col>
                    <PrimaryButton
                      variant="primary"
                      text="Verify"
                      type="submit"
                    ></PrimaryButton>
                  </Col>
                )}
              </Row>
            </Form>
            {isVerified ? null : (
              <Row className="bottom-container">
                <Col>
                  <PrimaryButton
                    variant="light"
                    text="Have an account? Login"
                    onClick={() => {
                      if (mode === "modal") {
                        setActiveModal("SignIn");
                      } else {
                        history.push("/login");
                      }
                    }}
                  ></PrimaryButton>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
      {emailVerificationReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default EmailVerification;
