import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Container } from "./style";
import history from "../../history";
const links = [
  { label: "ALL CHALLENGES", link: "/challenges" },
  { label: "HOW IT WORKS", link: "/workflow" },
  { label: "LAUNCH CHALLENGE", link: "/challenge" },
  { label: "MY CHALLENGES", link: "/my/challenges" },
];

const Header = () => {
  const [activeKey, selectKey] = useState(
    links.find((each) => {
      return window.location.pathname.includes(each.link);
    })
      ? links.find((each) => {
          return window.location.pathname.includes(each.link);
        }).label
      : ""
  );
  const [expanded, onToggle] = useState(false);
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
        <Navbar.Brand href="/dashboard">
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
                    selectKey(each.label);
                    onToggle(false);
                    history.push(each.link);
                  }}
                >
                  <Nav.Link eventKey={each.label}>{each.label}</Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Navbar.Text>
            <img
              src={"/images/search.png"}
              className="search-img"
              height="25px"
              width="25px"
              alt=""
            ></img>
            <span>Search</span>
          </Navbar.Text>
          <div
            className="action-container"
            onClick={() => {
              if (window.location.pathname.includes("login")) {
                history.push("/register");
              } else if (
                window.location.pathname.includes("register") ||
                window.location.pathname.includes("verification") ||
                window.location.pathname.includes("reset/password") ||
                window.location.pathname.includes("change/password")
              ) {
                history.push("/login");
              }
            }}
          >
            {window.location.pathname.includes("login") ? (
              "Register"
            ) : window.location.pathname.includes("register") ||
              window.location.pathname.includes("verification") ||
              window.location.pathname.includes("reset/password") ||
              window.location.pathname.includes("change/password") ? (
              "Login"
            ) : (
              <NavDropdown title="Account">
                <NavDropdown.Item
                  onClick={() => {
                    history.push("/detail");
                  }}
                >
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </Container>
    // <Container>

    // </Container>
  );
};

export default Header;
