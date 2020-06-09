import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "./action";
import { MainContainer } from "./style";
import {
  SocialLoginButton,
  OrDevider,
  Title,
  Description,
  Input,
  PassInput,
  PrimaryButton,
  Tab,
  Loading,
  CheckBox,
} from "../common";
import { Constants } from "../../lib/constant";
import theme from "../../theme";
const tabs = [
  {
    text: Constants.ROLES.STARTUP_INDIVIDUAL,
    subText: "Create Solutions",
  },
  {
    text: Constants.ROLES.ORGANIZATION,
    subText: "Face Challenges",
  },
  {
    text: Constants.ROLES.MENTOR_JUDGE,
    subText: "Bring Experience",
  },
];

const SignUp = ({ history, mode, setActiveModal }) => {
  const dispatch = useDispatch();
  const signupMethod = (data) =>
    dispatch(signupAction(data, mode, setActiveModal));
  const signupReducer = useSelector((state) => {
    return state.signupReducer;
  });

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("userRole")
      ? localStorage.getItem("userRole")
      : Constants.ROLES.STARTUP_INDIVIDUAL
  );
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", Constants.ROLES.STARTUP_INDIVIDUAL);
    }
  }, []);

  useEffect(() => {
    const { error } = signupReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [signupReducer]);

  const onSignup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (!localStorage.getItem("userRole")) {
      setErrors([Constants.Errors.role]);
      setValidated(true);
    }

    if (
      email &&
      password &&
      password.match(Constants.isValidPassword) &&
      localStorage.getItem("userRole") &&
      form.checkValidity()
    ) {
      signupMethod({
        email: email,
        password: password,
        role: localStorage.getItem("userRole"),
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
              <Title text={"Sign up"} icon={false}></Title>
            </Col>
          </Row>
          <div className="content-container">
            <Row className="description-container">
              <Col>
                <Description>Choose what describe you best</Description>
              </Col>
            </Row>

            <Row className="tab-container">
              {tabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      localStorage.setItem("userRole", each.text);
                      setActiveTab(each.text);
                    }}
                  >
                    <Tab
                      text={each.text}
                      subText={each.subText}
                      isActive={activeTab === each.text}
                    />
                  </Col>
                );
              })}
            </Row>

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
                  text="Sign up with Google"
                  background={"#dd4b39"}
                  border={"#b23c2e"}
                />
              </div>
              <div className="linkedin-button">
                <SocialLoginButton
                  icon="/images/linkedin.svg"
                  text="Sign up with Linkedin"
                  background={"#007bb6"}
                  border={"#006b9f"}
                />
              </div>
            </div>
            <div className="devided-container">
              <OrDevider />
            </div>

            <Form noValidate validated={validated} onSubmit={onSignup}>
              {errors && errors.length ? (
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              ) : null}
              <Row className="form-container">
                <Col>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                    required
                    errorMessage={Constants.Errors.fname}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    required
                    errorMessage={Constants.Errors.lname}
                  />
                  <Input
                    type="email"
                    placeholder="youremail@website.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    errorMessage={
                      email
                        ? Constants.Errors.invalid_email
                        : Constants.Errors.email
                    }
                  ></Input>
                  <PassInput
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    isInvalid={
                      !password ||
                      (password && !password.match(Constants.isValidPassword))
                    }
                    errorMessage={
                      password
                        ? Constants.Errors.invalid_password
                        : Constants.Errors.password
                    }
                  ></PassInput>
                  <div className="password-feedback">
                    <span>
                      Your password must be at least 8 characters long and must
                      contain a minimum of 1 letter, 1 number, and 1 special
                      character.
                    </span>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="checkbox-container">
                    <CheckBox
                      id={`checkbox-1`}
                      checkBoxText={
                        <span>
                          By signing up you agree to the{" "}
                          <span className="privacy-links">
                            Terms of Use, Privacy Policy, Cookie Policy
                          </span>
                        </span>
                      }
                      checked={check1}
                      onChange={() => {
                        setCheck1(!check1);
                      }}
                    />
                    <CheckBox
                      id={`checkbox-2`}
                      checkBoxText="Receive updates and news"
                      checked={check2}
                      onChange={() => {
                        setCheck2(!check2);
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="button-container">
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={"Next, Email Verification>"}
                    type="submit"
                  ></PrimaryButton>
                </Col>
              </Row>
            </Form>

            <Row className="bottom-container">
              <Col>
                <PrimaryButton
                  variant="light"
                  text="Have an account? Login"
                  onClick={() => {
                    if (mode === "modal") {
                      setActiveModal("SignIn");
                    } else {
                      history.push("/login");
                    }
                  }}
                ></PrimaryButton>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {signupReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default SignUp;
