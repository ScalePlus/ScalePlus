import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachJudgingActivitiesAction } from "./action";
import { DateInput, TextArea, RemoveButton, Loading } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { InfoBlock } from "../common";
import { MainContainer } from "./style";

const JudgingActivities = ({ challengeId }) => {
  const dispatch = useDispatch();
  const attachJudgingActivitiesMethod = (data) =>
    dispatch(attachJudgingActivitiesAction(data, challengeId));

  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeJudgingActivitiesReducer = useSelector((state) => {
    return state.challengeJudgingActivitiesReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [judgingActivities, changeJudgingActivities] = useState([]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeJudgingActivitiesReducer;

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeJudgingActivitiesReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;

    if (challengeData) {
      const { judgingActivityId } = challengeData;
      if (judgingActivityId && judgingActivityId.data) {
        changeJudgingActivities(judgingActivityId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeJudgingActivitiesReducer.loading ||
        challengeReducer.loading) && <Loading />}
      {validated &&
      challengeJudgingActivitiesReducer &&
      challengeJudgingActivitiesReducer.success &&
      challengeJudgingActivitiesReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeJudgingActivitiesReducer.success.message}</div>
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
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Here is a list of all the Judging Activities and Projected Dates
              when they take place.
            </span>
          </InfoBlock>
        </Col>
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            attachJudgingActivitiesMethod({
              judgingActivities,
            });
          }
          setValidated(true);
        }}
        style={{ marginBottom: 30 }}
      >
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <HeaderComponent
              titleText="Judging activities"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeJudgingActivities((data) =>
                  data.concat({
                    _id: `judgingActivities-${data.length + 1}`,
                    date: "",
                    description: "",
                  })
                );
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {judgingActivities.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Row>
                      <Col lg={4} md={4} sm={12} xs={12}>
                        <DateInput
                          isSmall={true}
                          showTime={true}
                          value={each.date ? new Date(each.date) : null}
                          onChange={(date) => {
                            let newArr = [...judgingActivities];
                            newArr[index]["date"] = date;
                            changeJudgingActivities(newArr);
                          }}
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextArea
                          rows="2"
                          value={each.description}
                          onChange={(e) => {
                            let newArr = [...judgingActivities];
                            newArr[index]["description"] = e.target.value;
                            changeJudgingActivities(newArr);
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...judgingActivities];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeJudgingActivities(newArr);
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

export default JudgingActivities;
