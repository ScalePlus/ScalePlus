import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction, clearAll } from "./action";
import { Title, Input, PrimaryButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const forgotPasswordMethod = (data) => dispatch(forgotPasswordAction(data));
  const clearAllMethod = useCallback((data) => dispatch(clearAll(data)), [
    dispatch,
  ]);

  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  const [email, changeEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    clearAllMethod();
  }, [clearAllMethod]);

  useEffect(() => {
    const { error } = resetPasswordReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [resetPasswordReducer]);

  const onResetPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (email && form.checkValidity()) {
      forgotPasswordMethod({
        email,
      });
    }
    setValidated(true);
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Reset Password"} icon={false}></Title>
            </Col>
          </Row>
          <div className="content-container">
            <Form noValidate validated={validated} onSubmit={onResetPassword}>
              <div className="form-container">
                {errors && errors.length ? (
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                ) : null}
                <Row>
                  <Col>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        changeEmail(e.target.value);
                      }}
                      required
                      errorMessage={
                        email
                          ? Constants.Errors.invalid_email
                          : Constants.Errors.email
                      }
                    />
                  </Col>
                </Row>
              </div>

              <Row className="button-container">
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={"Reset Password"}
                    type="submit"
                  ></PrimaryButton>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ResetPassword;
