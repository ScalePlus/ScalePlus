import {
  UPDATE_PROFILE_ACTION,
  UPDATE_EMAIL_ACTION,
  UPDATE_PASSWORD_ACTION,
} from "./types";

export const updateProfileAction = (data, userId) => ({
  type: UPDATE_PROFILE_ACTION,
  payload: data,
  userId,
});

export const changeEmailAction = (data) => ({
  type: UPDATE_EMAIL_ACTION,
  payload: data,
});

export const resetPasswordAction = (data) => ({
  type: UPDATE_PASSWORD_ACTION,
  payload: data,
});
