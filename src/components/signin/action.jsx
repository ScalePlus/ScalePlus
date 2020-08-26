import {
  SIGNIN_ACTION,
  LOGGEDIN_USER_ACTION,
  GET_USER_ACTION,
  GOOGLE_LOGIN_ACTION,
  LINKEDIN_LOGIN_ACTION,
  FILE_LIST_ACTION,
  LOGOUT_ACTION,
  GET_INVITATION_BY_CODE_ACTION,
} from "./types";

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

export const googleLoginAction = (
  data,
  mode,
  setActiveModal,
  setUserFlowModal
) => ({
  type: GOOGLE_LOGIN_ACTION,
  payload: data,
  mode,
  setActiveModal,
  setUserFlowModal,
});

export const linkedinLoginAction = (
  data,
  mode,
  setActiveModal,
  setUserFlowModal
) => ({
  type: LINKEDIN_LOGIN_ACTION,
  payload: data,
  mode,
  setActiveModal,
  setUserFlowModal,
});

export const getFileListAction = () => ({
  type: FILE_LIST_ACTION,
});

export const logoutAction = () => ({
  type: LOGOUT_ACTION,
});

export const getInvitationByCodeAction = (invitationCode) => ({
  type: GET_INVITATION_BY_CODE_ACTION,
  invitationCode,
});
