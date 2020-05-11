import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePasswordAction } from "./action";
import { Title, PassInput, PrimaryButton, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const ChangePassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const changePasswordMethod = (data) => dispatch(changePasswordAction(data));

  const resetPasswordReducer = useSelector((state) => {
    return state.resetPasswordReducer;
  });

  const [password, changePassword] = useState("");
  const [confirmPassword, changeConfirmPassword] = useState("");

  useEffect(() => {
    const { error, changePasswordSuccess } = resetPasswordReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
    if (changePasswordSuccess) {
      toast.success(changePasswordSuccess, { position: "bottom-right" });
    }
  }, [resetPasswordReducer]);

  const onChangePassword = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!password) {
      toast.error(Constants.Errors.password, { position: "bottom-right" });
    }
    if (!confirmPassword) {
      toast.error(Constants.Errors.confirmPassword, {
        position: "bottom-right",
      });
    }
    if (password && confirmPassword && password !== confirmPassword) {
      toast.error(Constants.Errors.passwordMismatch, {
        position: "bottom-right",
      });
    }
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      match.params.resetPasswordCode
    ) {
      changePasswordMethod({
        resetPasswordCode: match.params.resetPasswordCode,
        password,
      });
    }
  };
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Change Password"}></Title>
            </Col>
          </Row>
          <Form onSubmit={onChangePassword}>
            <Row className="form-container">
              <Col>
                <PassInput
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    changePassword(e.target.value);
                  }}
                />
                <PassInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    changeConfirmPassword(e.target.value);
                  }}
                />
              </Col>
            </Row>

            <Row className="button-container">
              <Col>
                <PrimaryButton
                  text={"Change Password"}
                  type="submit"
                ></PrimaryButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {resetPasswordReducer.loading && <Loading />}
    </MainContainer>
  );
};

export default ChangePassword;
