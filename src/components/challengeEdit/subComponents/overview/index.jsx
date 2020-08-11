import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachOverviewAction } from "./action";
import { EditorInput, Loading } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Overview = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachOverviewMethod = (data) =>
    dispatch(attachOverviewAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeOverviewReducer = useSelector((state) => {
    return state.challengeOverviewReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [overview, changeOverview] = useState("");

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeOverviewReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeOverviewReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { overviewId } = challengeData;
      if (overviewId && overviewId.data) {
        changeOverview(overviewId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeOverviewReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("Overview_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
      challengeOverviewReducer &&
      challengeOverviewReducer.success &&
      challengeOverviewReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeOverviewReducer.success.message}</div>
            </Alert>
          </Col>
        </Row>
      ) : null}
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
      ) : null}
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity() && overview) {
            attachOverviewMethod({
              overview,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText={t("Overview")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              description={t("Overview_editor_description")}
              value={overview}
              onChange={(value) => {
                if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
                  //textarea is still empty
                  changeOverview("");
                } else {
                  changeOverview(value);
                }
              }}
              isInvalid={validated && !overview}
              errorMessage={t("overview_error")}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default Overview;
