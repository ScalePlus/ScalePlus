import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Pagination } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { getAttachedUsersAction } from "../../allUsers/action";
import { Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";
import { Constants } from "../../../lib/constant";

function Users({ t, history }) {
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters, searchText) =>
      dispatch(getAttachedUsersAction(filters, searchText)),
    [dispatch]
  );

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });
  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const is_admin =
    localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
    localStorage.getItem("token");

  const [filters, setFilters] = useState({});
  const [attachedUsers, setAttachedUsers] = useState(null);
  const [visibleData, setVisibleData] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [renderPage, setRenderPage] = useState(null);
  const searchText = "",
    limit = 10;

  useEffect(() => {
    getAttachedUsers(filters, searchText);
  }, [getAttachedUsers, filters, searchText]);

  useEffect(() => {
    if (attachedUsers && attachedUsers.length) {
      setVisibleData(
        attachedUsers.slice((renderPage - 1) * limit, renderPage * limit)
      );
    }
  }, [renderPage, totalPage, attachedUsers]);

  useEffect(() => {
    const { attachedUsers } = attachedUsersReducer;
    const { allChallenges } = allChallengesReducer;

    if (attachedUsers && attachedUsers.result) {
      if (
        allChallenges &&
        allChallenges.result &&
        allChallenges.result.data &&
        is_admin
      ) {
        let list = Object.assign([], attachedUsers.result);

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
          setAttachedUsers(list);
        } else {
          setAttachedUsers([]);
          setVisibleData([]);
        }
      } else if (!is_admin && attachedUsers.result.length) {
        let length = attachedUsers.result.length;
        setTotalPage(Math.ceil(length / limit));
        setRenderPage(1);
        setAttachedUsers(attachedUsers.result);
      } else {
        setAttachedUsers([]);
        setVisibleData([]);
      }
    }
  }, [attachedUsersReducer, allChallengesReducer, is_admin]);

  return (
    <MainContainer>
      <div className="header-container">
        <div className="left-block">
          <div className="users-text">
            {t("Users")} {attachedUsers && attachedUsers.length}
          </div>
          {attachedUsers && attachedUsers.length ? (
            <div
              className="view-text"
              onClick={() => {
                history.push("/users");
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
          <Dropdown.Menu alignRight={true} className="user-filter-menu">
            <Dropdown.Item
              eventKey={1}
              onClick={() => {
                setFilters({ filter: "all" });
              }}
            >
              {t("All Users")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item
              eventKey={2}
              onClick={() => {
                setFilters({ filter: "all_admin" });
              }}
            >
              {t("All Admins")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={3}
              onClick={() => {
                setFilters({ filter: "admin_invited" });
              }}
            >
              {t("Admin Invites")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={4}
              onClick={() => {
                setFilters({ filter: "admin_joined" });
              }}
            >
              {t("Joined")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item
              eventKey={5}
              onClick={() => {
                setFilters({ filter: "all_startup_individual" });
              }}
            >
              {t("Startup/Individual Only")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={6}
              onClick={() => {
                setFilters({ filter: "startup_individual_invited" });
              }}
            >
              {t("Invited")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={7}
              onClick={() => {
                setFilters({ filter: "startup_individual_submitted" });
              }}
            >
              {t("Submitted Application")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item
              eventKey={8}
              onClick={() => {
                setFilters({ filter: "all_judge" });
              }}
            >
              {t("Judge Only")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={9}
              onClick={() => {
                setFilters({ filter: "judge_invited" });
              }}
            >
              {t("Invited")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={10}
              onClick={() => {
                setFilters({ filter: "judge_joined" });
              }}
            >
              {t("Joined")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {visibleData && visibleData.length ? (
        <div className="list-container">
          {visibleData.map((each, index) => {
            return (
              <div
                className={`block ${
                  each &&
                  each.data &&
                  each.data.userId &&
                  each.data.userId.status === Constants.STATUS.INACTIVE
                    ? "disable"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  if (
                    each &&
                    each.data &&
                    each.data.userId &&
                    each.data.userId._id &&
                    each.data.userId.status === Constants.STATUS.ACTIVE
                  ) {
                    history.push(`/profile/view/${each.data.userId._id}`);
                  }
                }}
              >
                <div>
                  <div className="basic-information">
                    <div className="user-name">
                      {each && each.data && each.data.userId
                        ? each.data.userId.details &&
                          each.data.userId.details.name
                          ? each.data.userId.details.name
                          : each.data.userId.firstName &&
                            each.data.userId.lastName
                          ? each.data.userId.firstName +
                            " " +
                            each.data.userId.lastName
                          : each.data.userId.email
                        : null}
                    </div>
                    <div className="user-role">
                      {each.data.permission
                        ? each.data.permission
                        : each.data.userId.roles.find(
                            (role) => role === Constants.ROLES.MENTOR_JUDGE
                          )
                        ? "Judge"
                        : each.data.userId.roles.find(
                            (role) => role === Constants.ROLES.ADMIN
                          )
                        ? "Admin"
                        : each.data.userId.roles.find(
                            (role) => role === Constants.ROLES.ORGANIZATION
                          )
                        ? "Organisation"
                        : each.data.userId.roles.find(
                            (role) =>
                              role === Constants.ROLES.STARTUP_INDIVIDUAL
                          ) &&
                          each.data.userId.details &&
                          each.data.userId.details.isIndividual
                        ? "Individual"
                        : each.data.userId.roles.find(
                            (role) =>
                              role === Constants.ROLES.STARTUP_INDIVIDUAL
                          ) &&
                          each.data.userId.details &&
                          each.data.userId.details.isStartUp
                        ? "StartUp"
                        : ""}
                    </div>
                  </div>
                  {each.challengeId && each.challengeId.descriptionId && (
                    <div className="challenge-name">
                      {each.challengeId.descriptionId.title}
                    </div>
                  )}
                </div>
                <div>
                  {each && each.data && each.data.status && (
                    <div
                      className="status-container"
                      style={
                        each.data.status === Constants.USER_STATUS.Invited
                          ? {
                              backgroundColor: "#fdf1ce",
                              color: "#f4ba09",
                              borderColor: "#f4ba09",
                            }
                          : each.data.status === Constants.USER_STATUS.Joined ||
                            each.data.status ===
                              Constants.USER_STATUS.Submitted ||
                            each.data.status ===
                              Constants.USER_STATUS.Accepeted ||
                            each.data.status ===
                              Constants.USER_STATUS.Created ||
                            each.data.status ===
                              Constants.USER_STATUS.Challenge_Update
                          ? {
                              backgroundColor: "#e0f9ea",
                              color: "#66e397",
                              borderColor: "#66e397",
                            }
                          : each.data.status ===
                              Constants.USER_STATUS.Declined ||
                            each.data.status ===
                              Constants.USER_STATUS.Canceled ||
                            each.data.status ===
                              Constants.USER_STATUS.Deleted ||
                            each.data.status ===
                              Constants.USER_STATUS.Disqualified
                          ? {
                              backgroundColor: "#fce7e7",
                              color: "#f18989",
                              borderColor: "#f18989",
                            }
                          : {}
                      }
                    >
                      {each.data.status}
                    </div>
                  )}
                  <div> {moment(each.data.date).format("DD.MM.YYYY")}</div>
                </div>
              </div>
            );
          })}

          <Pagination
            renderPage={renderPage}
            setRenderPage={setRenderPage}
            totalPage={totalPage}
          />
        </div>
      ) : null}
    </MainContainer>
  );
}

export default Users;
