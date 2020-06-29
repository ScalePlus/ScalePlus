import React, { useState, useEffect } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { getChallengeAction } from "../../../challengeMaster/action";
import Api from "../../../challengeMaster/api";
import { attachResourcesAction } from "./action";
import {
  Switch,
  Input,
  EditorInput,
  FileInput,
  RemoveButton,
  Loading,
} from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const Resources = ({ challengeId }) => {
  const dispatch = useDispatch();
  const attachResourcesMethod = (data) =>
    dispatch(attachResourcesAction(data, challengeId));
  // const getChallengeMethod = useCallback(
  //   (id) => dispatch(getChallengeAction(id)),
  //   [dispatch]
  // );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeResourceReducer = useSelector((state) => {
    return state.challengeResourceReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isActive, setActivity] = useState(false);
  const [resources, changeResources] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getChallengeMethod(challengeId);
  // }, [getChallengeMethod, challengeId]);

  useEffect(() => {
    const { error } = challengeResourceReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeResourceReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { resourceId } = challengeData;
      if (resourceId && resourceId.data) {
        changeResources(resourceId.data);
      }
      if (resourceId && resourceId.isActive) {
        setActivity(true);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeResourceReducer.loading ||
        challengeReducer.loading ||
        loading) && <Loading />}
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Create an Resources section that will be displayed on the
              Resources tab of your challenge page.
            </span>
          </InfoBlock>
        </Col>
      </Row>
      {validated &&
      challengeResourceReducer &&
      challengeResourceReducer.success &&
      challengeResourceReducer.success.message ? (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeResourceReducer.success.message}</div>
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
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            let newArr = [...resources];

            for (let i = 0; i < newArr.length; i++) {
              const resource = newArr[i];
              if (resource.attachment && resource.attachment.name) {
                setLoading(true);
                let fileResult = await Api.uploadFile({
                  file: resource.attachment,
                });
                if (
                  fileResult &&
                  fileResult.result &&
                  fileResult.result.imageKey
                ) {
                  resource.attachment = fileResult.result.imageKey;
                }
                setLoading(false);
              }
            }

            attachResourcesMethod({
              isActive,
              resources: newArr,
            });
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent
              titleText="Resources"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
              infoButtonText="Add Item"
              infoButtonVariant="info"
              infoButtonType="button"
              infoButtonClick={() => {
                changeResources((data) =>
                  data.concat({
                    _id: `resource-${data.length + 1}`,
                    title: "",
                    attachment: "",
                    description: "",
                    link: "",
                  })
                );
              }}
            />
          </Col>
        </Row>
        {resources && resources.length ? (
          <Row style={{ marginBottom: 25 }}>
            <Col>
              <Switch
                checked={isActive}
                onChange={() => {
                  setActivity(!isActive);
                }}
                variant="primary"
                label="Enable Resources tab"
              ></Switch>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col>
            {resources.map((each, index) => {
              return (
                <div className="box-container" key={each._id}>
                  <div className="left-container">
                    <Row>
                      <Col>
                        <Input
                          required
                          type="text"
                          label="Title *"
                          value={each.title}
                          onChange={(e) => {
                            let newArr = [...resources];
                            newArr[index]["title"] = e.target.value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="align-items-center fileContainer">
                      <Col lg={4} md={6} sm={12} xs={12}>
                        <FileInput
                          placeholder="choose file"
                          label="Attachment"
                          buttonText="Upload File"
                          value={each.attachment}
                          onChange={(e) => {
                            let newArr = [...resources];
                            newArr[index]["attachment"] = e.target.files[0];
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        ></FileInput>
                      </Col>
                      <Col
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        style={{ marginTop: "25px" }}
                      >
                        <span className="info-text">
                          Allowed file types are: ....
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <EditorInput
                          label="Description"
                          value={each.description}
                          onChange={(value) => {
                            let newArr = [...resources];
                            newArr[index]["description"] = value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        ></EditorInput>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Input
                          type="text"
                          label="Link"
                          value={each.link}
                          onChange={(e) => {
                            let newArr = [...resources];
                            newArr[index]["link"] = e.target.value;
                            newArr[index]["date"] = new Date();
                            changeResources(newArr);
                          }}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="right-container">
                    <RemoveButton
                      onClick={() => {
                        let newArr = [...resources];
                        newArr = newArr.filter((data) => {
                          return each._id !== data._id;
                        });
                        changeResources(newArr);
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

export default Resources;
