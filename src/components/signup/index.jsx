import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MainContainer } from "./style";
import { Title, Description, Input, PrimaryButton, Tab } from "../common";

const SignUp = ({ history }) => {
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
            <Col lg={4} md={6} sm={6} xs={12}>
              <Tab
                text={"Startup or Individual"}
                subText={"Create Solutions"}
                isActive={false}
              />
            </Col>
            <Col lg={4} md={6} sm={6} xs={12}>
              <Tab
                text={"Organization"}
                subText={"Face Challenges"}
                isActive={true}
              />
            </Col>
            <Col lg={4} md={6} sm={6} xs={12}>
              <Tab
                text={"Mentor / Judge"}
                subText={"Bring Experience"}
                isActive={false}
              />
            </Col>
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
