import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Header from "../header";
import Footer from "../footer";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedInUserAction } from "../signin/action";

const MainLayout = ({ children }) => {
  const { t } = useTranslation();
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
      <Header t={t} />
      <Route render={() => children} />
      <Footer t={t} />
    </div>
  );
};

export default MainLayout;
