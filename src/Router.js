import { Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import MainLayout from "./components/mainLayout";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Linkedinpopup from "./components/linkedinPopup";
import EmailVerification from "./components/emailVerification";
import OrganizationDetails from "./components/details";
import BusinessTags from "./components/businessTags";
import EssentialDetail from "./components/essentialDetails";
import ResetPassword from "./components/resetPassword";
import ResetConfirmation from "./components/resetPassword/resetConfirmation";
import ChangePassword from "./components/resetPassword/changePassword";
import ChallengeMaster from "./components/challengeMaster";
import ChallengeConfirmation from "./components/challengeMaster/confirmation";
import ChallengePreview from "./components/challengePreview";
import ChallengeEdit from "./components/challengeEdit";
import AllChallenges from "./components/allChallenges";
import HowItWorks from "./components/howItWorks";
import MyChallenges from "./components/myChallenges";
import Home from "./components/home";
import SolveChallenge from "./components/solveChallenge";
import UserProfileEdit from "./components/profile";
import UserProfileView from "./components/profileView";
import AllUsers from "./components/allUsers";
import ChallengeAgreement from "./components/challengeAgreement";
import JudgesAggrement from "./components/judgesNDA";
import AllActivities from "./components/allActivities";
import store from "./store";
import { Provider } from "react-redux";
import history from "./history";
import { Constants } from "./lib/constant";

const MainRouter = () => {
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

  const NotAuthRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : localStorage.getItem("profileUpdated") ? (
          <Redirect to="/dashboard" />
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

  const OrganizationRoute = ({
    component: Component,
    layout: Layout,
    ...rest
  }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") &&
        (localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION ||
          localStorage.getItem("userRole") === Constants.ROLES.ADMIN) ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <NotAuthRoute
            path="/login"
            exact
            layout={MainLayout}
            component={SignIn}
          />
          <NotAuthRoute
            path="/register"
            exact
            layout={MainLayout}
            component={SignUp}
          />
          <Route path="/linkedin" exact component={Linkedinpopup} />
          <NotAuthRoute
            path="/verification/:id"
            exact
            layout={MainLayout}
            component={EmailVerification}
          />
          <NotAuthRoute
            path="/reset/password"
            exact
            layout={MainLayout}
            component={ResetPassword}
          />
          <NotAuthRoute
            path="/reset/password/confirmation"
            exact
            layout={MainLayout}
            component={ResetConfirmation}
          />
          <NotAuthRoute
            path="/change/password/:resetPasswordCode"
            exact
            layout={MainLayout}
            component={ChangePassword}
          />
          <AuthRoute
            path="/dashboard"
            exact
            layout={MainLayout}
            component={MyChallenges}
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
          <OrganizationRoute
            path="/create/challenge/:step"
            exact
            layout={MainLayout}
            component={ChallengeMaster}
          />
          <AuthRoute
            path="/challenge/confirmation/:id"
            exact
            layout={MainLayout}
            component={ChallengeConfirmation}
          />
          <OpenRoute
            path="/challenge/:id/preview/:tab"
            exact
            layout={MainLayout}
            component={ChallengePreview}
          />
          <OrganizationRoute
            path="/challenge/:id/edit/:tab"
            exact
            layout={MainLayout}
            component={ChallengeEdit}
          />
          <OpenRoute
            path="/all/challenges"
            exact
            layout={MainLayout}
            component={AllChallenges}
          />
          <OpenRoute
            path="/workflow"
            exact
            layout={MainLayout}
            component={HowItWorks}
          />
          <OpenRoute path="/home" exact layout={MainLayout} component={Home} />
          <OpenRoute
            path="/solve/challenge/:id"
            exact
            layout={MainLayout}
            component={SolveChallenge}
          />
          <OpenRoute
            path="/solve/challenge/invitation/:invitationCode"
            exact
            layout={MainLayout}
            component={SolveChallenge}
          />
          <OpenRoute
            path="/profile/edit/:userId"
            exact
            layout={MainLayout}
            component={UserProfileEdit}
          />
          <OpenRoute
            path="/profile/view/:id"
            exact
            layout={MainLayout}
            component={UserProfileView}
          />
          <OpenRoute
            path="/users"
            exact
            layout={MainLayout}
            component={AllUsers}
          />
          <OpenRoute
            path="/challenge/agreement/:id"
            exact
            layout={MainLayout}
            component={ChallengeAgreement}
          />
          <OpenRoute
            path="/challenge/participant/invitation/:invitationCode"
            exact
            layout={MainLayout}
            component={ChallengeAgreement}
          />
          <OpenRoute
            path="/challenge/team/invitation/:invitationCode"
            exact
            layout={MainLayout}
            component={ChallengeAgreement}
          />
          <OpenRoute
            path="/judges/agreement/:id"
            exact
            layout={MainLayout}
            component={JudgesAggrement}
          />
          <OpenRoute
            path="/judges/invitation/:invitationCode"
            exact
            layout={MainLayout}
            component={JudgesAggrement}
          />
          <OpenRoute
            path="/activities"
            exact
            layout={MainLayout}
            component={AllActivities}
          />
          <Redirect
            from="/"
            to={
              localStorage.getItem("profileUpdated") ||
              localStorage.getItem("userRole") === Constants.ROLES.ADMIN
                ? "/dashboard"
                : localStorage.getItem("token")
                ? "/detail"
                : "/home"
            }
          ></Redirect>
        </Switch>
      </Router>
    </Provider>
  );
};

export default MainRouter;
