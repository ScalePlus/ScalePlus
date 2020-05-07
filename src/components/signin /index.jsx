import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Title, Input, PassInput, PrimaryButton } from "../common";
import { MainContainer } from "./style";

const SignIn = ({ history }) => {
  const [showPass, changeToggle] = useState(false);
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  const onLogin = () => {
    if (localStorage.getItem("userRole")) {
      history.push("/organization/detail");
    } else {
      toast.error("Invalid Credentials", { position: "bottom-right" });
    }
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

          <Row className="form-container">
            <Col>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    changeEmail(e.target.value);
                  }}
                />
                <PassInput
                  showPass={showPass}
                  placeholder="Password"
                  iconClick={(e) => {
                    e.preventDefault();
                    changeToggle(!showPass);
                  }}
                  value={password}
                  onChange={(e) => {
                    changePassword(e.target.value);
                  }}
                />

                <div className="reset-link">Reset Password</div>
                <input type="submit" style={{ display: "none" }}></input>
              </Form>
            </Col>
          </Row>

          <Row className="button-container">
            <Col>
              <PrimaryButton
                text={"Login"}
                onClick={() => onLogin()}
              ></PrimaryButton>
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
        </Col>
      </Row>
    </MainContainer>
  );
};

export default SignIn;
