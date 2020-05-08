import { UPDATE_DETAILS_ACTION, UPLOAD_LOGO_ACTION } from "./types";

export const updateDetailsAction = (data) => ({
  type: UPDATE_DETAILS_ACTION,
  payload: data,
});

export const uploadLogoAction = (file) => ({
  type: UPLOAD_LOGO_ACTION,
  payload: file,
});
