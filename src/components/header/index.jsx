import React from "react";
import { Container } from "./style";

const Header = () => {
  return (
    <Container>
      <div className="logo-container">
        <span className="logo-text">Scale</span>{" "}
        <span className="icon-container">+</span>
      </div>
      <div className="action-container">
        {window.location.pathname.includes("login")
          ? "Register"
          : window.location.pathname.includes("register") ||
            window.location.pathname.includes("verification")
          ? "Login"
          : "Account"}
      </div>
    </Container>
  );
};

export default Header;
