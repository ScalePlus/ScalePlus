import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import { attachUpdatesAction } from "./action";
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

const Updates = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachUpdatesMethod = (data) =>
    dispatch(attachUpdatesAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeUpdatesReducer = useSelector((state) => {
    return state.challengeUpdatesReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [updates, changeUpdates] = useState([]);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeUpdatesReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeUpdatesReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { updateId } = challengeData;
      if (updateId && updateId.data) {
        changeUpdates(updateId.data);
      }
      if (updateId && updateId.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeUpdatesReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("Updates_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
      challengeUpdatesReducer &&
      challengeUpdatesReducer.success &&
      challengeUpdatesReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeUpdatesReducer.success.message}</div>
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
            attachUpdatesMethod({
              isActive,
              updates,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText={t("Updates")}
              buttonText={t("Save")}
              buttonVariant="success"
              buttonType="submit"
              infoButtonText={t("Add Item")}
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeUpdates((data) =>
                  data.concat({
                    _id: `update-${data.length + 1}`,
                    title: "",
                    description: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        {updates && updates.length ? (
          <Row style={{ marginBottom: 25 }}>
            <Col>
              <Switch
                checked={isActive}
                onChange={() => {
                  setActivity(!isActive);
                }}
                variant="primary"
                label={t("Enable Updates tab")}
              ></Switch>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            {updates.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Input
                      required
                      type="text"
                      label={t("Title") + " *"}
                      value={each.title}
                      onChange={(e) => {
                        let newArr = [...updates];
                        newArr[index]["title"] = e.target.value;
                        newArr[index]["date"] = new Date();
                        changeUpdates(newArr);
                      }}
                    />
                    <EditorInput
                      label={t("Description")}
                      value={each.description}
                      onChange={(value) => {
                        let newArr = [...updates];
                        newArr[index]["description"] = value;
                        newArr[index]["date"] = new Date();
                        changeUpdates(newArr);
                      }}
                    ></EditorInput>
                  </div>
                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...updates];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeUpdates(newArr);
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

export default Updates;
