import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

  useEffect(() => {
    const { error } = signinReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [signinReducer]);

  const onLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!email) {
      toast.error(Constants.Errors.email, { position: "bottom-right" });
    }
    if (!password) {
      toast.error(Constants.Errors.password, { position: "bottom-right" });
    }
    if (email && password) {
      signinMethod({
        email: email,
        password: password,
      });
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
          <Form onSubmit={onLogin}>
            <Row className="form-container">
              <Col>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    changeEmail(e.target.value);
                  }}
                />
                <PassInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    changePassword(e.target.value);
                  }}
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
