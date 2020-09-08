import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAttachedUsersAction } from "../../../allUsers/action";
import { Row, Col, Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { InfoBlock } from "../common";
// import { Switch } from "../../../common";
import UserInviteModal from "./inviteModal";
import { Constants } from "../../../../lib/constant";

const UserList = ({ t, history, activeKey, challengeId }) => {
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters, searchText) =>
      dispatch(getAttachedUsersAction(filters, searchText)),
    [dispatch]
  );

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });

  const challengeJudgesReducer = useSelector((state) => {
    return state.challengeJudgesReducer;
  });
  const challengeTeamReducer = useSelector((state) => {
    return state.challengeTeamReducer;
  });
  const challengeInviteParticipantsReducer = useSelector((state) => {
    return state.challengeInviteParticipantsReducer;
  });

  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({ challengeId: challengeId });
  const [attachedUsers, setAttachedUsers] = useState(null);
  const searchText = "";

  // useEffect(() => {
  //   if (activeKey.value === "Team") {
  //     setFilters({ challengeId: challengeId, filter: "all_admin" });
  //   }
  //   if (activeKey.value === "Participants") {
  //     setFilters({
  //       challengeId: challengeId,
  //       filter: "all_startup_individual",
  //     });
  //   }
  //   if (activeKey.value === "Judges") {
  //     setFilters({ challengeId: challengeId, filter: "all_judge" });
  //   }
  // }, [activeKey, challengeId]);

  useEffect(() => {
    if (challengeJudgesReducer && challengeJudgesReducer.success) {
      getAttachedUsers(filters, searchText);
    }

    if (challengeTeamReducer && challengeTeamReducer.success) {
      getAttachedUsers(filters, searchText);
    }

    if (
      challengeInviteParticipantsReducer &&
      challengeInviteParticipantsReducer.success
    ) {
      getAttachedUsers(filters, searchText);
    }
  }, [
    challengeJudgesReducer,
    challengeTeamReducer,
    challengeInviteParticipantsReducer,
    getAttachedUsers,
    searchText,
    filters,
  ]);

  useEffect(() => {
    getAttachedUsers(filters, searchText);
  }, [getAttachedUsers, filters, searchText]);

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
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("users_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>
      <Row style={{ marginBottom: 25 }}>
        <Col>
          <HeaderComponent
            titleText={activeKey.label}
            infoButtonText={t("Invite User")}
            infoButtonVariant="info"
            infoButtonType="button"
            infoButtonClick={() => {
              setShow(true);
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: 25 }}>
        <Col className="switch-filter-container">
          {/* <Switch variant="primary" label={t("Enable users tab")}></Switch> */}
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
                  setFilters({
                    challengeId: challengeId,
                    filter: "all",
                  });
                }}
              >
                {t("All Users")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item
                eventKey={2}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "all_admin",
                  });
                }}
              >
                {t("All Admins")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={3}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "admin_invited",
                  });
                }}
              >
                {t("Admin Invites")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={4}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "admin_joined",
                  });
                }}
              >
                {t("Joined")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item
                eventKey={5}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "all_startup_individual",
                  });
                }}
              >
                {t("Startup/Individual Only")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={6}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "startup_individual_invited",
                  });
                }}
              >
                {t("Invited")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={7}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "startup_individual_submitted",
                  });
                }}
              >
                {t("Submitted Application")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item
                eventKey={8}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "all_judge",
                  });
                }}
              >
                {t("Judge Only")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={9}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "judge_invited",
                  });
                }}
              >
                {t("Invited")}
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={10}
                onClick={() => {
                  setFilters({
                    challengeId: challengeId,
                    filter: "judge_joined",
                  });
                }}
              >
                {t("Joined")}
              </Dropdown.Item>
            </Dropdown.Menu>
            {/* <Dropdown.Menu alignRight={true} className="user-filter-menu">
              {activeKey.value === "Team" && (
                <Dropdown.Item
                  eventKey={1}
                  onClick={() => {
                    setFilters({
                      challengeId: challengeId,
                      filter: "admin_invited",
                    });
                  }}
                >
                  {t("Admin Invites")}
                </Dropdown.Item>
              )}

              {(activeKey.value === "Participants" ||
                activeKey.value === "Judges") && (
                <Dropdown.Item
                  eventKey={2}
                  onClick={() => {
                    if (activeKey.value === "Judges") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "judge_invited",
                      });
                    }
                    if (activeKey.value === "Participants") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "startup_individual_invited",
                      });
                    }
                  }}
                >
                  {t("Invited")}
                </Dropdown.Item>
              )}

              {(activeKey.value === "Team" || activeKey.value === "Judges") && (
                <Dropdown.Item
                  eventKey={3}
                  onClick={() => {
                    if (activeKey.value === "Team") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "admin_joined",
                      });
                    }
                    if (activeKey.value === "Judges") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "judge_joined",
                      });
                    }
                  }}
                >
                  {t("Joined")}
                </Dropdown.Item>
              )}

              {activeKey.value === "Participants" && (
                <Dropdown.Item
                  eventKey={4}
                  onClick={() => {
                    setFilters({
                      challengeId: challengeId,
                      filter: "startup_individual_submitted",
                    });
                  }}
                >
                  {t("Submitted Application")}
                </Dropdown.Item>
              )}
            </Dropdown.Menu> */}
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {attachedUsers && attachedUsers.length
          ? attachedUsers.map((each, index) => {
              return (
                <Col lg={12} md={12} xs={12} key={index}>
                  <div
                    className={`list-single-block ${
                      each &&
                      each.data &&
                      each.data.userId &&
                      each.data.userId.status === Constants.STATUS.INACTIVE
                        ? "disable"
                        : ""
                    }`}
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
                    <div className="avtar-container">
                      {each &&
                      each.data &&
                      each.data.userId &&
                      each.data.userId.details ? (
                        each.data.userId.details.logo ? (
                          <img
                            src={each.data.userId.details.logo}
                            alt=""
                            height={"100%"}
                            width={"100%"}
                            style={{ borderRadius: "50%" }}
                          />
                        ) : each.data.userId.details.personal_photo ? (
                          <img
                            src={each.data.userId.details.personal_photo}
                            alt=""
                            height={"100%"}
                            width={"100%"}
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <img
                            src="/images/image.svg"
                            alt=""
                            height={30}
                            width={30}
                          />
                        )
                      ) : (
                        <img
                          src="/images/image.svg"
                          alt=""
                          height={30}
                          width={30}
                        />
                      )}
                    </div>
                    <div className="user-info-container">
                      <div className="basic-information">
                        <div style={{ flex: 0.5 }}>
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
                                  (role) =>
                                    role === Constants.ROLES.MENTOR_JUDGE
                                )
                              ? "Judge"
                              : each.data.userId.roles.find(
                                  (role) => role === Constants.ROLES.ADMIN
                                )
                              ? "Admin"
                              : each.data.userId.roles.find(
                                  (role) =>
                                    role === Constants.ROLES.ORGANIZATION
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
                        <div style={{ flex: 0.4 }}>
                          {each.challengeId &&
                            each.challengeId.descriptionId && (
                              <div className="challenge-name">
                                {each.challengeId.descriptionId.title}
                              </div>
                            )}
                          {each && each.data && each.data.status && (
                            <span
                              className="status-container"
                              style={
                                each.data.status ===
                                Constants.USER_STATUS.Invited
                                  ? {
                                      backgroundColor: "#fdf1ce",
                                      color: "#f4ba09",
                                      borderColor: "#f4ba09",
                                    }
                                  : each.data.status ===
                                      Constants.USER_STATUS.Joined ||
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
                            </span>
                          )}
                        </div>
                        <div className="timestamp" style={{ flex: 0.1 }}>
                          {moment(each.data.date).format("DD.MM.YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })
          : null}
      </Row>
      <UserInviteModal
        t={t}
        show={show}
        setShow={setShow}
        challengeId={challengeId}
      />
    </MainContainer>
  );
};

export default UserList;
