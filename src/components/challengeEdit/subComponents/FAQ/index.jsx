import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachFAQsAction } from "./action";
import {
  Switch,
  Input,
  EditorInput,
  RemoveButton,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const FAQ = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachFAQsMethod = (data) =>
    dispatch(attachFAQsAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeFAQReducer = useSelector((state) => {
    return state.challengeFAQReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [FAQs, changeFAQS] = useState([]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeFAQReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeFAQReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { FAQId } = challengeData;
      if (FAQId && FAQId.data) {
        changeFAQS(FAQId.data);
      }
      if (FAQId && FAQId.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeFAQReducer.loading || challengeReducer.loading) && <Loading />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("FAQ_info_text")}</span>
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
        challengeFAQReducer &&
        challengeFAQReducer.success &&
        challengeFAQReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeFAQReducer.success.message}</div>
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
          if (form.checkValidity() && !FAQs.find((each) => !each.answer)) {
            attachFAQsMethod({
              isActive,
              FAQs,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText={t("FAQ")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
              infoButtonText={t("Add Item")}
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeFAQS((data) =>
                  data.concat({
                    _id: `FAQ-${data.length + 1}`,
                    question: "",
                    answer: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        {FAQs && FAQs.length ? (
          <Row style={{ marginBottom: 25 }}>
            <Col>
              <Switch
                checked={isActive}
                onChange={() => {
                  setActivity(!isActive);
                }}
                variant="primary"
                label={t("Enable FAQ tab")}
              ></Switch>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            {FAQs.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Input
                      type="text"
                      label={t("Question") + " *"}
                      value={each.question}
                      onChange={(e) => {
                        let newArr = [...FAQs];
                        newArr[index]["question"] = e.target.value;
                        changeFAQS(newArr);
                      }}
                      required
                      errorMessage={t("question_error")}
                    />
                    <EditorInput
                      label={t("Answer") + " *"}
                      value={each.answer}
                      onChange={(value) => {
                        if (
                          value.replace(/<(.|\n)*?>/g, "").trim().length === 0
                        ) {
                          //textarea is still empty
                          let newArr = [...FAQs];
                          newArr[index]["answer"] = "";
                          changeFAQS(newArr);
                        } else {
                          let newArr = [...FAQs];
                          newArr[index]["answer"] = value;
                          changeFAQS(newArr);
                        }
                      }}
                      isInvalid={validated && !each.answer}
                      errorMessage={t("answer_error")}
                    ></EditorInput>
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...FAQs];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeFAQS(newArr);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default React.memo(FAQ);
