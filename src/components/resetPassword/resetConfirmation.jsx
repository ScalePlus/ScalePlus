import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "./action";
import { Title, PrimaryButton, Loading } from "../common";
import { MainContainer } from "./style";

const ResetConfirmation = ({ history }) => {
  const dispatch = useDispatch();
  const forgotPasswordMethod = (data) => dispatch(forgotPasswordAction(data));
  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const { error, restPasswordSuccess } = resetPasswordReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);

    if (restPasswordSuccess && restPasswordSuccess.message) {
      // setSuccess(restPasswordSuccess.message);
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
                <Title text={"Reset Password"} icon={false}></Title>
              </Col>
            </Row>

            <div className="content-container">
              <div className="description-container">
                {errors && errors.length ? (
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                ) : null}

                <Row>
                  <Col>
                    <div className="bold-text">
                      We sent a reset password email to{" "}
                      {resetPasswordReducer.restPasswordSuccess.result.email}.
                    </div>
                    <div>
                      <span>
                        Please click the link to set your new password. Didn't
                        receive the email yet? Please check your spam folder, or{" "}
                      </span>
                      <span
                        className="resend-link"
                        onClick={() => {
                          forgotPasswordMethod({
                            email:
                              resetPasswordReducer.restPasswordSuccess.result
                                .email,
                          });
                        }}
                      >
                        try again.
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>

              <Row className="login-button-container">
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={"Login"}
                    onClick={() => {
                      history.push("/login");
                    }}
                  ></PrimaryButton>
                </Col>
              </Row>
            </div>
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
