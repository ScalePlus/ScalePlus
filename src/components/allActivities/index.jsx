import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesAction } from "./action";
import { MainContainer } from "./style";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Input } from "../common";
import { Constants } from "../../lib/constant";

const AllActivities = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getActivities = useCallback(
    (filters, searchText, challengeId) =>
      dispatch(getActivitiesAction(filters, searchText, challengeId)),
    [dispatch]
  );

  const activitiesReducer = useSelector((state) => {
    return state.activitiesReducer;
  });

  const [filters, setFilters] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activities, setActivities] = useState(null);
  const [challengeId, setChallengeId] = useState(null);

  const is_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token");

  useEffect(() => {
    const QS = queryString.parse(window.location.search);
    if (QS && QS.challengeId) {
      setChallengeId(QS.challengeId);
    }
  }, []);

  useEffect(() => {
    getActivities(filters, searchText, challengeId);
  }, [getActivities, filters, searchText, challengeId]);

  useEffect(() => {
    const { activities } = activitiesReducer;
    if (activities && activities.result) {
      if (activities.result.length) {
        setActivities(activities.result);
      } else {
        setActivities([]);
      }
    }
  }, [activitiesReducer]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={12}>
          <Row>
            <Col>
              <div className="title-container">
                <div
                  className="title"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  {t("< All Activities")}
                </div>
                <div className="right-container">
                  <div className="input-container">
                    <Input
                      placeholder="Search"
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>

                  <Dropdown>
                    <Dropdown.Toggle
                      as={React.forwardRef(({ children, onClick }, ref) => (
                        <div
                          className="filter-button-container"
                          onClick={(e) => {
                            e.preventDefault();
                            onClick(e);
                          }}
                          ref={ref}
                        >
                          <div>
                            <img
                              src={"/images/filter-icon.png"}
                              height="20px"
                              width="20px"
                              alt=""
                            ></img>
                          </div>
                          <div className="filter-text">
                            <span>{t("Filters")}</span>
                          </div>
                        </div>
                      ))}
                    ></Dropdown.Toggle>
                    {is_organisation || is_admin ? (
                      <Dropdown.Menu
                        alignRight={true}
                        className="activities-filter-menu"
                      >
                        <Dropdown.Item
                          eventKey={1}
                          onClick={() => {
                            setFilters("all");
                          }}
                        >
                          {t("All Activities")}
                        </Dropdown.Item>
                        <div className="title-block">
                          <span>{t("By Admin")}</span>
                        </div>
                        <Dropdown.Item
                          eventKey={2}
                          onClick={() => {
                            setFilters("application_approvals");
                          }}
                        >
                          {t("Application Approvals")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={3}
                          onClick={() => {
                            setFilters("application_declines");
                          }}
                        >
                          {t("Application declines")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={4}
                          onClick={() => {
                            setFilters("application_reviews");
                          }}
                        >
                          {t("All Reviews")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={5}
                          onClick={() => {
                            setFilters("all_submissions");
                          }}
                        >
                          {t("All Submissions")}
                        </Dropdown.Item>
                        <div className="title-block">
                          <span>{t("By Startup/Individual")}</span>
                        </div>
                        {/* <Dropdown.Item eventKey={6}>
                          {t("Submitted Application")}
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          eventKey={7}
                          onClick={() => {
                            setFilters("startup_individual_participants");
                          }}
                        >
                          {t("Participants")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={8}
                          onClick={() => {
                            setFilters("submitted_application");
                          }}
                        >
                          {t("Submissions")}
                        </Dropdown.Item>
                        <div className="title-block">
                          <span>{t("By Judge")}</span>
                        </div>
                        {/* <Dropdown.Item eventKey={9}>
                          {t("Judged Application")}
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          eventKey={10}
                          onClick={() => {
                            setFilters("judge_participants");
                          }}
                        >
                          {t("Participants")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={11}
                          onClick={() => {
                            setFilters("judged_application");
                          }}
                        >
                          {t("All Reviews")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    ) : (
                      <Dropdown.Menu
                        alignRight={true}
                        className="activities-filter-menu"
                      >
                        <Dropdown.Item
                          eventKey={1}
                          onClick={() => {
                            setFilters("all");
                          }}
                        >
                          {t("All Activities")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={1}
                          onClick={() => {
                            setFilters("my");
                          }}
                        >
                          {t("My Activities")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={1}
                          onClick={() => {
                            setFilters("other");
                          }}
                        >
                          {t("Other Activities")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
          <div className="list-container">
            <Row>
              {activities && activities.length
                ? activities.map((each, index) => {
                    return (
                      <Col lg={6} md={6} sm={12} key={index}>
                        <div
                          className="block"
                          onClick={() => {
                            if (
                              each.submissionId &&
                              (is_admin || is_organisation)
                            ) {
                              history.push(
                                `/challenge/${each.challengeId._id}/preview/Submissions?submissionId=${each.submissionId}`
                              );
                            } else if (each && each.userId && each.userId._id) {
                              if (is_admin || is_organisation) {
                                if (
                                  each.userId._id.toString() !==
                                  localStorage.getItem("userId")
                                ) {
                                  history.push(
                                    `/profile/view/${each.userId._id}`
                                  );
                                } else if (
                                  each.userId._id.toString() ===
                                  localStorage.getItem("userId")
                                ) {
                                  history.push(
                                    `/profile/edit/${localStorage.getItem(
                                      "userId"
                                    )}`
                                  );
                                }
                              } else if (
                                each.challengeId &&
                                each.challengeId._id
                              ) {
                                history.push(
                                  `/challenge/${each.challengeId._id}/preview/Overview`
                                );
                              }
                            }
                          }}
                        >
                          <div>
                            {each.challengeId &&
                              each.challengeId.descriptionId &&
                              each.challengeId.descriptionId.title && (
                                <div className="challenge-name">
                                  {each.challengeId.descriptionId.title}
                                </div>
                              )}
                            <div className="basic-information">
                              <div className="user-name">
                                {each.userId
                                  ? each.userId.details &&
                                    each.userId.details.name
                                    ? each.userId.details.name
                                    : each.userId.firstName &&
                                      each.userId.lastName
                                    ? each.userId.firstName +
                                      " " +
                                      each.userId.lastName
                                    : each.userId.email
                                  : null}
                              </div>
                              <div>{each.type}</div>
                            </div>
                          </div>
                          <div>
                            {each && each.status && (
                              <div
                                className="status-container"
                                style={
                                  each.status === Constants.USER_STATUS.Invited
                                    ? {
                                        backgroundColor: "#fdf1ce",
                                        color: "#f4ba09",
                                        borderColor: "#f4ba09",
                                      }
                                    : each.status ===
                                        Constants.USER_STATUS.Joined ||
                                      each.status ===
                                        Constants.USER_STATUS.Submitted ||
                                      each.status ===
                                        Constants.USER_STATUS.Accepeted ||
                                      each.status ===
                                        Constants.USER_STATUS.Approved ||
                                      each.status ===
                                        Constants.USER_STATUS.Created ||
                                      each.status ===
                                        Constants.USER_STATUS.Challenge_Update
                                    ? {
                                        backgroundColor: "#e0f9ea",
                                        color: "#66e397",
                                        borderColor: "#66e397",
                                      }
                                    : each.status ===
                                        Constants.USER_STATUS.Declined ||
                                      each.status ===
                                        Constants.USER_STATUS.Disqualified ||
                                      each.status ===
                                        Constants.USER_STATUS.Canceled ||
                                      each.status ===
                                        Constants.USER_STATUS.Deleted
                                    ? {
                                        backgroundColor: "#fce7e7",
                                        color: "#f18989",
                                        borderColor: "#f18989",
                                      }
                                    : {}
                                }
                              >
                                {each.status}
                              </div>
                            )}
                            <div>
                              {moment(each.createdDate).format("DD.MM.YYYY")}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default AllActivities;
