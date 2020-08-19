import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesAction } from "../../allActivities/action";
import { Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";
import { Constants } from "../../../lib/constant";

function Activities({ t, history, challengeId }) {
  const dispatch = useDispatch();
  const getActivities = useCallback(
    (filters, searchText) =>
      dispatch(getActivitiesAction(filters, searchText, challengeId)),
    [dispatch, challengeId]
  );

  const activitiesReducer = useSelector((state) => {
    return state.activitiesReducer;
  });
  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const [filters, setFilters] = useState("");
  const [activities, setActivities] = useState(null);
  const [visibleData, setVisibleData] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [renderPage, setRenderPage] = useState(null);
  const searchText = "",
    limit = 10;
  const is_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token");

  useEffect(() => {
    getActivities(filters, searchText);
  }, [getActivities, filters, searchText]);

  useEffect(() => {
    if (activities && activities.length) {
      setVisibleData(
        activities.slice((renderPage - 1) * limit, renderPage * limit)
      );
    }
  }, [renderPage, totalPage, activities]);

  useEffect(() => {
    const { activities } = activitiesReducer;
    const { allChallenges } = allChallengesReducer;
    if (activities && activities.result) {
      if (
        allChallenges &&
        allChallenges.result &&
        allChallenges.result.data &&
        allChallenges.result.data.length &&
        is_admin
      ) {
        let list = Object.assign([], activities.result);

        list = list.filter((each) => {
          if (each.challengeId && each.challengeId._id) {
            const index = allChallenges.result.data.findIndex(
              (data) => data._id.toString() === each.challengeId._id.toString()
            );
            if (index >= 0) {
              return each;
            } else {
              return null;
            }
          } else {
            return each;
          }
        });

        let length = list.length;
        if (allChallenges.result.data.length && length) {
          setTotalPage(Math.ceil(length / limit));
          setRenderPage(1);
          setActivities(list);
        } else {
          setActivities([]);
          setVisibleData([]);
        }
      } else if (activities.result.length) {
        let length = activities.result.length;
        setTotalPage(Math.ceil(length / limit));
        setRenderPage(1);
        setActivities(activities.result);
      } else {
        setActivities([]);
        setVisibleData([]);
      }
    }
  }, [activitiesReducer, allChallengesReducer, is_admin]);

  return (
    <MainContainer>
      <div className="header-container">
        <div className="left-block">
          <div className="users-text">
            {t("Activities")} {activities && activities.length}
          </div>
          {activities && activities.length ? (
            <div
              className="view-text"
              onClick={() => {
                history.push(
                  `/activities${
                    challengeId ? `?challengeId=${challengeId}` : ""
                  }`
                );
              }}
            >
              {t("View All")}
            </div>
          ) : null}
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
            <Dropdown.Menu alignRight={true} className="activities-filter-menu">
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
              {/* <Dropdown.Item
                eventKey={9}
               
              >
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
            <Dropdown.Menu alignRight={true} className="activities-filter-menu">
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
      {visibleData && visibleData.length ? (
        <div className="list-container">
          {visibleData.map((each, index) => {
            return (
              <div
                className="block"
                key={index}
                onClick={() => {
                  if (each.submissionId && (is_admin || is_organisation)) {
                    history.push(
                      `/challenge/${each.challengeId._id}/preview/Submissions?submissionId=${each.submissionId}`
                    );
                  } else if (each && each.userId && each.userId._id) {
                    if (is_admin || is_organisation) {
                      if (
                        each.userId._id.toString() !==
                        localStorage.getItem("userId")
                      ) {
                        history.push(`/profile/view/${each.userId._id}`);
                      } else if (
                        each.userId._id.toString() ===
                        localStorage.getItem("userId")
                      ) {
                        history.push(`/profile/edit`);
                      }
                    } else if (each.challengeId && each.challengeId._id) {
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
                        ? each.userId.details && each.userId.details.name
                          ? each.userId.details.name
                          : each.userId.firstName && each.userId.lastName
                          ? each.userId.firstName + " " + each.userId.lastName
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
                          : each.status === Constants.USER_STATUS.Joined ||
                            each.status === Constants.USER_STATUS.Submitted ||
                            each.status === Constants.USER_STATUS.Accepeted ||
                            each.status === Constants.USER_STATUS.Approved ||
                            each.status === Constants.USER_STATUS.Created
                          ? {
                              backgroundColor: "#e0f9ea",
                              color: "#66e397",
                              borderColor: "#66e397",
                            }
                          : each.status === Constants.USER_STATUS.Declined ||
                            each.status ===
                              Constants.USER_STATUS.Disqualified ||
                            each.status === Constants.USER_STATUS.Canceled ||
                            each.status === Constants.USER_STATUS.Deleted
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
                  <div>{moment(each.createdDate).format("DD.MM.YYYY")}</div>
                </div>
              </div>
            );
          })}
          <div className="pagination">
            {renderPage > 1 && (
              <span
                className="first-page"
                onClick={() => {
                  setRenderPage(1);
                }}
              >
                {"<<"}
              </span>
            )}
            {renderPage > 1 && (
              <span
                className="previous-page"
                onClick={() => {
                  const previousPage = renderPage - 1;
                  if (previousPage >= 1) {
                    setRenderPage(previousPage);
                  }
                }}
              >
                {"<"}
              </span>
            )}

            <span>{renderPage}</span>
            <span className="of-text">{t("of")}</span>
            <span>{totalPage}</span>

            {renderPage !== totalPage && (
              <span
                className="next-page"
                onClick={() => {
                  const nextpage = renderPage + 1;
                  if (nextpage <= totalPage) {
                    setRenderPage(nextpage);
                  }
                }}
              >
                {">"}
              </span>
            )}
            {renderPage !== totalPage && (
              <span
                className="last-page"
                onClick={() => setRenderPage(totalPage)}
              >
                {">>"}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </MainContainer>
  );
}

export default Activities;
