import { Router, Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

import MainLayout from "./components/mainLayout";
import SignIn from "./components/signin ";
import SignUp from "./components/signup";
import EmailVerification from "./components/emailVerification";
import OrganizationDetails from "./components/details";
import BusinessTags from "./components/businessTags";
import EssentialDetail from "./components/essentialDetails";
import store from "./store";
import { Provider } from "react-redux";
import history from "./history";
class MainRouter extends Component {
  render() {
    history.listen((location, action) => {
      window.scrollTo(0, 0);
    });

    const OpenRoute = ({ component: Component, layout: Layout, ...rest }) => (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
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
              path="/organization/detail"
              exact
              layout={MainLayout}
              component={OrganizationDetails}
            />
            <OpenRoute
              path="/business/tags"
              exact
              layout={MainLayout}
              component={BusinessTags}
            />
            <OpenRoute
              path="/essential/detail"
              exact
              layout={MainLayout}
              component={EssentialDetail}
            />
            <Redirect from="/" to="/login"></Redirect>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default MainRouter;
