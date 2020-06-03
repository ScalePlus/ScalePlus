import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Container } from "./style";
import history from "../../history";
import SearchModal from "./subComponents/searchModal";

const Header = () => {
  const [links] = useState(
    localStorage.getItem("token")
      ? [
          { label: "ALL CHALLENGES", link: "/all/challenges" },
          { label: "HOW IT WORKS", link: "/workflow" },
          { label: "LAUNCH CHALLENGE", link: "/create/challenge" },
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
            <div className="notification-container">
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
