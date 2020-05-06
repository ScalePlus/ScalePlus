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
        {localStorage.getItem("token")
          ? "Account"
          : window.location.pathname.includes("login")
          ? "Register"
          : "Login"}
      </div>
    </Container>
  );
};

export default Header;
