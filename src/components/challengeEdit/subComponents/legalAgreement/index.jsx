import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachLegalAggreementAction } from "./action";
import { EditorInput, Loading } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const LegalAgreement = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachLegalAggreementMethod = (data) =>
    dispatch(attachLegalAggreementAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeLegalAggreementReducer = useSelector((state) => {
    return state.challengeLegalAggreementReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [legalAgreement, changeLegalAgreement] = useState("");

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeLegalAggreementReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeLegalAggreementReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { legalAgreementId } = challengeData;
      if (legalAgreementId && legalAgreementId.data) {
        changeLegalAgreement(legalAgreementId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeLegalAggreementReducer.loading ||
        challengeReducer.loading) && <Loading />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              {t("legal_agreement_info_part1")}
              <br /> {t("legal_agreement_info_part2")}
              <span className="bold-text">
                {t("legal_agreement_info_part3")}
              </span>
            </span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
      challengeLegalAggreementReducer &&
      challengeLegalAggreementReducer.success &&
      challengeLegalAggreementReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeLegalAggreementReducer.success.message}</div>
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
          if (form.checkValidity() && legalAgreement) {
            attachLegalAggreementMethod({
              legalAgreement,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText={t("Legal agreement")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              value={legalAgreement}
              onChange={(value) => {
                if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
                  //textarea is still empty
                  changeLegalAgreement("");
                } else {
                  changeLegalAgreement(value);
                }
              }}
              isInvalid={validated && !legalAgreement}
              errorMessage={t("legal_agreement_error")}
              description={t("legal_agreement__description")}
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default LegalAgreement;
