import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Container } from "./style";
import history from "../../history";

const Header = () => {
  return (
    <Container>
      <div className="logo-container">
        <span className="logo-text">Scale</span>{" "}
        <span className="icon-container">+</span>
      </div>
      <div
        className="action-container"
        onClick={() => {
          if (window.location.pathname.includes("login")) {
            history.push("/register");
          } else if (
            window.location.pathname.includes("register") ||
            window.location.pathname.includes("verification")
          ) {
            history.push("/login");
          }
        }}
      >
        {window.location.pathname.includes("login") ? (
          "Register"
        ) : window.location.pathname.includes("register") ||
          window.location.pathname.includes("verification") ? (
          "Login"
        ) : (
          <NavDropdown title="Account">
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
    </Container>
  );
};

export default Header;
