import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Cookies from "universal-cookie";
import {
  Navbar,
  Nav,
  //  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesAction, markReadAction } from "../allActivities/action";
import { logoutAction } from "../signin/action";
import { Container } from "./style";
import history from "../../history";
import SearchModal from "./subComponents/searchModal";
import UserSidebar from "../userSidebar";
import { HeaderPart, ContentPart } from "./subComponents/notifications";
import { Constants } from "../../lib/constant";
import { Switch } from "../common";
import theme from "../../theme";

const cookies = new Cookies();

const Header = ({ t }) => {
  const dispatch = useDispatch();
  const getActivities = useCallback(
    () => dispatch(getActivitiesAction("", "")),
    [dispatch]
  );
  const markRead = () => dispatch(markReadAction());
  const logout = () => dispatch(logoutAction());

  const activitiesReducer = useSelector((state) => {
    return state.activitiesReducer;
  });

  const [activities, setActivities] = useState(null);
  const [showDropdown, toggleDropdown] = useState(false);

  useEffect(() => {
    let socket = io(Constants.SOCKET_BASE_URL);

    socket.on("connect", () => {
      console.log("connected to server");
      if (localStorage.getItem("userId")) {
        socket.emit("userId", localStorage.getItem("userId"));
      }
    });

    socket.on("activitiesUpdate", () => {
      getActivities();
    });
  }, [getActivities]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getActivities();
    }
  }, [getActivities]);

  useEffect(() => {
    const { activities, success } = activitiesReducer;
    if (success) {
      getActivities();
    }
    if (activities && activities.result) {
      let result = Object.assign([], activities.result);
      result = result.filter(
        (each) =>
          each.belongs_to.toString() ===
            localStorage.getItem("userId").toString() && !each.mark_read
      );

      if (result.length && result.length <= 5) {
        setActivities(result);
      } else if (result.length && result.length > 5) {
        setActivities(result.slice(0, 5));
      } else {
        setActivities([]);
      }
    }
  }, [activitiesReducer, getActivities]);

  const is_admin = localStorage.getItem("userRole") === Constants.ROLES.ADMIN,
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_logged_in = localStorage.getItem("token");

  const [links] = useState(
    is_logged_in
      ? is_admin
        ? [{ label: t("DASHBOARD"), link: "/dashboard" }]
        : is_organisation
        ? [
            { label: t("ALL CHALLENGES"), link: "/all/challenges" },
            { label: t("HOW IT WORKS"), link: "/workflow" },
            { label: t("LAUNCH CHALLENGE"), link: "/create/challenge" },
            { label: t("DASHBOARD"), link: "/dashboard" },
          ]
        : [
            { label: t("ALL CHALLENGES"), link: "/all/challenges" },
            { label: t("HOW IT WORKS"), link: "/workflow" },
            { label: t("DASHBOARD"), link: "/dashboard" },
          ]
      : [
          { label: t("ALL CHALLENGES"), link: "/all/challenges" },
          { label: t("HOW IT WORKS"), link: "/workflow" },
          { label: t("LAUNCH CHALLENGE"), link: "/create/challenge" },
        ]
  );
  const [activeKey, selectKey] = useState(
    links.find((each) => {
      return history.location.pathname === each.link;
    })
      ? links.find((each) => {
          return history.location.pathname === each.link;
        }).label
      : ""
  );
  const [expanded, onToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  history.listen((location, action) => {
    let record = links.find((each) => {
      return location.pathname === each.link;
    });

    if (record && activeKey !== record.label) {
      selectKey(record ? record.label : "");
    } else {
      selectKey("");
    }
  });

  return (
    <Container>
      <Navbar
        bg="light"
        expand="lg"
        onToggle={() => {
          onToggle(!expanded);
        }}
        expanded={expanded}
      >
        <Navbar.Brand href="/home">
          <img src={"/images/scaleplus-logo.png"} alt=""></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={activeKey} className="mr-auto">
            {links.map((each, index) => {
              return (
                <Nav.Item
                  key={index}
                  onClick={() => {
                    onToggle(false);
                    history.push(each.link);
                    selectKey(each.label);
                  }}
                >
                  <Nav.Link eventKey={each.label}>{each.label}</Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>

          <div className="switch-container">
            <div className={"left-text"}>
              <span>{t(theme.isRTL ? "EN" : "AR")}</span>
            </div>
            <div>
              <Switch
                variant="primary"
                label=""
                checked={true}
                onChange={() => {
                  if (theme.isRTL) {
                    cookies.set("language", "en", { path: "/" });
                    document.location.reload();
                  } else {
                    cookies.set("language", "ar", { path: "/" });
                    document.location.reload();
                  }
                }}
              ></Switch>
            </div>
            <div className={"right-text"}>
              <span>{t(theme.isRTL ? "AR" : "EN")}</span>
            </div>
          </div>

          {localStorage.getItem("token") && (
            <div>
              <Dropdown show={showDropdown}>
                <Dropdown.Toggle
                  as={React.forwardRef(({ onClick }, ref) => (
                    <div
                      className="notification-container"
                      ref={ref}
                      onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
                        toggleDropdown(!showDropdown);
                      }}
                    >
                      <div className="bell-img">
                        <Navbar.Text>
                          <img
                            src={"/images/bell.png"}
                            height="30px"
                            width="30px"
                            alt=""
                          ></img>
                        </Navbar.Text>
                      </div>

                      <div
                        className="notification-circle"
                        style={{
                          background:
                            activities &&
                            activities.length &&
                            activities.find((each) => !each.mark_read)
                              ? theme.colors.yellow
                              : "transparent",
                        }}
                      ></div>
                    </div>
                  ))}
                  id="notification-menu"
                ></Dropdown.Toggle>

                <Dropdown.Menu
                  className="notification-menu"
                  as={React.forwardRef(
                    (
                      {
                        children,
                        style,
                        className,
                        "aria-labelledby": labeledBy,
                      },
                      ref
                    ) => {
                      return (
                        <div
                          ref={ref}
                          style={style}
                          className={className}
                          aria-labelledby={labeledBy}
                        >
                          <HeaderPart
                            markReadClick={() => {
                              markRead();
                              toggleDropdown(!showDropdown);
                            }}
                          />

                          {React.Children.toArray(children).filter(
                            (child) => child.props.children
                          )}
                        </div>
                      );
                    }
                  )}
                >
                  {activities && activities.length ? (
                    activities.map((each, index) => {
                      return (
                        <Dropdown.Item key={index} eventKey={index}>
                          <ContentPart
                            mainText={
                              each.challengeId &&
                              each.challengeId.descriptionId &&
                              each.challengeId.descriptionId.title
                            }
                            userName={
                              each.userId
                                ? each.userId.details &&
                                  each.userId.details.name
                                  ? each.userId.details.name
                                  : each.userId.firstName &&
                                    each.userId.lastName
                                  ? each.userId.firstName +
                                    " " +
                                    each.userId.lastName
                                  : each.userId.email
                                : null
                            }
                            imageURL={
                              each.userId
                                ? each.userId.details
                                  ? each.userId.details.logo
                                    ? each.userId.details.logo
                                    : each.userId.details.personal_photo
                                    ? each.userId.details.personal_photo
                                    : ""
                                  : ""
                                : ""
                            }
                            subText={each.type}
                            timestamp={moment(each.createdDate).fromNow()}
                          />
                        </Dropdown.Item>
                      );
                    })
                  ) : (
                    <Dropdown.Item eventKey={1}>
                      <div className="no-notification">
                        {t("no_notification")}
                      </div>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          <div className="search-img">
            <Navbar.Text
              onClick={() => {
                setShow(true);
              }}
            >
              <img
                src={"/images/search.png"}
                height="25px"
                width="25px"
                alt=""
              ></img>
              <span className="search-text">{t("Search")}</span>
            </Navbar.Text>
          </div>
          <div className="action-container">
            {localStorage.getItem("token") ? (
              <span
                onClick={() => {
                  setShowSidebar(true);
                  onToggle(false);
                }}
              >
                {t("Account")}
              </span>
            ) : // <NavDropdown title={t("Account")}>
            //   <NavDropdown.Item
            //     onClick={() => {
            //       history.push("/detail");
            //       onToggle(false);
            //     }}
            //   >
            //     {t("Update Profile")}
            //   </NavDropdown.Item>
            //   <NavDropdown.Item
            //     href="/"
            //     onClick={() => {
            //       logout();
            //       onToggle(false);
            //     }}
            //   >
            //     {t("Logout")}
            //   </NavDropdown.Item>
            // </NavDropdown>
            history.location.pathname.includes("login") ? (
              <span
                onClick={() => {
                  history.push("/register");
                  onToggle(false);
                }}
              >
                {t("Sign up")}
              </span>
            ) : (
              <span
                onClick={() => {
                  history.push("/login");
                  onToggle(false);
                }}
              >
                {t("Sign in")}
              </span>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
      <SearchModal show={show} setShow={setShow} />
      <UserSidebar
        show={showSidebar}
        setShow={setShowSidebar}
        profileClick={() => {
          setShowSidebar(false);
          history.push("/profile/edit");
        }}
        onLogout={() => {
          setShowSidebar(false);
          logout();
        }}
      />
    </Container>
  );
};

export default Header;
