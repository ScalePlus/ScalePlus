import { SIGNUP_ACTION, GOOGLE_SIGNUP_ACTION } from "./types";

export const signupAction = (data, mode, setActiveModal) => ({
  type: SIGNUP_ACTION,
  payload: data,
  mode,
  setActiveModal,
});

export const googleRegisterAction = (
  data,
  mode,
  setActiveModal,
  setUserFlowModal
) => ({
  type: GOOGLE_SIGNUP_ACTION,
  payload: data,
  mode,
  setActiveModal,
  setUserFlowModal,
});
