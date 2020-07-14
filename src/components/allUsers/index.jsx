import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAttachedUsersAction } from "./action";
import { MainContainer } from "./style";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Input, Loading } from "../common";

const AllUsers = ({ history, from_preview }) => {
  const { t } = useTranslation();
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
      {attachedUsersReducer.loading && <Loading />}
      <Row className="justify-content-center">
        <Col
          lg={from_preview ? 11 : 9}
          md={from_preview ? 11 : 10}
          sm={from_preview ? 11 : 12}
        >
          <Row>
            <Col>
              <div className="title-container">
                <div
                  className="title"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  {from_preview ? t("Users") : t("< All Users")}
                </div>
                <div className="right-container">
                  {!from_preview && (
                    <div className="input-container">
                      <Input placeholder="Search" type="text" />
                    </div>
                  )}
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
                    <Dropdown.Menu
                      alignRight={true}
                      className="user-filter-menu"
                    >
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
                          setFilters({
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
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
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
        </Col>
      </Row>
    </MainContainer>
  );
};

export default AllUsers;
