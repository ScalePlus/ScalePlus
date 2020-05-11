import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPasswordAction } from "./action";
import { Title, Input, PrimaryButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const ResetPassword = ({ history }) => {
  const dispatch = useDispatch();
  const forgotPasswordMethod = (data) => dispatch(forgotPasswordAction(data));
  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  const [email, changeEmail] = useState("");

  useEffect(() => {
    const { error, restPasswordSuccess } = resetPasswordReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
    if (restPasswordSuccess) {
      toast.success(restPasswordSuccess, { position: "bottom-right" });
    }
  }, [resetPasswordReducer]);

  const onResetPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!email) {
      toast.error(Constants.Errors.email, { position: "bottom-right" });
    } else {
      forgotPasswordMethod({
        email,
      });
    }
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Reset Password"}></Title>
            </Col>
          </Row>
          {resetPasswordReducer.restPasswordSuccess ? (
            <>
              <Row className="changed-description-container">
                <Col>
                  We sent a reset password email to {email}. Please click the
                  link to set your new password. Didn't receive the email yet?
                  Please check your spam folder, or{" "}
                  <span
                    className="resend-link"
                    onClick={() => {
                      forgotPasswordMethod({
                        email,
                      });
                    }}
                  >
                    try again.
                  </span>
                </Col>
              </Row>
              <Row className="login-button-container">
                <Col>
                  <PrimaryButton
                    text={"Login"}
                    type="button"
                    onClick={() => {
                      history.push("/login");
                    }}
                  ></PrimaryButton>
                </Col>
              </Row>
            </>
          ) : (
            <Form onSubmit={onResetPassword}>
              <Row className="form-container">
                <Col>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      changeEmail(e.target.value);
                    }}
                  />
                </Col>
              </Row>

              <Row className="button-container">
                <Col>
                  <PrimaryButton
                    text={"Reset Password"}
                    type="submit"
                  ></PrimaryButton>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ResetPassword;
