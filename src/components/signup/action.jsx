import { SIGNUP_ACTION } from "./types";

export const signupAction = (data, mode, setActiveModal) => ({
  type: SIGNUP_ACTION,
  payload: data,
  mode,
  setActiveModal,
});
