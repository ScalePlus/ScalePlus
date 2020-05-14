import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

  useEffect(() => {
    if (!localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", Constants.ROLES.STARTUP_INDIVIDUAL);
    }
  }, []);

  useEffect(() => {
    const { error } = signupReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [signupReducer]);

  const onSignup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!email) {
      toast.error(Constants.Errors.email, { position: "bottom-right" });
    }
    if (!password) {
      toast.error(Constants.Errors.password, { position: "bottom-right" });
    }
    if (!localStorage.getItem("userRole")) {
      toast.error(Constants.Errors.role, { position: "bottom-right" });
    }

    if (email && password && localStorage.getItem("userRole")) {
      signupMethod({
        email: email,
        password: password,
        role: localStorage.getItem("userRole"),
      });
    }
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
                  <div
                    className={
                      each.id !== tabs[tabs.length - 1].id
                        ? "outer-tab-container "
                        : ""
                    }
                  >
                    <Tab
                      text={each.text}
                      subText={each.subText}
                      isActive={each.isActive}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
          <Form onSubmit={onSignup}>
            <Row className="form-container">
              <Col>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Input>
                <PassInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
