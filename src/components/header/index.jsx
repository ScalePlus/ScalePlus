import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Container } from "./style";
import history from "../../history";
import SearchModal from "./subComponents/searchModal";

const Header = () => {
  const [links, setLinks] = useState([
    { label: "ALL CHALLENGES", link: "/all/challenges" },
    { label: "HOW IT WORKS", link: "/workflow" },
    { label: "LAUNCH CHALLENGE", link: "/create/challenge" },
  ]);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLinks((data) =>
        data.concat({ label: "MY CHALLENGES", link: "/my/challenges" })
      );
    }
  }, []);

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
                    onToggle(false);
                    history.push(each.link);
                  }}
                >
                  <Nav.Link eventKey={each.label}>{each.label}</Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Navbar.Text
            onClick={() => {
              setShow(true);
            }}
          >
            <img
              src={"/images/search.png"}
              className="search-img"
              height="25px"
              width="25px"
              alt=""
            ></img>
            <span>Search</span>
          </Navbar.Text>
          <div className="action-container">
            {localStorage.getItem("token") ? (
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
            ) : history.location.pathname.includes("login") ? (
              <span
                onClick={() => {
                  history.push("/register");
                }}
              >
                Register
              </span>
            ) : (
              <span
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
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
