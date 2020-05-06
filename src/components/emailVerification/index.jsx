import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import { Title, Input, PrimaryButton } from "../common";

const EmailVerification = ({ history }) => {
  const [verified, clickVerify] = useState(false);
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={6} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title
                text={verified ? "Account Verified" : "Email Verification"}
              />
            </Col>
          </Row>

          {verified ? null : (
            <Form id="verify-email-form">
              <Row className="justify-content-center">
                <Col lg={7} md={10} sm={10}>
                  <Row className="justify-content-center form-container">
                    <Col md={3} sm={3} xs={3}>
                      <Input type="text" />
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                      <Input type="text" />
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                      <Input type="text" />
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                      <Input type="text" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          )}

          <Row
            className={
              verified
                ? "verified-description-container"
                : "description-container"
            }
          >
            {verified ? (
              <Col>
                Thank you for verifying your email, you can login to manage your
                account in order to be able to create challenges
              </Col>
            ) : (
              <Col>
                Please enter the verification code that was sent to your email
                address. test@gmail.com |
                <Link className="link" to="/">
                  Resend Email
                </Link>
              </Col>
            )}
          </Row>

          <Row className="button-container">
            {verified ? (
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
                  onClick={() => {
                    clickVerify(true);
                  }}
                />
              </Col>
            )}
          </Row>

          {verified ? null : (
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
