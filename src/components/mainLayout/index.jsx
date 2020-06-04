import React, { useEffect, useCallback } from "react";
import Header from "../header";
import Footer from "../footer";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedInUserAction } from "../signin/action";

const MainLayout = ({ children }) => {
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
    <div className="main-layout">
      <Header />
      <Route render={() => children} />
      <Footer />
    </div>
  );
};

export default MainLayout;
