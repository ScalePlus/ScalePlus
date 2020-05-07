import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailAction, resendVerificationAction } from "./action";
import { MainContainer } from "./style";
import { Title, Input, PrimaryButton } from "../common";

const EmailVerification = ({ history, match }) => {
  const dispatch = useDispatch();
  const verifyEmailMethod = (data) => dispatch(verifyEmailAction(data));
  const resendVerificationMethod = () =>
    dispatch(resendVerificationAction({ id: match.params.id }));
  const emailVerificationReducer = useSelector((state) => {
    return state.emailVerificationReducer;
  });
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [forth, setForth] = useState("");

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

  const onVerify = () => {
    if (
      first &&
      second &&
      third &&
      forth &&
      match.params.id &&
      !emailVerificationReducer.loading
    ) {
      verifyEmailMethod({
        id: match.params.id,
        verificationCode: first + second + third + forth,
      });
    } else {
      toast.error("Something went wrong", { position: "bottom-right" });
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
                  emailVerificationReducer.data
                    ? localStorage.getItem("userRole") +
                      " " +
                      `Account Verified`
                    : "Email Verification"
                }
              />
            </Col>
          </Row>

          {emailVerificationReducer.data ? null : (
            <Form
              id="verify-email-form"
              onSubmit={(e) => {
                e.preventDefault();
                onVerify();
              }}
            >
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
              <input type="submit" style={{ display: "none" }}></input>
            </Form>
          )}

          <Row
            className={
              emailVerificationReducer.data
                ? "verified-description-container"
                : "description-container"
            }
          >
            {emailVerificationReducer.data ? (
              <Col>
                Thank you for verifying your email, you can login to manage your
                account in order to be able to create challenges
              </Col>
            ) : (
              <Col>
                Please enter the verification code that was sent to your email
                address. test@gmail.com
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
            {emailVerificationReducer.data ? (
              <Col>
                <PrimaryButton
                  text={"Login"}
                  onClick={() => {
                    history.push("/login");
                  }}
                />
              </Col>
            ) : (
              <Col>
                <PrimaryButton
                  text={"Verify"}
                  disabled={emailVerificationReducer.loading}
                  onClick={() => {
                    onVerify();
                  }}
                />
              </Col>
            )}
          </Row>

          {emailVerificationReducer.data ? null : (
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
    </MainContainer>
  );
};

export default EmailVerification;
