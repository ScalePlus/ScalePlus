import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { getAttachedUsersAction } from "../allUsers/action";
import { updateStatusAction, cancelInvitationAction } from "./action";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, Switch, Loading } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const UserProfileView = ({ match, history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters, searchText) =>
      dispatch(getAttachedUsersAction(filters, searchText)),
    [dispatch]
  );
  const updateStatus = (data) => dispatch(updateStatusAction(data));
  const cancelInvitation = (data) => dispatch(cancelInvitationAction(data));

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });
  const updateProfileViewReducer = useSelector((state) => {
    return state.updateProfileViewReducer;
  });
  const updateProfileReducer = useSelector((state) => {
    return state.updateProfileReducer;
  });

  const logged_user_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    logged_user_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN;

  const [is_startup_Individual, set_is_startup_Individual] = useState(false);
  const [is_organisation, set_is_organisation] = useState(false);
  const [is_mentor_judge, set_is_mentor_judge] = useState(false);

  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getAttachedUsers({}, "");
  }, [getAttachedUsers]);

  useEffect(() => {
    const { success } = updateProfileReducer;
    if (success) {
      getAttachedUsers({}, "");
    }
  }, [getAttachedUsers, updateProfileReducer]);

  useEffect(() => {
    const { error, success } = updateProfileViewReducer;
    if (success) {
      getAttachedUsers({}, "");
      setErrors([]);
    }

    if (error) {
      let errors = [];
      if (Array.isArray(error)) {
        errors = error;
      } else if (typeof error === "string") {
        errors.push(error);
      }
      setErrors(errors);
    }
  }, [getAttachedUsers, updateProfileViewReducer]);

  useEffect(() => {
    const { attachedUsers } = attachedUsersReducer;
    if (attachedUsers && attachedUsers.result && attachedUsers.result.length) {
      const { result } = attachedUsers;
      const record = result.find(
        (each) => each.data.userId._id.toString() === match.params.id.toString()
      );
      if (record) {
        setUserData(record);
        if (
          record &&
          record.data &&
          record.data.userId &&
          record.data.userId.roles &&
          record.data.userId.roles.length
        ) {
          set_is_startup_Individual(
            record.data.userId.roles.find(
              (role) => role === Constants.ROLES.STARTUP_INDIVIDUAL
            )
          );
          set_is_organisation(
            record.data.userId.roles.find(
              (role) => role === Constants.ROLES.ORGANIZATION
            )
          );
          set_is_mentor_judge(
            record.data.userId.roles.find(
              (role) => role === Constants.ROLES.MENTOR_JUDGE
            )
          );
        }
      }
    }
  }, [attachedUsersReducer, match]);

  return userData && userData.data && userData.data.userId ? (
    <MainContainer>
      {(attachedUsersReducer.loading ||
        updateProfileViewReducer.loading ||
        updateProfileReducer.loading) && <Loading />}
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={10}>
          {errors && errors.length ? (
            <Alert variant={"danger"} className="text-left">
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          ) : null}
          <div className="title-container">
            <div className="title">
              <div
                className="title-label"
                onClick={() => {
                  history.goBack();
                }}
              >
                {t("< User Profile")}
              </div>
              {userData && userData.data && userData.data.status && (
                <div
                  className="status-container"
                  style={
                    userData.data.status === Constants.USER_STATUS.Invited
                      ? {
                          backgroundColor: "#fdf1ce",
                          color: "#f4ba09",
                          borderColor: "#f4ba09",
                        }
                      : userData.data.status === Constants.USER_STATUS.Joined ||
                        userData.data.status ===
                          Constants.USER_STATUS.Submitted ||
                        userData.data.status ===
                          Constants.USER_STATUS.Accepeted ||
                        userData.data.status === Constants.USER_STATUS.Created
                      ? {
                          backgroundColor: "#e0f9ea",
                          color: "#66e397",
                          borderColor: "#66e397",
                        }
                      : userData.data.status ===
                          Constants.USER_STATUS.Declined ||
                        userData.data.status === Constants.USER_STATUS.Canceled
                      ? {
                          backgroundColor: "#fce7e7",
                          color: "#f18989",
                          borderColor: "#f18989",
                        }
                      : {}
                  }
                >
                  {userData && userData.data && userData.data.status}
                </div>
              )}
            </div>
            {logged_user_organisation || logged_user_admin ? (
              <div className="button-container">
                {logged_user_admin && (
                  <PrimaryButton
                    text={t("Edit")}
                    onClick={() => {
                      if (
                        userData &&
                        userData.data &&
                        userData.data.userId &&
                        userData.data.userId._id
                      ) {
                        history.push(
                          `/profile/edit/${userData.data.userId._id}`
                        );
                      }
                    }}
                  />
                )}

                {userData.data.status === Constants.USER_STATUS.Invited ? (
                  <PrimaryButton
                    text={t("Cancel Invitation")}
                    variant="danger_light"
                    onClick={() => {
                      if (
                        userData &&
                        userData.challengeId &&
                        userData.challengeId._id &&
                        userData.data &&
                        userData.data.userId &&
                        userData.data.userId._id
                      ) {
                        cancelInvitation({
                          userId: userData.data.userId._id,
                          challengeId: userData.challengeId._id,
                        });
                      }
                    }}
                  />
                ) : null}

                {userData &&
                userData.type &&
                (userData.type === "judge_invite" ||
                  userData.type === "team_invite" ||
                  userData.type === "participants" ||
                  userData.type === "participants_invited") &&
                userData.data.status !== Constants.USER_STATUS.Invited &&
                userData.data.status !== Constants.USER_STATUS.Canceled ? (
                  <PrimaryButton
                    text={t("Reject")}
                    variant="danger_light"
                    disabled={
                      userData.data.status === Constants.USER_STATUS.Declined
                    }
                    onClick={() => {
                      updateStatus({
                        userId: userData.data.userId._id,
                        type: userData.type,
                        status: Constants.USER_STATUS.Declined,
                      });
                    }}
                  />
                ) : null}

                {userData &&
                userData.type &&
                (userData.type === "judge_invite" ||
                  userData.type === "team_invite" ||
                  userData.type === "participants" ||
                  userData.type === "participants_invited") &&
                userData.data.status !== Constants.USER_STATUS.Invited &&
                userData.data.status !== Constants.USER_STATUS.Canceled ? (
                  <PrimaryButton
                    text={t("Accept")}
                    variant="primary"
                    disabled={
                      userData.data.status === Constants.USER_STATUS.Accepeted
                    }
                    onClick={() => {
                      updateStatus({
                        userId: userData.data.userId._id,
                        type: userData.type,
                        status: Constants.USER_STATUS.Accepeted,
                      });
                    }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Basic information")}</div>
              </Col>
            </Row>
            <Row>
              <Col className="avtar-container">
                <div className="circule-contaier">
                  {userData.data.userId.details.personal_photo ? (
                    <img
                      src={userData.data.userId.details.personal_photo}
                      height="100%"
                      width="100%"
                      alt=""
                      style={{ borderRadius: "50%" }}
                    ></img>
                  ) : userData.data.userId.details.logo ? (
                    <img
                      src={userData.data.userId.details.logo}
                      height="100%"
                      width="100%"
                      alt=""
                      style={{ borderRadius: "50%" }}
                    ></img>
                  ) : (
                    <img
                      src={"/images/image.svg"}
                      height="50px"
                      width="50px"
                      alt=""
                    ></img>
                  )}
                </div>
                {is_startup_Individual || is_organisation ? (
                  <div className="info-container">
                    <Row>
                      {userData.data.userId.roles &&
                      userData.data.userId.roles.length ? (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("User role") + " *"}
                            </div>
                            <div>{userData.data.userId.roles[0]}</div>
                          </div>
                        </Col>
                      ) : null}

                      {userData.data.userId.firstName && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("First name") + " *"}
                            </div>
                            <div>{userData.data.userId.firstName}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.lastName && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Last name") + " *"}
                            </div>
                            <div>{userData.data.userId.lastName}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.name && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Organization Name")}
                            </div>
                            <div>{userData.data.userId.details.name}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.email && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Email") + " *"}</div>
                            <div>{userData.data.userId.email}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.website && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Website Name")}</div>
                            <div>{userData.data.userId.details.website}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.locationData && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Location")}</div>
                            <div>
                              {userData.data.userId.details.locationData}
                            </div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.incorporationDate && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Incorporation Date")}
                            </div>
                            <div>
                              {moment(
                                userData.data.userId.details.incorporationDate
                              ).format("DD.MM.YYYY")}
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                    {userData.data.userId.inspireText && (
                      <Row style={{ marginTop: "1rem" }}>
                        <Col>
                          <div className="bold-text">{t("inspires_text")}</div>
                          <div>{userData.data.userId.inspireText}</div>
                        </Col>
                      </Row>
                    )}
                    {userData.data.userId.bioText && (
                      <Row>
                        <Col>
                          <div className="border-container"></div>
                        </Col>
                      </Row>
                    )}
                    {userData.data.userId.bioText && (
                      <Row>
                        <Col>
                          <div className="bold-text">{t("Bio")}</div>
                          <div>{userData.data.userId.bioText}</div>
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : is_mentor_judge ? (
                  <div className="info-container">
                    <Row>
                      {userData.data.userId.roles &&
                      userData.data.userId.roles.length ? (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("User role") + " *"}
                            </div>
                            <div>{userData.data.userId.roles[0]}</div>
                          </div>
                        </Col>
                      ) : null}

                      {userData.data.userId.firstName && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("First name") + " *"}
                            </div>
                            <div>{userData.data.userId.firstName}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.lastName && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Last name") + " *"}
                            </div>
                            <div>{userData.data.userId.lastName}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.name && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Full Name as Per Passport")}
                            </div>
                            <div>{userData.data.userId.details.name}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.email && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Email") + " *"}</div>
                            <div>{userData.data.userId.email}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.mobile && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Mobile Number")}
                            </div>
                            <div>{userData.data.userId.details.mobile}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.website && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">
                              {t("Website of Linkedin")}
                            </div>
                            <div>{userData.data.userId.details.website}</div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.locationData && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Location")}</div>
                            <div>
                              {userData.data.userId.details.locationData}
                            </div>
                          </div>
                        </Col>
                      )}

                      {userData.data.userId.details.birthDate && (
                        <Col lg={6} md={6} sm={12}>
                          <div className="field-container">
                            <div className="bold-text">{t("Birth Date")}</div>
                            <div>
                              {moment(
                                userData.data.userId.details.birthDate
                              ).format("DD.MM.YYYY")}
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Form>
          {userData.data.userId.businessTags && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Business Tags")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.businessTags.industry && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Industry")}</div>
                        <div>
                          {userData.data.userId.businessTags.industry &&
                            userData.data.userId.businessTags.industry.length &&
                            userData.data.userId.businessTags.industry
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessTags.services && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("Sevices / products you offer")}
                        </div>
                        <div>
                          {userData.data.userId.businessTags.services &&
                            userData.data.userId.businessTags.services.length &&
                            userData.data.userId.businessTags.services
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessTags.technology && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Technologies")}</div>
                        <div>
                          {" "}
                          {userData.data.userId.businessTags.technology &&
                            userData.data.userId.businessTags.technology
                              .length &&
                            userData.data.userId.businessTags.technology
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessTags.businessModel && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Business Model")}</div>
                        <div>
                          {userData.data.userId.businessTags.businessModel &&
                            userData.data.userId.businessTags.businessModel
                              .length &&
                            userData.data.userId.businessTags.businessModel
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessTags.targetMarket && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Target Market")}</div>
                        <div>
                          {userData.data.userId.businessTags.targetMarket &&
                            userData.data.userId.businessTags.targetMarket
                              .length &&
                            userData.data.userId.businessTags.targetMarket
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessTags.georgraphicalMarket && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("Geographical Market")}
                        </div>
                        <div>
                          {userData.data.userId.businessTags
                            .georgraphicalMarket &&
                            userData.data.userId.businessTags
                              .georgraphicalMarket.length &&
                            userData.data.userId.businessTags.georgraphicalMarket
                              .map((each) => each.name)
                              .join(" , ")}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.businessInformation && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Business Information")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.businessInformation.industry && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Industry")}</div>
                        <div>
                          {userData.data.userId.businessInformation.industry}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessInformation.subIndustry && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Sub Industry")}</div>
                        <div>
                          {userData.data.userId.businessInformation.subIndustry}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessInformation.marketLocation && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("Market/ Locations")}
                        </div>
                        <div>
                          {
                            userData.data.userId.businessInformation
                              .marketLocation
                          }
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessInformation.businessModel && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Business Model")}</div>
                        <div>
                          {
                            userData.data.userId.businessInformation
                              .businessModel
                          }
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessInformation.marketSegment && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Market Segment")}</div>
                        <div>
                          {
                            userData.data.userId.businessInformation
                              .marketSegment
                          }
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.businessInformation.topCustomers && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Top Customers")}</div>
                        <div>
                          {
                            userData.data.userId.businessInformation
                              .topCustomers
                          }
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.humanCapital && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Human Capital")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.humanCapital.size && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Size")}</div>
                        <div>{userData.data.userId.humanCapital.size}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.humanCapital.founders && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Founders")}</div>
                        <div>{userData.data.userId.humanCapital.founders}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.humanCapital.departments && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Departments")}</div>
                        <div>
                          {userData.data.userId.humanCapital.departments}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.financials && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Financials")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.financials.revenue && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Revenue")}</div>
                        <div>{userData.data.userId.financials.revenue}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.financials.cost && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Cost")}</div>
                        <div>{userData.data.userId.financials.cost}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.financials.EBTIDA && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("EBTIDA")}</div>
                        <div>{userData.data.userId.financials.EBTIDA}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.financials.operational && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Operational")}</div>
                        <div>{userData.data.userId.financials.operational}</div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.funding && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Funding")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.funding.rounds && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Rounds")}</div>
                        <div>{userData.data.userId.funding.rounds}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.funding.investors && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Investors")}</div>
                        <div>{userData.data.userId.funding.investors}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.funding.equityStructure && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Equity Structure")}</div>
                        <div>
                          {userData.data.userId.funding.equityStructure}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.technology && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Technology")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.technology.frontEnd && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("FrontEnd")}</div>
                        <div>{userData.data.userId.technology.frontEnd}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.technology.backEnd && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("BackEnd")}</div>
                        <div>{userData.data.userId.technology.backEnd}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.technology.other && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Other")}</div>
                        <div>{userData.data.userId.technology.other}</div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.marketing && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Marketing")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.marketing.socialLinks && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Social links")}</div>
                        <div>{userData.data.userId.marketing.socialLinks}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.marketing.numberOfLikes && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Number of likes")}</div>
                        <div>
                          {userData.data.userId.marketing.numberOfLikes}
                        </div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.marketing.reactions && (
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Reactions")}</div>
                        <div>{userData.data.userId.marketing.reactions}</div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          {userData.data.userId.operations && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("Operations")}</div>
                </Col>
              </Row>
              {userData.data.userId.operations.topKPIs && (
                <div className="info-container">
                  <Row style={{ marginTop: 20 }}>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Top KPIs")}</div>
                        <div>{userData.data.userId.operations.topKPIs}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Form>
          )}
          {userData.data.userId.M_A && (
            <Form className="box-container">
              <Row>
                <Col className="header-container">
                  <div className="header-text">{t("M&A")}</div>
                </Col>
              </Row>
              <div className="info-container">
                <Row style={{ marginTop: 20 }}>
                  {userData.data.userId.M_A.ans1 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q1")}</div>
                        <div>{userData.data.userId.M_A.ans1}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.M_A.ans2 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q2")}</div>
                        <div>{userData.data.userId.M_A.ans2}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.M_A.ans3 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q3")}</div>
                        <div>{userData.data.userId.M_A.ans3}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.M_A.ans4 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q4")}</div>
                        <div>{userData.data.userId.M_A.ans4}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.M_A.ans5 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q5")}</div>
                        <div>{userData.data.userId.M_A.ans5}</div>
                      </div>
                    </Col>
                  )}
                  {userData.data.userId.M_A.ans6 && (
                    <Col lg={12} md={12} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("M&A_Q6")}</div>
                        <div>{userData.data.userId.M_A.ans6}</div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Form>
          )}
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Consulting")}</div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <Switch
                  variant="primary"
                  label={t("Consulting_description")}
                  checked={userData.data.userId.consulting}
                  onChange={() => {}}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  ) : null;
};

export default UserProfileView;
