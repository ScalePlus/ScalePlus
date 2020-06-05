import { SIGNIN_ACTION, LOGGEDIN_USER_ACTION, GET_USER_ACTION } from "./types";

export const signinAction = (data, mode, setActiveModal, setUserFlowModal) => ({
  type: SIGNIN_ACTION,
  payload: data,
  mode: mode,
  setActiveModal: setActiveModal,
  setUserFlowModal: setUserFlowModal,
});

export const getLoggedInUserAction = () => ({
  type: LOGGEDIN_USER_ACTION,
});

export const getUser = (id) => ({
  type: GET_USER_ACTION,
  payload: id,
});
