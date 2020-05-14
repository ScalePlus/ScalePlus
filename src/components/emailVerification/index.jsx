import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
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

  useEffect(() => {
    getUserMethod(match.params.id);
  }, [getUserMethod, match]);

  useEffect(() => {
    const { error, resendSuccess } = emailVerificationReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    } else if (resendSuccess) {
      toast.success(resendSuccess, { position: "bottom-right" });
    }
  }, [emailVerificationReducer]);

  const onVerify = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!first || !second || !third || !forth) {
      toast.error(Constants.Errors.verificationCode, {
        position: "bottom-right",
      });
    }
    if (first && second && third && forth && match.params.id) {
      verifyEmailMethod({
        id: match.params.id,
        verificationCode: first + second + third + forth,
      });
    }
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

          <Form id="verify-email-form" onSubmit={onVerify}>
            {emailVerificationReducer.success ||
            (signinReducer &&
              signinReducer.userData &&
              signinReducer.userData.emailVerification) ? null : (
              <Row className="justify-content-center">
                <Col lg={7} md={10} sm={10}>
                  <Row className="justify-content-center form-container">
                    <Col md={3} sm={3} xs={3}>
                      <Input
                        type="text"
                        max={1}
                        value={first}
                        onChange={(e) => {
                          setFirst(e.target.value);
                        }}
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
                      />
                    </Col>
                  </Row>
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
