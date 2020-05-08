import { SIGNIN_ACTION, LOGGEDIN_USER_ACTION } from "./types";

export const signinAction = (data) => ({
  type: SIGNIN_ACTION,
  payload: data,
});

export const getLoggedInUserAction = () => ({
  type: LOGGEDIN_USER_ACTION,
});
