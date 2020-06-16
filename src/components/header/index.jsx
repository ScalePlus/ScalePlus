import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Container } from "./style";
import history from "../../history";
import SearchModal from "./subComponents/searchModal";
import { HeaderPart, ContentPart } from "./subComponents/notifications";
import { Constants } from "../../lib/constant";

const Header = () => {
  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_logged_in = localStorage.getItem("token");

  const [links] = useState(
    is_logged_in
      ? is_organisation
        ? [
            { label: "ALL CHALLENGES", link: "/all/challenges" },
            { label: "HOW IT WORKS", link: "/workflow" },
            { label: "LAUNCH CHALLENGE", link: "/create/challenge" },
            { label: "DASHBOARD", link: "/dashboard" },
          ]
        : [
            { label: "ALL CHALLENGES", link: "/all/challenges" },
            { label: "HOW IT WORKS", link: "/workflow" },
            { label: "DASHBOARD", link: "/dashboard" },
          ]
      : [
          { label: "ALL CHALLENGES", link: "/all/challenges" },
          { label: "HOW IT WORKS", link: "/workflow" },
          { label: "LAUNCH CHALLENGE", link: "/create/challenge" },
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
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => {
                      history.push("/challenge/:id/preview/Updates");
                    }}
                  >
                    <ContentPart
                      mainText={"New 1"}
                      subText={"You received a new submission"}
                      timestamp={"2 weeks"}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => {
                      history.push("/challenge/:id/preview/Updates");
                    }}
                  >
                    <ContentPart
                      mainText={"Update 2"}
                      subText={"You received a new submission"}
                      timestamp={"2 days"}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onClick={() => {
                      history.push("/challenge/:id/preview/Updates");
                    }}
                  >
                    <ContentPart
                      mainText={"Update 2"}
                      subText={"You received a new submission"}
                      timestamp={"1 day"}
                    />
                  </Dropdown.Item>
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
              <span className="search-text">Search</span>
            </Navbar.Text>
          </div>
          <div className="action-container">
            {localStorage.getItem("token") ? (
              <NavDropdown title="Account">
                <NavDropdown.Item
                  onClick={() => {
                    history.push("/detail");
                    onToggle(false);
                  }}
                >
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                    onToggle(false);
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : history.location.pathname.includes("login") ? (
              <span
                onClick={() => {
                  history.push("/register");
                  onToggle(false);
                }}
              >
                Sign up
              </span>
            ) : (
              <span
                onClick={() => {
                  history.push("/login");
                  onToggle(false);
                }}
              >
                Sign in
              </span>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
      <SearchModal show={show} setShow={setShow} />
    </Container>
  );
};

export default Header;
