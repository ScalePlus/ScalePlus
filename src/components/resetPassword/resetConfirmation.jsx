import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPasswordAction } from "./action";
import { Title, IconButton, Loading } from "../common";
import { MainContainer } from "./style";

const ResetConfirmation = ({ history }) => {
  const dispatch = useDispatch();
  const forgotPasswordMethod = (data) => dispatch(forgotPasswordAction(data));
  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  useEffect(() => {
    const { error, restPasswordSuccess } = resetPasswordReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
    if (restPasswordSuccess && restPasswordSuccess.message) {
      toast.success(restPasswordSuccess.message, {
        position: "bottom-right",
      });
    }
  }, [resetPasswordReducer]);

  return (
    <MainContainer>
      {resetPasswordReducer.restPasswordSuccess &&
      resetPasswordReducer.restPasswordSuccess.result &&
      resetPasswordReducer.restPasswordSuccess.result ? (
        <Row className="justify-content-center">
          <Col lg={5} md={10} sm={12}>
            <Row className="title-container">
              <Col>
                <Title text={"Reset Password"}></Title>
              </Col>
            </Row>
            <Row className="description-container">
              <Col>
                We sent a reset password email to{" "}
                {resetPasswordReducer.restPasswordSuccess.result.email}. Please
                click the link to set your new password. Didn't receive the
                email yet? Please check your spam folder, or{" "}
                <span
                  className="resend-link"
                  onClick={() => {
                    forgotPasswordMethod({
                      email:
                        resetPasswordReducer.restPasswordSuccess.result.email,
                    });
                  }}
                >
                  try again.
                </span>
              </Col>
            </Row>
            <Row className="login-button-container">
              <Col>
                <IconButton
                  text={"Login"}
                  type="button"
                  onClick={() => {
                    history.push("/login");
                  }}
                ></IconButton>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Redirect to="/reset/password" />
      )}
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ResetConfirmation;
