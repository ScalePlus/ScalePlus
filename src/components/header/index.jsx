import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Cookies from "universal-cookie";
import {
  Navbar,
  Nav,
  //  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getActivitiesAction } from "../allActivities/action";
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

  const activitiesReducer = useSelector((state) => {
    return state.activitiesReducer;
  });

  const [activities, setActivities] = useState(null);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  useEffect(() => {
    const { activities } = activitiesReducer;
    if (activities && activities.result) {
      if (activities.result.length && activities.result.length <= 5) {
        setActivities(activities.result);
      } else if (activities.result.length && activities.result.length > 5) {
        setActivities(activities.result.slice(0, 5));
      } else {
        setActivities([]);
      }
    }
  }, [activitiesReducer]);

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
              <Dropdown>
                <Dropdown.Toggle
                  as={React.forwardRef(({ onClick }, ref) => (
                    <div
                      className="notification-container"
                      onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
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
                      <div className="notification-circle"></div>
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
                          <HeaderPart />

                          {React.Children.toArray(children).filter(
                            (child) => child.props.children
                          )}
                        </div>
                      );
                    }
                  )}
                >
                  {activities && activities.length
                    ? activities.map((each, index) => {
                        return (
                          <Dropdown.Item key={index} eventKey={index}>
                            <ContentPart
                              mainText={
                                each.challengeId &&
                                each.challengeId.descriptionId &&
                                each.challengeId.descriptionId.title
                              }
                              userName={
                                each.userId.details && each.userId.details.name
                                  ? each.userId.details.name
                                  : each.userId.email
                              }
                              imageURL={
                                each.userId.details
                                  ? each.userId.details.logo
                                    ? each.userId.details.logo
                                    : each.userId.details.personal_photo
                                    ? each.userId.details.personal_photo
                                    : ""
                                  : ""
                              }
                              subText={each.type}
                              timestamp={moment(each.createdDate).fromNow()}
                            />
                          </Dropdown.Item>
                        );
                      })
                    : null}
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
            //       localStorage.clear();
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
          localStorage.clear();
          history.push("/");
        }}
      />
    </Container>
  );
};

export default Header;
