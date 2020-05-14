import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPasswordAction, clearAll } from "./action";
import { Title, Input, IconButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const forgotPasswordMethod = (data) => dispatch(forgotPasswordAction(data));
  const clearAllMethod = useCallback((data) => dispatch(clearAll(data)), [
    dispatch,
  ]);

  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  const [email, changeEmail] = useState("");

  useEffect(() => {
    clearAllMethod();
  }, [clearAllMethod]);

  useEffect(() => {
    const { error } = resetPasswordReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [resetPasswordReducer]);

  const onResetPassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!email) {
      toast.error(Constants.Errors.email, { position: "bottom-right" });
    } else {
      forgotPasswordMethod({
        email,
      });
    }
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Reset Password"}></Title>
            </Col>
          </Row>
          <Form onSubmit={onResetPassword}>
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
              </Col>
            </Row>

            <Row className="button-container">
              <Col>
                <IconButton text={"Reset Password"} type="submit"></IconButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ResetPassword;
