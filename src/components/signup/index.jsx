import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "./action";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  PassInput,
  IconButton,
  Tab,
  Loading,
} from "../common";
import { Constants } from "../../lib/constant";

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const signupMethod = (data) => dispatch(signupAction(data));
  const signupReducer = useSelector((state) => {
    return state.signupReducer;
  });
  const [tabs, selectTab] = useState([
    {
      id: 1,
      text: Constants.ROLES.STARTUP_INDIVIDUAL,
      subText: "Create Solutions",
      isActive:
        localStorage.getItem("userRole") ===
          Constants.ROLES.STARTUP_INDIVIDUAL ||
        !localStorage.getItem("userRole")
          ? true
          : false,
    },
    {
      id: 2,
      text: Constants.ROLES.ORGANIZATION,
      subText: "Face Challenges",
      isActive:
        localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION
          ? true
          : false,
    },
    {
      id: 3,
      text: Constants.ROLES.MENTOR_JUDGE,
      subText: "Bring Experience",
      isActive:
        localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE
          ? true
          : false,
    },
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Register"}></Title>
            </Col>
          </Row>

          <Row className="description-container">
            <Col>
              <Description>Choose what describe you best</Description>
            </Col>
          </Row>

          <Row className="tab-container">
            {tabs.map((each) => {
              return (
                <Col
                  key={each.id}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  onClick={() => {
                    localStorage.setItem("userRole", each.text);
                    selectTab(
                      tabs.map((record) => {
                        if (record.id === each.id) {
                          record.isActive = true;
                          return record;
                        } else {
                          record.isActive = false;
                          return record;
                        }
                      })
                    );
                  }}
                >
                  <Tab
                    text={each.text}
                    subText={each.subText}
                    isActive={each.isActive}
                  />
                </Col>
              );
            })}
          </Row>
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
                  type="email"
                  placeholder="Enter email"
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
                  required
                  errorMessage={Constants.Errors.password}
                ></PassInput>
              </Col>
            </Row>

            <Row className="button-container">
              <Col>
                <IconButton
                  text={"Email Verification"}
                  type="submit"
                ></IconButton>
              </Col>
            </Row>
          </Form>

          <Row className="bottom-container">
            <Col>
              Have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      {signupReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default SignUp;
