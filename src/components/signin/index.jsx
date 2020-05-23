import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "./action";
import { Title, Input, PassInput, IconButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const signinMethod = (data) => dispatch(signinAction(data));
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const { error } = signinReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [signinReducer]);

  const onLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (email && password && form.checkValidity()) {
      signinMethod({
        email: email,
        password: password,
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
              <Title text={"Login"}></Title>
            </Col>
          </Row>
          <Form
            noValidate
            validated={validated}
            onSubmit={onLogin}
            className="form-container"
          >
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
                <PassInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    changePassword(e.target.value);
                  }}
                  required
                  errorMessage={Constants.Errors.password}
                />

                <div
                  className="reset-link"
                  onClick={() => {
                    history.push("/reset/password");
                  }}
                >
                  Reset Password
                </div>
              </Col>
            </Row>

            <Row className="button-container">
              <Col>
                <IconButton text={"Login"} type="submit"></IconButton>
              </Col>
            </Row>

            <Row className="bottom-container">
              <Col>
                Don't have an Account?{" "}
                <Link to="/register" className="link">
                  Register
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {signinReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default SignIn;