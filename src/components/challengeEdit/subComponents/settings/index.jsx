import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateChallengeAction } from "../../../challengeMaster/action";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { TextArea, PrimaryButton, Loading } from "../../../common";
import { MainContainer } from "./style";
import { Constants } from "../../../../lib/constant";

const Settings = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const updateChallengeMethod = (data) => dispatch(updateChallengeAction(data));

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [cancellationReason, changeReason] = useState("");

  useEffect(() => {
    const { error } = challengeReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeReducer]);

  return (
    <MainContainer>
      {challengeReducer.loading && <Loading />}
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            updateChallengeMethod({
              _id: challengeId,
              status: Constants.STATUS.DELETED,
              cancellationReason,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText={t("Settings")}
              // buttonText={t("Save")}
              // buttonVariant="success"
              // buttonType="submit"
            />
          </Col>
        </Row>
        {errors && errors.length ? (
          <Row style={{ marginBottom: 45 }}>
            <Col>
              <Alert variant={"danger"} className="text-left">
                {errors.map((each, index) => {
                  return <div key={index}>{each}</div>;
                })}
              </Alert>
            </Col>
          </Row>
        ) : null}
        <Row style={{ position: "relative" }}>
          <Col>
            <TextArea
              rows="4"
              label={t("Cancel challenge")}
              value={cancellationReason}
              onChange={(e) => changeReason(e.target.value)}
              required
              errorMessage={t("cancellationReason_error")}
            />
            <div className="danger-button-container">
              <PrimaryButton
                variant="danger"
                text={t("Delete challenge")}
                type="submit"
              ></PrimaryButton>
            </div>
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Settings;
