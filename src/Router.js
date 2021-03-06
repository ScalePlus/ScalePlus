import { Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import MainLayout from "./components/mainLayout";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import EmailVerification from "./components/emailVerification";
import OrganizationDetails from "./components/details";
import BusinessTags from "./components/businessTags";
import EssentialDetail from "./components/essentialDetails";
import ResetPassword from "./components/resetPassword";
import ResetConfirmation from "./components/resetPassword/resetConfirmation";
import ChangePassword from "./components/resetPassword/changePassword";
import store from "./store";
import { Provider } from "react-redux";
import history from "./history";

export default function MainRouter() {
  history.listen((location, action) => {
    window.scrollTo(0, 0);
  });

  const OpenRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/detail" />
        )
      }
    />
  );

  const AuthRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <OpenRoute
            path="/login"
            exact
            layout={MainLayout}
            component={SignIn}
          />
          <OpenRoute
            path="/register"
            exact
            layout={MainLayout}
            component={SignUp}
          />
          <OpenRoute
            path="/verification/:id"
            exact
            layout={MainLayout}
            component={EmailVerification}
          />
          <OpenRoute
            path="/reset/password"
            exact
            layout={MainLayout}
            component={ResetPassword}
          />
          <OpenRoute
            path="/reset/password/confirmation"
            exact
            layout={MainLayout}
            component={ResetConfirmation}
          />
          <OpenRoute
            path="/change/password/:resetPasswordCode"
            exact
            layout={MainLayout}
            component={ChangePassword}
          />
          <AuthRoute
            path="/detail"
            exact
            layout={MainLayout}
            component={OrganizationDetails}
          />
          <AuthRoute
            path="/business/tags"
            exact
            layout={MainLayout}
            component={BusinessTags}
          />
          <AuthRoute
            path="/essential/detail"
            exact
            layout={MainLayout}
            component={EssentialDetail}
          />
          <Redirect
            from="/"
            to={localStorage.getItem("token") ? "/detail" : "/login"}
          ></Redirect>
        </Switch>
      </Router>
    </Provider>
  );
}
