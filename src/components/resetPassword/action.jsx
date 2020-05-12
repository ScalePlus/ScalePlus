import {
  RESET_PASSWORD_ACTION,
  CHANGE_PASSWORD_ACTION,
  CLEAR_ALL,
} from "./types";

export const forgotPasswordAction = (data) => ({
  type: RESET_PASSWORD_ACTION,
  payload: data,
});

export const changePasswordAction = (data) => ({
  type: CHANGE_PASSWORD_ACTION,
  payload: data,
});

export const clearAll = () => ({
  type: CLEAR_ALL,
});
