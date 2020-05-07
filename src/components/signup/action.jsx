import { SIGNUP_ACTION } from "./types";

export const signupAction = (data) => ({
  type: SIGNUP_ACTION,
  payload: data,
});
