import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "./action";
import {
  SocialLoginButton,
  OrDevider,
  Title,
  Input,
  PassInput,
  PrimaryButton,
  Loading,
  CheckBox,
} from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";
import theme from "../../theme";

const SignIn = ({ history, mode, setActiveModal, setUserFlowModal }) => {
  const dispatch = useDispatch();
  const signinMethod = (data) =>
    dispatch(signinAction(data, mode, setActiveModal, setUserFlowModal));
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const [email, changeEmail] = useState("test@gmail.com");
  const [password, changePassword] = useState("Sky@1234");
  const [errors, setErrors] = useState([]);
  const [check, setCheck] = useState(false);
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
        <Col
          lg={mode === "modal" ? 12 : 5}
          md={mode === "modal" ? 12 : 10}
          sm={12}
        >
          <Row className="title-container">
            <Col>
              <Title text={"Login"} icon={false}></Title>
            </Col>
          </Row>
          <div className="content-container">
            <div className="social-button-container">
              <div className="google-button">
                <SocialLoginButton
                  svgIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      fill={theme.colors.white}
                      viewBox="0 0 50 50"
                    >
                      <g>
                        <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z " />
                      </g>
                    </svg>
                  }
                  text="Sign in with Google"
                  background={"#dd4b39"}
                  border={"#b23c2e"}
                />
              </div>
              <div className="linkedin-button">
                <SocialLoginButton
                  icon="/images/linkedin.svg"
                  text="Sign in with Linkedin"
                  background={"#007bb6"}
                  border={"#006b9f"}
                />
              </div>
            </div>
            <div className="devided-container">
              <OrDevider />
            </div>
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

              <Row>
                <Col>
                  <div className="remember-container">
                    <CheckBox
                      id={`checkbox-1`}
                      checkBoxText="Remember me"
                      checked={check}
                      onChange={() => {
                        setCheck(!check);
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="button-container">
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text="Login"
                    type="submit"
                  ></PrimaryButton>
                </Col>
              </Row>
            </Form>
            <Row className="bottom-container">
              <Col>
                <PrimaryButton
                  variant="light"
                  text="New User? Register"
                  onClick={() => {
                    if (mode === "modal") {
                      setActiveModal("SignUp");
                    } else {
                      history.push("/register");
                    }
                  }}
                ></PrimaryButton>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {signinReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default SignIn;
