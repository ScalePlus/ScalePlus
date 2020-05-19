import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "./action";
import { Title, PassInput, IconButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const ChangePassword = ({ match }) => {
  const dispatch = useDispatch();
  const changePasswordMethod = (data) => dispatch(changePasswordAction(data));

  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const {
      error,
      // changePasswordSuccess
    } = resetPasswordReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
    // if (changePasswordSuccess) {
    //   toast.success(changePasswordSuccess, { position: "bottom-right" });
    // }
  }, [resetPasswordReducer]);

  const onChangePassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      match.params.resetPasswordCode &&
      form.checkValidity()
    ) {
      changePasswordMethod({
        resetPasswordCode: match.params.resetPasswordCode,
        password,
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
              <Title text={"Change Password"}></Title>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={onChangePassword}>
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
                  <PassInput
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      changePassword(e.target.value);
                    }}
                    required
                    errorMessage={Constants.Errors.password}
                  />
                  <PassInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      changeConfirmPassword(e.target.value);
                    }}
                    isInvalid={
                      !confirmPassword ||
                      (password &&
                        confirmPassword &&
                        password !== confirmPassword)
                    }
                    errorMessage={
                      confirmPassword
                        ? Constants.Errors.passwordMismatch
                        : Constants.Errors.confirmPassword
                    }
                  />
                </Col>
              </Row>
            </div>
            <Row className="button-container">
              <Col>
                <IconButton text={"Change Password"} type="submit"></IconButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ChangePassword;
