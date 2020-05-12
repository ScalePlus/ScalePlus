import React, { useEffect, useCallback } from "react";
import Header from "../header";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedInUserAction } from "../signin/action";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const getLoggedInUserMethod = useCallback(
    () => dispatch(getLoggedInUserAction()),
    [dispatch]
  );

  useEffect(() => {
    console.log("token changed");
    if (localStorage.getItem("token")) {
      getLoggedInUserMethod();
    }
  }, [getLoggedInUserMethod]);

  return (
    <Container fluid>
      <div className="main-layout">
        <Header />
        <Route render={() => children} />
      </div>
    </Container>
  );
}
