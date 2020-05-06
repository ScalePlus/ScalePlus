import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MainContainer } from "./style";
import { Title, Description, Input, PrimaryButton, Tab } from "../common";
import { Constants } from "../../lib/constant";

const SignUp = ({ history }) => {
  const [tabs, selectTab] = useState([
    {
      id: 1,
      text: "Startup or Individual",
      subText: "Create Solutions",
      isActive:
        localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL
          ? true
          : false,
    },
    {
      id: 2,
      text: "Organization",
      subText: "Face Challenges",
      isActive:
        localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION
          ? true
          : false,
    },
    {
      id: 3,
      text: "Mentor / Judge",
      subText: "Bring Experience",
      isActive:
        localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE
          ? true
          : false,
    },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", Constants.ROLES.STARTUP_INDIVIDUAL);
    }
  }, []);

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

          <Row className="form-container">
            <Col>
              <Form>
                <Input type="email" placeholder="Enter email"></Input>
                <Input type="password" placeholder="Password"></Input>
              </Form>
            </Col>
          </Row>

          <Row className="button-container">
            <Col>
              <PrimaryButton
                text={"Email Verification"}
                onClick={() => {
                  history.push("/verification");
                }}
              ></PrimaryButton>
            </Col>
          </Row>

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
    </MainContainer>
  );
};

export default SignUp;
