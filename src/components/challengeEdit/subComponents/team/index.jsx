import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getChallengeAction } from "../../../challengeMaster/action";
import { attachTeamAction } from "./action";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import {
  Input,
  CommonTable,
  PrimaryButton,
  Switch,
  Loading,
} from "../../../common";
import { Constants } from "../../../../lib/constant";

const Team = ({ t, challengeId }) => {
  const dispatch = useDispatch();
  const attachTeamMethod = (data) =>
    dispatch(attachTeamAction(data, challengeId));
  const getChallengeMethod = useCallback(
    (id) => dispatch(getChallengeAction(id)),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const challengeTeamReducer = useSelector((state) => {
    return state.challengeTeamReducer;
  });

  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [check, setPermission] = useState(false);
  const [tabelData, setTableData] = useState(null);

  useEffect(() => {
    const { error, success } = challengeTeamReducer;

    if (success && validated) {
      setValidated(false);
      getChallengeMethod(challengeId);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeTeamReducer, getChallengeMethod, challengeId, validated]);

  useEffect(() => {
    const { success } = challengeTeamReducer;
    if (success) {
      setEmail("");
      setLinkedin("");
      setPermission(false);
    }
  }, [challengeTeamReducer]);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { teamId } = challengeData;
      if (teamId && teamId.data) {
        setTableData(teamId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {(challengeTeamReducer.loading || challengeReducer.loading) && (
        <Loading />
      )}
      <Row style={{ marginBottom: 25 }}>
        <Col>
          <HeaderComponent titleText={t("Team")} />
        </Col>
      </Row>

      {errors && errors.length ? (
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          </Col>
        </Row>
      ) : validated &&
        challengeTeamReducer &&
        challengeTeamReducer.success &&
        challengeTeamReducer.success.message ? (
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <Alert variant={"success"} className="text-left">
              <div>{challengeTeamReducer.success.message}</div>
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
          if (
            form.checkValidity() &&
            (!linkedin || (linkedin && linkedin.match(Constants.isURL)))
          ) {
            attachTeamMethod({
              email,
              linkedin,
              permission: check
                ? Constants.TEAM_PERMISSION.VIEW
                : Constants.TEAM_PERMISSION.ADMIN,
              mode: "update",
            });
          }
          setValidated(true);
        }}
      >
        <Row>
          <Col lg={7} md={12} sm={12}>
            <div className="controll-container">
              <Input
                type="text"
                placeholder={t("Type an email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                errorMessage={
                  email ? t("invalid_email_error") : t("email_error")
                }
              />
              <Input
                type="text"
                placeholder={t("Linkedin Profile")}
                value={linkedin}
                onChange={(e) => {
                  setLinkedin(e.target.value);
                }}
                isInvalid={
                  validated && linkedin && !linkedin.match(Constants.isURL)
                }
                errorMessage={
                  linkedin
                    ? t("invalid_linkedin_url_error")
                    : t("linkedin_url_error")
                }
              />
            </div>
          </Col>
          <Col lg={5} md={12} sm={12}>
            <div className="form-container">
              <div>{t("User Role")}:</div>
              <div className="switch-container">
                <div className={"left-text"}>
                  <span>{t("Admin")}</span>
                </div>
                <div>
                  <Switch
                    variant="primary"
                    label=""
                    checked={check}
                    onChange={() => {
                      setPermission(!check);
                    }}
                  ></Switch>
                </div>
                <div className={"right-text"}>
                  <span>{t("View Only")}</span>
                </div>
              </div>
              <div>
                <PrimaryButton
                  variant="success"
                  text={t("Add")}
                  type="submit"
                ></PrimaryButton>
              </div>
            </div>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col>
          <CommonTable
            columns={[
              {
                Header: "",
                accessor: "userId",
                Cell: (data) => {
                  return <div>{data && data.email}</div>;
                },
                width: "20%",
              },
              {
                Header: "",
                accessor: "userId",
                Cell: (data) => {
                  return (
                    <div>{data && data.details && data.details.website}</div>
                  );
                },
                width: "20%",
              },
              {
                Header: "",
                accessor: "permission",
                Cell: (data) => {
                  return <div className="status-text">{data}</div>;
                },
                width: "35%",
              },
              {
                Header: "",
                accessor: "_id",
                width: "15%",
                Cell: (data) => {
                  return (
                    <div className="action-container">
                      <div
                        onClick={() => {
                          const record = tabelData.find(
                            (each) => each._id.toString() === data.toString()
                          );
                          setEmail(
                            record && record.userId && record.userId.email
                              ? record.userId.email
                              : ""
                          );
                          setLinkedin(
                            record &&
                              record.userId &&
                              record.userId.details &&
                              record.userId.details.website
                              ? record.userId.details.website
                              : ""
                          );
                          setPermission(
                            record &&
                              record.permission ===
                                Constants.TEAM_PERMISSION.VIEW
                              ? true
                              : false
                          );
                        }}
                      >
                        {t("Edit")}/
                      </div>
                      <div
                        onClick={() => {
                          const record = tabelData.find(
                            (each) => each._id.toString() === data.toString()
                          );
                          attachTeamMethod({
                            email:
                              record && record.userId && record.userId.email
                                ? record.userId.email
                                : "",
                            linkedin:
                              record &&
                              record.userId &&
                              record.userId.details &&
                              record.userId.details.website
                                ? record.userId.details.website
                                : "dummyText",
                            permission:
                              record &&
                              record.permission ===
                                Constants.TEAM_PERMISSION.VIEW
                                ? true
                                : false,
                            mode: "delete",
                          });
                        }}
                      >
                        {t("Delete")}-
                      </div>
                    </div>
                  );
                },
              },
            ]}
            data={tabelData && tabelData.length ? tabelData : null}
            showPagination={false}
          />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Team;
