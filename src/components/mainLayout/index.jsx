import React from "react";
import Header from "../header";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <Container fluid>
      <div className="main-layout">
        <Header />
        <Route render={() => children} />
      </div>
    </Container>
  );
}
