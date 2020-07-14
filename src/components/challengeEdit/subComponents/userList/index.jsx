import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAttachedUsersAction } from "../../../allUsers/action";
import { Row, Col, Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { InfoBlock } from "../common";
import { Switch } from "../../../common";
import UserInviteModal from "./inviteModal";

const UserList = ({ t, history, activeKey, challengeId }) => {
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters) => dispatch(getAttachedUsersAction(filters)),
    [dispatch]
  );

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });

  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({ challengeId: challengeId });
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
          <Switch variant="primary" label={t("Enable users tab")}></Switch>
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
                  <div className="filter-count">
                    <span className="count-text">{2}</span>
                  </div>
                </div>
              ))}
            ></Dropdown.Toggle>
            <Dropdown.Menu alignRight={true} className="user-filter-menu">
              {activeKey.value === "Admins" && (
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

              {(activeKey.value === "Startups" ||
                activeKey.value === "Individuals" ||
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
                    if (activeKey.value === "Startups") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "startups_invited",
                      });
                    }
                    if (activeKey.value === "Individuals") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "individuals_invited",
                      });
                    }
                  }}
                >
                  {t("Invited")}
                </Dropdown.Item>
              )}

              {(activeKey.value === "Admins" ||
                activeKey.value === "Judges") && (
                <Dropdown.Item
                  eventKey={3}
                  onClick={() => {
                    if (activeKey.value === "Admins") {
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

              {(activeKey.value === "Startups" ||
                activeKey.value === "Individuals") && (
                <Dropdown.Item
                  eventKey={4}
                  onClick={() => {
                    if (activeKey.value === "Startups") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "startups_submitted",
                      });
                    }
                    if (activeKey.value === "Individuals") {
                      setFilters({
                        challengeId: challengeId,
                        filter: "individuals_submitted",
                      });
                    }
                  }}
                >
                  {t("Submitted Application")}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {attachedUsers && attachedUsers.length
          ? attachedUsers.map((each, index) => {
              return (
                <Col lg={6} md={6} xs={12} key={index}>
                  <div
                    className="list-single-block"
                    onClick={() => {
                      history.push("/profile/view/123");
                    }}
                  >
                    <div className="avtar-container">
                      {each.data.userId.details &&
                      each.data.userId.details.logo ? (
                        <img
                          src={each.data.userId.details.logo}
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
                      )}
                    </div>
                    <div className="user-info-container">
                      <div className="basic-information">
                        <div>
                          <div className="user-name">
                            {each.data.userId.details &&
                            each.data.userId.details.name
                              ? each.data.userId.details.name
                              : each.data.userId.email}
                          </div>
                          <div className="user-role">
                            {each.data.userId.roles[0]}
                          </div>
                        </div>
                        <div>
                          <div className="challenge-name">
                            {each.challengeTitle}
                          </div>
                          <span className="status-container">
                            {each.data.status}
                          </span>
                        </div>
                        <div className="timestamp">
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
