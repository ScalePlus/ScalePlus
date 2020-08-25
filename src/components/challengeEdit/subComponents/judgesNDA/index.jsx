import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachJudgesNDAAction } from "./action";
import { Switch, EditorInput, Loading } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const JudgesNDA = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachJudgesNDAMethod = (data) =>
    dispatch(attachJudgesNDAAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeJudgesNDAReducer = useSelector((state) => {
    return state.challengeJudgesNDAReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [judgesNDA, changeJudgesNDA] = useState("");

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeJudgesNDAReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeJudgesNDAReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { judgesNDAID } = challengeData;
      if (judgesNDAID && judgesNDAID.data) {
        changeJudgesNDA(judgesNDAID.data);
      }
      if (judgesNDAID && judgesNDAID.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeJudgesNDAReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("Judges_NDA_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>

      {errors && errors.length ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : validated &&
        challengeJudgesNDAReducer &&
        challengeJudgesNDAReducer.success &&
        challengeJudgesNDAReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeJudgesNDAReducer.success.message}</div>
            </Alert>
          </Col>
        </Row>
      ) : null}
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity() && judgesNDA) {
            attachJudgesNDAMethod({
              isActive,
              judgesNDA,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText={t("Judges NDA")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <Switch
              checked={isActive}
              onChange={() => {
                setActivity(!isActive);
              }}
              variant="primary"
              label={t("Enable Judges NDA")}
            ></Switch>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              value={judgesNDA}
              onChange={(value) => {
                if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
                  //textarea is still empty
                  changeJudgesNDA("");
                } else {
                  changeJudgesNDA(value);
                }
              }}
              isInvalid={validated && !judgesNDA}
              errorMessage={t("judgesNDA_error")}
              description={t("Judging_activities_description_text")}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default JudgesNDA;
