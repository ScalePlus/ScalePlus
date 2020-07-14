import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAttachedUsersAction } from "../../allUsers/action";
import { Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";

function Users({ t, history }) {
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters) => dispatch(getAttachedUsersAction(filters)),
    [dispatch]
  );

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });

  const [filters, setFilters] = useState({});
  const [attachedUsers, setAttachedUsers] = useState(null);

  useEffect(() => {
    getAttachedUsers(filters);
  }, [getAttachedUsers, filters]);

  useEffect(() => {
    const { attachedUsers } = attachedUsersReducer;
    if (attachedUsers && attachedUsers.result) {
      if (attachedUsers.result.length) {
        setAttachedUsers(attachedUsers.result);
      } else {
        setAttachedUsers([]);
      }
    }
  }, [attachedUsersReducer]);

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
                {/* <div className="filter-count">
                  <span className="count-text">{2}</span>
                </div> */}
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

      {attachedUsers && attachedUsers.length ? (
        <div className="list-container">
          {attachedUsers.map((each, index) => {
            return (
              <div
                className="block"
                key={index}
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div>
                  <div className="basic-information">
                    <div className="user-name">
                      {each.data.userId.details && each.data.userId.details.name
                        ? each.data.userId.details.name
                        : each.data.userId.email}
                    </div>
                    <div className="user-role">{each.data.userId.roles[0]}</div>
                  </div>
                  <div className="challenge-name">{each.challengeTitle}</div>
                </div>
                <div>
                  <div className="status-container"> {each.data.status}</div>
                  <div> {moment(each.data.date).format("DD.MM.YYYY")}</div>
                </div>
              </div>
            );
          })}
          {attachedUsers.length > 10 ? (
            <div className="pagination">
              1 of 2 <span className="next-page">{">"}</span>{" "}
              <span>{">>"}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </MainContainer>
  );
}

export default Users;
