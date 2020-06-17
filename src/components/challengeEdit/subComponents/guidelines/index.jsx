import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachGuidelineAction } from "./action";
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

const Guidelines = ({ challengeId }) => {
  const dispatch = useDispatch();
  const attachGuidelineMethod = (data) =>
    dispatch(attachGuidelineAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeGuidelineReducer = useSelector((state) => {
    return state.challengeGuidelineReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [guidelines, changeGuideline] = useState([]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeGuidelineReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeGuidelineReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { guidelineId } = challengeData;
      if (guidelineId && guidelineId.data) {
        changeGuideline(guidelineId.data);
      }
      if (guidelineId && guidelineId.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeGuidelineReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Use this section to describe what your challenge is about, why it
              is important, and what breakthrough you want to achieve. You may
              include images and videos
            </span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
      challengeGuidelineReducer &&
      challengeGuidelineReducer.success &&
      challengeGuidelineReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeGuidelineReducer.success.message}</div>
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
          if (form.checkValidity()) {
            attachGuidelineMethod({
              isActive,
              guidelines,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText="Guidelines"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeGuideline((data) =>
                  data.concat({
                    _id: `guideline-${data.length + 1}`,
                    title: "",
                    description: "",
                  })
                );
              }}
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
              label="Enable Guidelines tab"
            ></Switch>
          </Col>
        </Row>
        <Row>
          <Col>
            {guidelines.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Input
                      required
                      type="text"
                      label="Title *"
                      value={each.title}
                      onChange={(e) => {
                        let newArr = [...guidelines];
                        newArr[index]["title"] = e.target.value;
                        newArr[index]["date"] = new Date();
                        changeGuideline(newArr);
                      }}
                    />
                    <EditorInput
                      label="Description"
                      value={each.description}
                      onChange={(value) => {
                        let newArr = [...guidelines];
                        newArr[index]["description"] = value;
                        newArr[index]["date"] = new Date();
                        changeGuideline(newArr);
                      }}
                    ></EditorInput>
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...guidelines];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeGuideline(newArr);
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

export default Guidelines;
